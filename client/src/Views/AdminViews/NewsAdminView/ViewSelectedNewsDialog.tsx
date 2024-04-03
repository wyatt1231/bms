import { Button, Chip, Grid } from "@material-ui/core";
import LabelImportantRoundedIcon from "@material-ui/icons/LabelImportantRounded";
import moment from "moment";
import React, { FC, memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularLoadingProgress from "../../../Component/CircularLoadingProgress";
import CustomAvatar from "../../../Component/CustomAvatar";
import FormDialog from "../../../Component/FormDialog/FormDialog";
import { InvalidDateToDefault } from "../../../Hooks/UseDateParser";
import NewsActions from "../../../Services/Actions/NewsActions";
import { setGeneralPrompt } from "../../../Services/Actions/PageActions";
import { NewsModel } from "../../../Services/Models/NewsModels";
import { RootStore } from "../../../Services/Store";
import NewsFilesDialog from "./NewsFilesDialog";
import { StyledNewsContainer } from "./styles";
interface EditNewsAdminProps {
  news_pk: number;
  open: boolean;
  handleClose: () => void;
  open_edit_dialog: boolean;
  handleSetOpenEditDialog: (open: boolean) => void;
  selected_news_pk: number;
  handleSetSelectedNews: (news_pk: number) => void;
  handleRefetchTable: () => void;
  selected_file_news_pk: number;
  handleSetSelectedFileNewsPk: () => void;
}

export const ViewSelectedNewsDialog: FC<EditNewsAdminProps> = memo(
  ({
    news_pk,
    open,
    handleClose,
    open_edit_dialog,
    handleSetOpenEditDialog,
    selected_news_pk,
    handleSetSelectedNews,
    handleRefetchTable,
    selected_file_news_pk,
    handleSetSelectedFileNewsPk,
  }) => {
    const dispatch = useDispatch();

    const single_news = useSelector(
      (store: RootStore) => store.NewsReducer.single_news
    );

    console.log(`single_news`, single_news);

    const fetch_single_news = useSelector(
      (store: RootStore) => store.NewsReducer.fetch_single_news
    );

    useEffect(() => {
      dispatch(NewsActions.setSingleNews(news_pk));
    }, [dispatch, news_pk]);

    return (
      <div>
        <FormDialog
          title="Tibuok impormasyon sa balita"
          handleClose={() => handleClose()}
          open={open}
          minWidth={650}
          body={
            !fetch_single_news && !!single_news ? (
              <StyledNewsContainer>
                <div className="news-item">
                  <div className="header">
                    <div className="profile">
                      <CustomAvatar
                        className="img"
                        src={single_news.user.pic}
                        errorMessage={"U"}
                      />
                      <div className="name">{single_news?.user?.full_name}</div>
                      <div className="time">
                        {moment(single_news?.encoded_at).fromNow()}
                      </div>
                    </div>
                    <div className="actions">
                      {/* <IconButtonPopper buttons={RenderNewsAction(news)} /> */}
                    </div>
                  </div>

                  <div
                    style={{
                      justifySelf: `start`,
                    }}
                  >
                    <Chip
                      label={single_news?.status?.sts_desc}
                      style={{
                        color: single_news?.status?.sts_color,
                        backgroundColor:
                          single_news?.status?.sts_backgroundColor,
                      }}
                    />
                  </div>

                  <div
                    className="petsa"
                    style={{
                      fontSize: `.87em`,
                    }}
                  >
                    Karong{" "}
                    {InvalidDateToDefault(single_news?.pub_date, "walay petsa")}
                  </div>

                  <div className="news-title">
                    {single_news?.is_prio === 1 && (
                      <LabelImportantRoundedIcon
                        fontSize={"small"}
                        color="primary"
                      />
                    )}

                    <div>{single_news?.title}</div>
                  </div>
                  <div className="body">{single_news.body}</div>
                  {/* 
                  <NewsFilesDialog news_pk={single_news.news_pk}
                  
                  /> */}

                  <NewsFilesDialog
                    files={single_news?.news_files}
                    handleRefetchTable={handleRefetchTable}
                    news_pk={single_news.news_pk}
                    selected_file_news_pk={selected_news_pk}
                    handleSetSelectedFileNewsPk={() =>
                      handleSetSelectedFileNewsPk()
                    }
                  />
                </div>
              </StyledNewsContainer>
            ) : (
              <CircularLoadingProgress />
            )
          }
          actions={
            <>
              <Button
                onClick={() => {
                  handleSetSelectedNews(news_pk);
                  handleSetOpenEditDialog(true);
                }}
                variant="contained"
              >
                Usabon ang impormasyon
              </Button>

              {single_news?.sts_pk === "UP" ? (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    dispatch(
                      setGeneralPrompt({
                        open: true,
                        continue_callback: () =>
                          dispatch(
                            NewsActions.republishNews(news_pk, () => {
                              handleRefetchTable();
                              dispatch(NewsActions.setSingleNews(news_pk));
                            })
                          ),
                      })
                    );
                  }}
                >
                  E-publish
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    dispatch(
                      setGeneralPrompt({
                        open: true,
                        continue_callback: () =>
                          dispatch(
                            NewsActions.unpublishNews(news_pk, () => {
                              handleRefetchTable();
                              dispatch(NewsActions.setSingleNews(news_pk));
                            })
                          ),
                      })
                    );
                  }}
                >
                  E-Unpublish
                </Button>
              )}
            </>
          }
        />
      </div>
    );
  }
);

export default ViewSelectedNewsDialog;
