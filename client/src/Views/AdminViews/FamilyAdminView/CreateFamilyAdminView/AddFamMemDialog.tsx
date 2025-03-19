import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@material-ui/core";
import React, { FC, memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import FormDialog from "../../../../Component/FormDialog/FormDialog";
import AutocompleteHookForm from "../../../../Component/HookForm/AutocompleteHookForm";
import MultiRadioFieldHookForm from "../../../../Component/HookForm/MultiRadioFieldHookForm";
import LoadingButton from "../../../../Component/LoadingButton";
import FamilyActions from "../../../../Services/Actions/FamilyActions";
import { setSnackbar } from "../../../../Services/Actions/PageActions";
import ResidentApi from "../../../../Services/Api/ResidentApi";
import { FamMemberModel } from "../../../../Services/Models/FamilyModel";
import { RootStore } from "../../../../Services/Store";
interface IAddFamMemDialog {
  ulo_pamilya: number;
}

const validSchema = yup.object({
  resident_pk: yup.string().required().label("Resident"),
  rel: yup.string().required().label("Relationship"),
});

export const AddFamMemDialog: FC<IAddFamMemDialog> = memo(({ ulo_pamilya }) => {
  const dispatch = useDispatch();
  const [adding_fam_mem, set_adding_fam_mem] = useState(false);

  const open_fam_member_dialog = useSelector((store: RootStore) => store.FamilyReducer.open_fam_member_dialog);
  const fam_members = useSelector((store: RootStore) => store.FamilyReducer.fam_members);

  const handleAddFamMembers = useCallback(
    (fam_member: FamMemberModel) => {
      const fam_mem_payload = [...fam_members, fam_member];
      dispatch(FamilyActions.setFamMembers(fam_mem_payload));
    },
    [dispatch, fam_members]
  );

  const form_add_fam = useForm({
    resolver: yupResolver(validSchema),
    mode: "onBlur",
  });

  const submitForm = async (formData: FamMemberModel) => {
    if (formData.resident_pk) {
      const findMem = fam_members.findIndex((f) => f.resident_pk === formData.resident_pk);

      if (findMem) {
        set_adding_fam_mem(true);
        const response = await ResidentApi.getSingleResident(formData.resident_pk);

        set_adding_fam_mem(false);

        if (response.success) {
          formData.resident_info = response.data;
          handleAddFamMembers(formData);
          dispatch(FamilyActions.setOpenFamMemberDialog(false));
        }
      } else {
        dispatch(setSnackbar("Makita nani nga Resident sa Family Members!", "error"));
      }
    }
  };
  return (
    <>
      <FormDialog
        open={!!open_fam_member_dialog}
        title="Choose Family Members"
        handleClose={() => {
          dispatch(FamilyActions.setOpenFamMemberDialog(false));
        }}
        body={
          <FormProvider {...form_add_fam}>
            <form id="form-add-family-member" noValidate onSubmit={form_add_fam.handleSubmit(submitForm)} style={{ padding: `0 5em` }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutocompleteHookForm
                    endpoint="api/family/searchFamMember"
                    name="resident_pk"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Name sa Sako sa Pamilya"
                    variant="outlined"
                    payload={{
                      fam_members: [...fam_members.map((f) => f.resident_pk), ulo_pamilya],
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MultiRadioFieldHookForm
                    name="rel"
                    label="Relationship sa Head of the Family"
                    radio_items={[
                      {
                        value: "asawa",
                        label: "asawa",
                      },
                      {
                        value: "bana",
                        label: "bana",
                      },
                      {
                        value: "anak",
                        label: "anak",
                      },
                      {
                        label: "igsuon",
                        value: "igsuon",
                      },
                      {
                        label: "amahan",
                        value: "amahan",
                      },
                      {
                        label: "inahan",
                        value: "inahan",
                      },
                      {
                        label: "others",
                        value: "others",
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            </form>
          </FormProvider>
        }
        actions={
          <>
            <LoadingButton
              type="submit"
              //type="button"
              variant="contained"
              form="form-add-family-member"
              loading={adding_fam_mem}
              color="primary"
            >
              Add in Family Members
            </LoadingButton>
          </>
        }
      />
    </>
  );
});

export default AddFamMemDialog;
