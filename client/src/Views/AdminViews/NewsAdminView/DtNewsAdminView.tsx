import { Chip, Container, Grid } from "@material-ui/core";
import LabelImportantRoundedIcon from "@material-ui/icons/LabelImportantRounded";
import { Skeleton } from "@material-ui/lab";
import moment from "moment";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../../../Component/CustomAvatar";
import CustomButtonGroup from "../../../Component/CustomButtonGroup";
import IconButtonPopper from "../../../Component/IconButtonPopper/IconButtonPopper";
import LinearLoadingProgress from "../../../Component/LinearLoadingProgress";
import { InvalidDateToDefault } from "../../../Hooks/UseDateParser";
import NewsActions from "../../../Services/Actions/NewsActions";
import { setGeneralPrompt, setPageLinks } from "../../../Services/Actions/PageActions";
import { NewsModel } from "../../../Services/Models/NewsModels";
import { PaginationModel } from "../../../Services/Models/PaginationModels";
import { RootStore } from "../../../Services/Store";
import AddNewsAdminView from "./AddNewsAdminView";
import CalNewsAdminView from "./CalNewsAdminView";
import EditNewsAdminView from "./EditNewsAdminView";
import FilterDtNewsAdminView from "./FilterDtNewsAdminView";
import NewsFilesDialog from "./NewsFilesDialog";
import { StyledNewsContainer } from "./styles";
interface DtNewsAdminViewProps {}

