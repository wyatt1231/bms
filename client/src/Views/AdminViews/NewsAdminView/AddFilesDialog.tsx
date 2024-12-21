import { Button, Grid } from "@material-ui/core";
import React, { FC, memo, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import FormDialog from "../../../Component/FormDialog/FormDialog";
import DropzoneFieldHookForm from "../../../Component/HookForm/DropzoneFieldHookForm";
import ObjectToFormDataHelper from "../../../Helpers/ObjectToFormDataHelper";
import NewsActions from "../../../Services/Actions/NewsActions";
import { setGeneralPrompt } from "../../../Services/Actions/PageActions";

interface AddNewsAdminProps {
  handleRefetchFiles?: () => void;
  handleCloseDialog: () => void;
  open_file_dialog: boolean;
  news_pk: number;
}

export const AddFilesDialog: FC<AddNewsAdminProps> = memo(({ handleRefetchFiles, handleCloseDialog, open_file_dialog, news_pk }) => {
  const dispatch = useDispatch();

  const form_add_news = useForm({
    mode: "onChange",
  });

  const handleSubmitForm = useCallback(
    (data) => {
      const form_data = {
        news_pk: news_pk,
      };

      const payload = ObjectToFormDataHelper(form_data);

      data?.uploaded_files?.forEach((f) => {
        payload.append("uploaded_files", f);
      });

      dispatch(
        setGeneralPrompt({
          open: true,
          continue_callback: () =>
            dispatch(
              NewsActions.addNewsFiles(payload, () => {
                handleRefetchFiles();
                handleCloseDialog();
              })
            ),
        })
      );
    },
    [dispatch, handleCloseDialog, handleRefetchFiles, news_pk]
  );

  return (
    <div>
      <FormDialog
        title="Pagdungag og files sa balita"
        handleClose={() => handleCloseDialog()}
        open={open_file_dialog}
        minWidth={500}
        body={
          <div>
            <FormProvider {...form_add_news}>
              <form onSubmit={form_add_news.handleSubmit(handleSubmitForm)} noValidate id="form_add_news">
                <Grid item container>
                  <Grid item xs={12}>
                    <DropzoneFieldHookForm name="uploaded_files" />
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </div>
        }
        actions={
          <>
            {/* <Button
                onClick={() => {
                  handleReset();
                }}
                variant="contained"
              >
                Usabon
              </Button> */}
            <Button variant="contained" form="form_add_news" color="primary" type="submit">
              Ipasa
            </Button>
          </>
        }
      />
    </div>
  );
});

export default AddFilesDialog;
