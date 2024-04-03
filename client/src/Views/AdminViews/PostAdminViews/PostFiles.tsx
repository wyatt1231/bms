import React, { memo, FC } from "react";
import styled from "styled-components";
import { FTP_BASE_URL } from "../../../Helpers/Constants";
interface PostFilesProps {
  files?: Array<any>;
}

const PostFiles: FC<PostFilesProps> = memo(({ files }) => {
  return (
    <>
      <PostFileBox>
        <div className="files">
          {files.map((file, index) => {
            return (
              <div key={index} className="file">
                {/* <IconButton
                  className="btn"
                  onClick={() => handleRemoveFile(file)}
                >
                  <DeleteRoundedIcon />
                </IconButton> */}
                {file?.mimetype?.includes("image") && (
                  <img
                    key={index}
                    alt=""
                    src={FTP_BASE_URL + file?.file_path}
                  />
                )}
                {file?.mimetype?.includes("video") && (
                  <video
                    key={index}
                    src={FTP_BASE_URL + file?.file_path}
                    controls
                  ></video>
                )}
              </div>
            );
          })}
        </div>
      </PostFileBox>
    </>
  );
});

export default PostFiles;

const PostFileBox = styled.div`
  margin-top: 1em;
  .files {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    display: grid;
    grid-gap: 1rem;
    justify-content: start;
    align-content: flex-start;

    .file {
      display: grid;
      grid-template-areas: "c";
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
        height: 120px;
        width: 100%;
      }
    }
  }
`;