export const DtNewsAdminView: FC<DtNewsAdminViewProps> = memo(() => {
  const dispatch = useDispatch();

  const [selected_news_pk, set_selected_news_pk] = useState<number | undefined>();

  const handleSetSelectedNews = useCallback((news_pk: number) => {
    set_selected_news_pk(news_pk);
  }, []);

  const [refetch_table, set_refetch_table] = useState(0);
  const handleRefetchTable = useCallback(() => {
    set_refetch_table((c) => c + 1);
  }, []);

  const [open_edit_dialog, set_open_edit_dialog] = useState(false);

  const handleSetOpenEditDialog = useCallback((open: boolean) => {
    set_open_edit_dialog(open);
  }, []);

  const news_table = useSelector((store: RootStore) => store.NewsReducer.news_table);
  const news_table_has_more = useSelector((store: RootStore) => store.NewsReducer.news_table_has_more);

  const fetch_news_table = useSelector((store: RootStore) => store.NewsReducer.fetch_news_table);

  const [view, set_view] = useState(0);

  const handleSetView = useCallback((view: any) => {
    set_view(view);
  }, []);

  const [table_filter, set_table_filter] = useState<PaginationModel>({
    filters: {
      search: "",
      date_from: null,
      date_to: null,
      sts_pk: ["UP", "PU"],
    },
    sort: {
      direction: "desc",
      column: "encoded_at",
    },
    page: {
      begin: 0,
      limit: 5,
    },
  });

  const handleSetTableFilter = useCallback((tbl_filter: PaginationModel) => {
    set_table_filter(tbl_filter);
  }, []);

  const [selected_file_news_pk, set_selected_file_news_pk] = useState<number | null>(null);

  const RenderNewsAction = useCallback(
    (news: NewsModel) => {
      const actions: Array<any> = [
        {
          text: "Edit News",
          handleClick: () => {
            set_selected_news_pk(news.news_pk);
            handleSetOpenEditDialog(true);
          },
        },
      ];

      if (news.sts_pk === "PU") {
        actions.push({
          text: "Unpublish News",
          handleClick: () => {
            dispatch(
              setGeneralPrompt({
                open: true,
                continue_callback: () =>
                  dispatch(
                    NewsActions.unpublishNews(news.news_pk, () => {
                      handleRefetchTable();
                    })
                  ),
              })
            );
          },
        });
      } else if (news.sts_pk === "UP") {
        actions.push({
          text: "Publish News",
          handleClick: () => {
            dispatch(
              setGeneralPrompt({
                open: true,
                continue_callback: () =>
                  dispatch(
                    NewsActions.republishNews(news.news_pk, () => {
                      handleRefetchTable();
                    })
                  ),
              })
            );
          },
        });
      }

      actions.push({
        text: "Add Files",
        handleClick: () => {
          set_selected_file_news_pk(news.news_pk);
        },
      });

      return actions;
    },
    [dispatch, handleRefetchTable, handleSetOpenEditDialog]
  );

  useEffect(() => {
    let mounted = true;

    const initializingState = () => {
      dispatch(
        setPageLinks([
          {
            link: "/admin/news",
            title: "News",
          },
        ])
      );
    };

    mounted && initializingState();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (table_filter) {
      console.log(`table_filter`, table_filter);
      dispatch(NewsActions.setNewsDataTable(table_filter));
    }
  }, [dispatch, refetch_table]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterDtNewsAdminView handleSetTableFilter={handleSetTableFilter} table_filter={table_filter} handleRefetchTable={handleRefetchTable} />
        </Grid>
        <Grid item xs={12} md={9}>
          <div
            style={{
              minHeight: `100vh`,
              backgroundColor: `#fff`,
              borderRadius: `7px`,
              padding: `1em `,
              display: `grid`,
              gridGap: `1.5em`,
              alignContent: `start`,
              alignItems: `start`,
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <CustomButtonGroup
                  color="secondary"
                  getViewValue={handleSetView}
                  buttons={[
                    {
                      onClick: () => console.log(`1`),
                      text: "Timeline View",
                    },
                    {
                      onClick: () => console.log(`2`),
                      text: "Calendar View",
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} spacing={2} container justify="flex-end" alignItems="center">
                <Grid item>
                  <AddNewsAdminView handleRefetchTable={handleRefetchTable} />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <LinearLoadingProgress show={fetch_news_table} />

                {view === 0 ? (
                  <InfiniteScroll
                    pageStart={5}
                    initialLoad={false}
                    loadMore={(p: number) => {
                      const filter: PaginationModel = {
                        ...table_filter,
                        page: {
                          ...table_filter.page,
                          limit: p,
                        },
                      };
                      handleSetTableFilter(filter);
                      handleRefetchTable();
                    }}
                    hasMore={news_table_has_more}
                    loader={
                      <div className="loader" key={0}>
                        <Skeleton
                          style={{
                            margin: `1em`,
                          }}
                          variant="rect"
                          width={`100%`}
                          height={200}
                        />
                      </div>
                    }
                  >
                    {news_table?.map((news, index) => (
                      <StyledNewsContainer key={index}>
                        <div className="news-item">
                          <div className="header">
                            <div className="profile">
                              <CustomAvatar className="img" src={news?.user?.pic} errorMessage={news?.user?.full_name?.charAt(0)} />
                              <div className="name">{news?.user?.full_name}</div>
                              <div className="time">{moment(news?.encoded_at).fromNow()}</div>
                            </div>
                            <div className="actions">
                              <IconButtonPopper buttons={RenderNewsAction(news)} />
                            </div>
                          </div>

                          <div
                            style={{
                              justifySelf: `start`,
                            }}
                          >
                            <Chip
                              label={news?.status?.sts_desc}
                              style={{
                                color: news?.status?.sts_color,
                                backgroundColor: news?.status?.sts_backgroundColor,
                              }}
                            />
                          </div>

                          <div
                            className="petsa"
                            style={{
                              fontSize: `.87em`,
                            }}
                          >
                            Posted on {InvalidDateToDefault(news?.pub_date, "<no date>")}
                          </div>

                          <div className="news-title">
                            {news?.is_prio === 1 && <LabelImportantRoundedIcon fontSize={"small"} color="primary" />}

                            <div>{news?.title}</div>
                          </div>
                          <div className="body">{news.body}</div>

                          <NewsFilesDialog
                            news_pk={news.news_pk}
                            files={news.news_files}
                            selected_file_news_pk={selected_file_news_pk}
                            handleSetSelectedFileNewsPk={() => set_selected_file_news_pk(null)}
                            handleRefetchTable={handleRefetchTable}
                          />
                        </div>
                      </StyledNewsContainer>
                    ))}

                    {!news_table_has_more && (
                      <div
                        style={{
                          display: `grid`,
                          justifyContent: `center`,
                          justifyItems: `center`,
                          textAlign: `center`,
                          padding: `1em`,
                          color: `green`,
                        }}
                      >
                        <h5>No more news to show</h5>
                      </div>
                    )}
                  </InfiniteScroll>
                ) : (
                  <CalNewsAdminView
                    open_edit_dialog={open_edit_dialog}
                    handleSetOpenEditDialog={handleSetOpenEditDialog}
                    selected_news_pk={selected_news_pk}
                    handleSetSelectedNews={handleSetSelectedNews}
                    handleRefetchTable={handleRefetchTable}
                    selected_file_news_pk={selected_file_news_pk}
                    handleSetSelectedFileNewsPk={() => set_selected_file_news_pk(null)}
                  />
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {open_edit_dialog && selected_news_pk && (
        <EditNewsAdminView
          open={open_edit_dialog}
          handleSetOpen={handleSetOpenEditDialog}
          news_pk={selected_news_pk}
          handleRefetchTable={handleRefetchTable}
        />
      )}

      {/* {!!selected_file_news_pk && (
        <AddFilesDialog
          open_file_dialog={!!selected_file_news_pk}
          handleCloseDialog={() => set_selected_file_news_pk(null)}
          news_pk={selected_file_news_pk}
          handleRefetchFiles={handleRefetchTable}
        />
      )} */}
    </Container>
  );
});

export default DtNewsAdminView;
