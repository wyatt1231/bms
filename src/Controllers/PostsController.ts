import { Express, Request, Response, Router } from "express";
import Authorize from "../Middlewares/Authorize";
import { PaginationModel } from "../Models/PaginationModel";
import { PostReactionModel } from "../Models/PostReactionModel";
import { PostsCommentModel } from "../Models/PostsCommentModel";
import { PostsModel } from "../Models/PostsModel";
import { UserClaims } from "../Models/UserModels";
import PostsRepository from "../Repositories/PostsRepository";

const PostsController = async (app: Express): Promise<void> => {
  const router = Router();

  router.post(
    "/getPosts",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        res.json(await PostsRepository.getPosts());
      } catch (error) {
        res.json(500);
      }
    }
  );
  router.post(
    "/getUserPosts",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        res.json(await PostsRepository.getUserPosts(req.user_pk));
      } catch (error) {
        res.json(500);
      }
    }
  );
  router.post(
    "/getPostsComments",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const posts_pk: string = req.body.posts_pk;
        res.json(await PostsRepository.getPostsComments(posts_pk));
      } catch (error) {
        res.json(error);
      }
    }
  );
  router.post(
    "/addPosts",
    Authorize("admin,resident"),
    async (req: Request & { files: any } & UserClaims, res: Response) => {
      try {
        const payload: PostsModel = req.body;
        let files = req.files?.uploaded_files ? req.files?.uploaded_files : [];

        res.json(
          await PostsRepository.addPosts(
            payload,
            files instanceof Array ? files : [files],
            req.user_pk
          )
        );
      } catch (error) {
        res.json(500);
      }
    }
  );

  router.post(
    "/getPostsReaction",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        res.json(await PostsRepository.getPostsReaction());
      } catch (error) {
        res.json(500);
      }
    }
  );
  router.post(
    "/addPostComment",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const payload: PostsCommentModel = req.body;
        res.json(await PostsRepository.addPostComment(payload, req.user_pk));
      } catch (error) {
        res.json(500);
      }
    }
  );
  router.post(
    "/addPostReaction",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const payload: PostReactionModel = req.body;

        res.json(await PostsRepository.addPostReaction(payload, req.user_pk));
      } catch (error) {
        res.json(500);
      }
    }
  );

  //reactions

  router.post(
    "/getPostsAdmin",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const payload: PaginationModel = req.body;
        res.json(await PostsRepository.getPostsAdmin(payload));
      } catch (error) {
        res.json(500);
      }
    }
  );

  router.post(
    "/getPostReactionsAdmin",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const posts_pk: number = req.body.posts_pk;
        res.json(await PostsRepository.getPostReactionsAdmin(posts_pk));
      } catch (error) {
        res.json(500);
      }
    }
  );

  //comments
  router.post(
    "/getPostCommentsAdmin",
    Authorize("admin,resident"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const posts_pk: number = req.body.posts_pk;
        res.json(await PostsRepository.getPostCommentsAdmin(posts_pk));
      } catch (error) {
        res.json(500);
      }
    }
  );

  router.post(
    "/updatePostStatus",
    Authorize("admin"),
    async (req: Request & UserClaims, res: Response) => {
      try {
        const payload: PostsModel = req.body;
        payload.encoder_pk = req.user_pk;
        res.json(await PostsRepository.updatePostStatus(payload));
      } catch (error) {
        res.json(500);
      }
    }
  );

  app.use("/api/posts/", router);
};

export default PostsController;
