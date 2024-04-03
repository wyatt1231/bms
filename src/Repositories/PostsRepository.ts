import { DatabaseConnection } from "../Configurations/DatabaseConfig";
import { sqlFilterDate } from "../Hooks/useDateParser";
import { ErrorMessage } from "../Hooks/useErrorMessage";
import { GetUploadedImage, UploadFile } from "../Hooks/useFileUploader";
import { PaginationModel } from "../Models/PaginationModel";
import { PostReactionModel } from "../Models/PostReactionModel";
import { PostsCommentModel } from "../Models/PostsCommentModel";
import {
  PostCommentModel,
  PostFilesModel,
  PostsModel,
} from "../Models/PostsModel";
import { ResponseModel } from "../Models/ResponseModels";

const getPosts = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();

  try {
    await con.BeginTransaction();
    const data: Array<PostsModel> = await con.Query(
      `
        SELECT * FROM 
      (SELECT p.posts_pk,p.title,p.body,p.sts_pk,CASE WHEN DATE_FORMAT(p.encoded_at,'%d')= DATE_FORMAT(CURDATE(),'%d') THEN CONCAT("Today at ",DATE_FORMAT(p.encoded_at,'%h:%m %p')) WHEN DATEDIFF(NOW(),p.encoded_at) >7 THEN DATE_FORMAT(p.encoded_at,'%b/%d %h:%m %p') WHEN DATEDIFF(NOW(),p.encoded_at) <=7 THEN  CONCAT(DATEDIFF(NOW(),p.encoded_at),'D')  ELSE DATE_FORMAT(p.encoded_at,'%b/%d %h:%m') END AS TIMESTAMP,p.encoder_pk , s.sts_desc,s.sts_color,s.sts_backgroundColor
        ,u.full_name user_full_name,u.pic user_pic,COUNT( pr.reaction)likes FROM posts p
        LEFT JOIN status s ON p.sts_pk = s.sts_pk 
        LEFT JOIN posts_reaction pr ON pr.posts_pk=p.posts_pk
        LEFT JOIN vw_users u ON u.user_pk = p.encoder_pk WHERE p.sts_pk="PU" GROUP BY p.posts_pk ORDER BY p.encoded_at DESC)tmp;
        `,
      null
    );
    for (const file of data) {
      const sql_get_pic = await con.QuerySingle(
        `SELECT pic FROM resident WHERE user_pk=${file?.encoder_pk} LIMIT 1`,
        null
      );
      if (!!file?.user_pic) {
        file.user_pic = await GetUploadedImage(file.user_pic);
      }
    }
    for (const file of data) {
      file.upload_files = await con.Query(
        `
        select * from posts_file where posts_pk=@posts_pk
        `,
        {
          posts_pk: file.posts_pk,
        }
      );
    }

    con.Commit();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    await con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const getPostsAdmin = async (
  payload: PaginationModel
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    const posts: Array<PostsModel> = await con.QueryPagination(
      `
      select * from (SELECT p.*, u.full_name FROM posts p join vw_users u on u.user_pk = p.encoder_pk) as tmp
      WHERE
      (coalesce(full_name,'')  like concat('%',@search,'%')
      OR coalesce(title,'') like concat('%',@search,'%'))
      AND sts_pk in @sts_pk
      AND encoded_at >= ${sqlFilterDate(
        payload.filters.date_from,
        "encoded_at"
      )}
      AND encoded_at <= ${sqlFilterDate(payload.filters.date_to, "encoded_at")}
      `,
      payload
    );

    const hasMore: boolean = posts.length > payload.page.limit;
    if (hasMore) {
      posts.splice(posts.length - 1, 1);
    }

    for (const post of posts) {
      post.user = await con.QuerySingle(
        `select * from vw_users where user_pk = @user_pk;`,
        {
          user_pk: post.encoder_pk,
        }
      );

      if (!!post?.user?.pic) {
        post.user.pic = await GetUploadedImage(post.user.pic);
      }

      post.status = await con.QuerySingle(
        `select * from status where sts_pk = @sts_pk;`,
        {
          sts_pk: post.sts_pk,
        }
      );

      post.files = await con.Query(
        `select * from posts_file where posts_pk=@posts_pk`,
        {
          posts_pk: post.posts_pk,
        }
      );
    }

    con.Commit();

    return {
      success: true,
      data: {
        table: posts,
        has_more: hasMore,
      },
    };
  } catch (error) {
    console.error(`error`, error);
    con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const getUserPosts = async (user_pk: number): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const data: Array<PostsModel> = await con.Query(
      `
        SELECT * FROM 
      (SELECT p.posts_pk,p.title,p.body,p.sts_pk,CASE WHEN DATE_FORMAT(p.encoded_at,'%d')= DATE_FORMAT(CURDATE(),'%d') THEN CONCAT("Today at ",DATE_FORMAT(p.encoded_at,'%h:%m %p')) WHEN DATEDIFF(NOW(),p.encoded_at) >7 THEN DATE_FORMAT(p.encoded_at,'%b/%d %h:%m %p') WHEN DATEDIFF(NOW(),p.encoded_at) <=7 THEN  CONCAT(DATEDIFF(NOW(),p.encoded_at),'D')  ELSE DATE_FORMAT(p.encoded_at,'%b/%d %h:%m') END AS TIMESTAMP,p.encoder_pk , s.sts_desc,s.sts_color,s.sts_backgroundColor
        ,u.full_name user_full_name,u.pic user_pic,COUNT( pr.reaction)likes FROM posts p
        LEFT JOIN status s ON p.sts_pk = s.sts_pk 
        LEFT JOIN posts_reaction pr ON pr.posts_pk=p.posts_pk
        LEFT JOIN vw_users u ON u.user_pk = p.encoder_pk WHERE p.sts_pk="PU" AND u.user_pk=@user_pk GROUP BY p.posts_pk ORDER BY p.encoded_at DESC)tmp;
        `,
      {
        user_pk,
      }
    );
    for (const file of data) {
      const sql_get_pic = await con.QuerySingle(
        `SELECT pic FROM resident WHERE user_pk=${file?.encoder_pk} LIMIT 1`,
        null
      );

      if (!!file?.user_pic) {
        file.user_pic = await GetUploadedImage(file.user_pic);
      }
    }
    for (const file of data) {
      file.upload_files = await con.Query(
        `
        select * from posts_file where posts_pk=@posts_pk
        `,
        {
          posts_pk: file.posts_pk,
        }
      );
    }

    con.Commit();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const getPostsReaction = async (): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const data: Array<PostsModel> = await con.Query(
      `
          SELECT CASE WHEN reaction="Like" THEN CASE WHEN COUNT(reaction) IS NULL THEN 0 ELSE COUNT(reaction)END END AS likereaction FROM posts_reaction
          `,
      null
    );

    con.Commit();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const getPostsComments = async (posts_pk: string): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const data: Array<PostsModel> = await con.Query(
      `SELECT u.user_pk,pw.posts_comment_pk,pic,CONCAT(first_name,' ',middle_name,'. ',last_name) AS fullname,pw.body,CASE WHEN DATE_FORMAT(pw.encoded_at,'%d')= DATE_FORMAT(CURDATE(),'%d') THEN CONCAT("Today at ",DATE_FORMAT(pw.encoded_at,'%h:%m %p')) ELSE DATE_FORMAT(pw.encoded_at,'%m-%d-%y %h:%m') END AS TIMESTAMP  FROM posts_comment pw JOIN resident u ON pw.user_pk=u.user_pk  where posts_pk=@posts_pk`,
      {
        posts_pk: posts_pk,
      }
    );
    for (const file of data) {
      const sql_get_pic = await con.QuerySingle(
        `SELECT pic FROM resident WHERE user_pk=${file?.user_pk} LIMIT 1`,
        null
      );
      if (!!file?.user_pic) {
        file.user_pic = await GetUploadedImage(file.user_pic);
      }
    }

    con.Commit();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const addPosts = async (
  payload: PostsModel,
  files: Array<File>,
  user_pk: number
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    payload.encoder_pk = user_pk;

    const sql_add_posts = await con.Insert(
      `INSERT INTO posts SET
         title=@title,
         body=@body,
         sts_pk="PU",
         encoder_pk=@encoder_pk;`,
      payload
    );

    if (sql_add_posts.insertedId > 0) {
      for (const file of files) {
        const file_res = await UploadFile("/Files/Complaints/", file);

        if (!file_res.success) {
          con.Rollback();

          return file_res;
        }

        const posts_file_payload: PostFilesModel = {
          file_path: file_res.data.path,
          file_name: file_res.data.name,
          mimetype: file_res.data.mimetype,
          encoder_pk: user_pk,
          posts_pk: sql_add_posts.insertedId,
        };

        const sql_add_posts_file = await con.Insert(
          `INSERT INTO posts_file SET
             posts_pk=@posts_pk,
             file_path=@file_path,
             file_name=@file_name,
             mimetype=@mimetype,
             encoder_pk=@encoder_pk;`,
          posts_file_payload
        );

        if (sql_add_posts_file.affectedRows < 1) {
          con.Rollback();

          return {
            success: false,
            message:
              "The process has been terminated when trying to save the file!",
          };
        }
      }

      con.Commit();
      return {
        success: true,
        message: "The news has been published successfully!",
      };
    } else {
      con.Rollback();
      return {
        success: false,
        message: "No affected rows while creating the news",
      };
    }
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};
const addPostComment = async (
  payload: PostsCommentModel,
  user_pk: number
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    payload.user_pk = user_pk;

    const sql_add_post_comment = await con.Insert(
      `INSERT INTO posts_comment SET
      posts_pk=@posts_pk,
      user_pk=@user_pk,
      body=@body;`,
      payload
    );

    if (sql_add_post_comment.insertedId > 0) {
      con.Commit();
      return {
        success: true,
        message: "Your reaction has beed added!",
      };
    } else {
      con.Rollback();
      return {
        success: false,
        message:
          "Looks like something went wrong, unable to save your reaction!",
      };
    }
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const addPostReaction = async (
  payload: PostReactionModel,
  user_pk: number
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();

  try {
    await con.BeginTransaction();

    payload.user_pk = user_pk;
    const sql_check_exist = await con.Query(
      `SELECT * FROM posts_reaction WHERE posts_pk=@posts_pk AND resident_pk=@user_pk`,
      payload
    );
    if (sql_check_exist.toString() == "") {
      const sql_add_news_reaction = await con.Modify(
        `INSERT INTO posts_reaction SET
          posts_pk=@posts_pk,
          reaction=@reaction,
          resident_pk=@user_pk;`,
        payload
      );
      if (sql_add_news_reaction > 0) {
        con.Commit();
        return {
          success: true,
          message: "Your reaction has beed added!",
        };
      } else {
        con.Rollback();
        return {
          success: false,
          message:
            "Looks like something went wrong, unable to save your reaction!",
        };
      }
    } else {
      const sql_update_news_reaction = await con.Modify(
        `update  posts_reaction SET
          reaction=@reaction
          where posts_pk=@posts_pk 
          and
          resident_pk=@user_pk;`,
        payload
      );
      if (sql_update_news_reaction > 0) {
        con.Commit();
        return {
          success: true,
          message: "Your reaction has beed updated!",
        };
      } else {
        con.Rollback();
        return {
          success: false,
          message:
            "2 Looks like something went wrong, unable to save your reaction!",
        };
      }
    }
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

//ADMIN POSTS

const getPostReactionsAdmin = async (
  posts_pk: number
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    const data: Array<PostsModel> = await con.Query(
      `
       SELECT *,resident_pk as user_pk FROM posts_reaction  WHERE posts_pk=@posts_pk; 
        `,
      {
        posts_pk: posts_pk,
      }
    );

    con.Commit();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

//ADMIN REACTIONS

const getPostCommentsAdmin = async (
  posts_pk: number
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    const comments: Array<PostCommentModel> = await con.Query(
      `
       SELECT * FROM posts_comment WHERE posts_pk = @posts_pk order by encoded_at desc;
        `,
      {
        posts_pk: posts_pk,
      }
    );

    for (const comment of comments) {
      comment.user = await con.QuerySingle(
        `select * from vw_users where user_pk = @user_pk;`,
        {
          user_pk: comment.user_pk,
        }
      );

      if (!!comment?.user?.pic) {
        comment.user.pic = await GetUploadedImage(comment.user.pic);
      }
    }

    con.Commit();
    return {
      success: true,
      data: comments,
    };
  } catch (error) {
    console.error(`error`, error);

    con.Rollback();
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

const updatePostStatus = async (
  payload: PostsModel
): Promise<ResponseModel> => {
  const con = await DatabaseConnection();
  try {
    await con.BeginTransaction();

    const sql_update_post = await con.Modify(
      `UPDATE posts SET
      sts_pk=@sts_pk
      WHERE posts_pk=@posts_pk;
      `,
      payload
    );

    if (sql_update_post > 0) {
      con.Commit();
      return {
        success: true,
        message: "The post status has been changes successfully!",
      };
    } else {
      con.Rollback();
      return {
        success: false,
        message:
          "Looks like something went wrong, unable to save your reaction!",
      };
    }
  } catch (error) {
    await con.Rollback();
    console.error(`error`, error);
    return {
      success: false,
      message: ErrorMessage(error),
    };
  }
};

export default {
  addPosts,
  getPosts,
  getUserPosts,
  addPostReaction,
  addPostComment,
  getPostsReaction,
  getPostsComments,
  getPostReactionsAdmin,
  getPostCommentsAdmin,
  getPostsAdmin,
  updatePostStatus,
};
