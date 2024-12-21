import { IconButton } from "@material-ui/core";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import React, { FC, memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FTP_BASE_URL } from "../../../Helpers/Constants";
import { setGeneralPrompt, setSnackbar } from "../../../Services/Actions/PageActions";
import NewsApi from "../../../Services/Api/NewsApi";
import { NewsFileModel } from "../../../Services/Models/NewsModels";
import AddFilesDialog from "./AddFilesDialog";
interface INewsFilesDIalog {
  news_pk: number;
  selected_file_news_pk: number;
  handleSetSelectedFileNewsPk: () => void;
  files: Array<NewsFileModel>;
  handleRefetchTable: () => void;
}

export const NewsFilesDialog: FC<INewsFilesDIalog> = memo(
  ({ news_pk, selected_file_news_pk, handleRefetchTable, files, handleSetSelectedFileNewsPk }) => {
    const dispatch = useDispatch();
    // const [fetching_files, set_fetching_files] = useState(false);
    const [removing_files, set_removing_files] = useState(false);

    // const [refetch_files, set_refetch_files] = useState(0);
    // const [files, set_files] = useState<Array<NewsFileModel>>([]);

    const handleRemoveFile = useCallback(
      (payload: NewsFileModel) => {
        dispatch(
          setGeneralPrompt({
            open: true,
            continue_callback: async () => {
              set_removing_files(true);

              const response = await NewsApi.deleteNewsFile(payload);

              dispatch(setSnackbar(response.message.toString(), response.success ? "success" : "error"));

              if (response.success) {
                // set_refetch_files((prev) => prev + 1);
                handleRefetchTable();
              }

              set_removing_files(false);
            },
          })
        );
      },
      [dispatch]
    );

    console.log(`files`, files, FTP_BASE_URL);

    return (
      <StyledNewsFilesDialog>
        <div className="files">
          {files.map((file, index) => {
            return (
              <div key={index} className="file">
                <IconButton className="btn" onClick={() => handleRemoveFile(file)}>
                  <DeleteRoundedIcon />
                </IconButton>
                {file?.mimetype?.includes("image") && <img key={index} alt="" src={FTP_BASE_URL + file?.file_path} />}
                {file?.mimetype?.includes("video") && <video key={index} src={FTP_BASE_URL + file?.file_path} controls></video>}
              </div>
            );
          })}
        </div>

        {news_pk === selected_file_news_pk && (
          <AddFilesDialog
            open_file_dialog={!!selected_file_news_pk}
            handleCloseDialog={handleSetSelectedFileNewsPk}
            news_pk={selected_file_news_pk}
            handleRefetchFiles={handleRefetchTable}
          />
        )}
      </StyledNewsFilesDialog>
    );
  }
);

export default NewsFilesDialog;

const StyledNewsFilesDialog = styled.div`
  margin-top: 1em;
  .files {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    display: grid;
    grid-gap: 1rem;
    justify-content: start;
    align-content: flex-start;

    .file {
      display: grid;
      grid-template-areas: "c";
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 3px;
      background-color: #fafafa;
      width: 100%;

      .btn {
        grid-area: c;
        justify-self: end;
        align-self: start;
        margin: 0.5em;
        margin-top: 0.3em;
        background-color: #e3f2fd;
        i {
          color: #2196f3 !important ;
        }
      }
      img,
      video {
        grid-area: c;
        /* height: 120px; */
        height: auto;
        width: 100%;
        object-fit: cover;
        /* width: 100%; */
      }
    }
  }
`;
