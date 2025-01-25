import React, { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormDialog from "../../../Component/FormDialog/FormDialog";
import { setFilePreview } from "../../../Services/Actions/PageActions";
import { RootStore } from "../../../Services/Store";

interface PreviewFileDialogProps {}

export const PreviewFileDialog: FC<PreviewFileDialogProps> = memo(() => {
  const dispatch = useDispatch();

  const file_preview = useSelector((store: RootStore) => store.PageReducer.file_preview);

  return (
    <div>
      <FormDialog
        title="Preview"
        handleClose={() => dispatch(setFilePreview(null))}
        open={!!file_preview}
        minWidth={900}
        maxWidth={`md`}
        body={
          !!file_preview ? (
            <div>
              {file_preview?.type?.includes("image") && <img alt="" style={{ width: `100%`, height: `100%` }} src={file_preview?.url} />}
              {file_preview?.type?.includes("video") && <video style={{ width: `100%`, height: `100%` }} src={file_preview?.url} controls></video>}
            </div>
          ) : (
            <></>
          )
        }
        actions={
          <>
            {/* <Button variant="contained" form="form_add_news" color="primary" type="submit">
              Submit
            </Button> */}
          </>
        }
      />
    </div>
  );
});

export default PreviewFileDialog;
