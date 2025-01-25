import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid, MenuItem, TextField } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Form, Formik, FormikHelpers } from "formik";
import moment from "moment";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import FormDialog from "../../../Component/FormDialog/FormDialog";
import FormikInputField from "../../../Component/Formik/FormikInputField";
import FormikRadio from "../../../Component/Formik/FormikRadio";
import MaskedPhoneNumber from "../../../Component/Mask/MaskedPhoneNumber";
import PhotoField from "../../../Component/PhotoField/PhotoField";
import { fileToBase64 } from "../../../Hooks/UseFileConverter";
import { setGeneralPrompt } from "../../../Services/Actions/PageActions";
import { setSingleResidentAction, updateResidentAction } from "../../../Services/Actions/ResidentActions";
import { ResidentModel } from "../../../Services/Models/ResidentModels";
import { RootStore } from "../../../Services/Store";
import { DbCivilStatus, DbNationality, DbReligion } from "../../../Storage/LocalDatabase";
interface IEditResident {
  resident_pk: number;
  open: boolean;
  handleClose: () => void;
}

const formSchema = yup.object({
  first_name: yup.string().required().max(150).label("First Name"),
  last_name: yup.string().required().max(150).label("Last Name"),
  gender: yup.string().required().max(150).label("Gender"),
  birth_date: yup.date().nullable().required().label("Birth Date"),
  nationality: yup.string().required().max(150).label("Nationality"),
  religion: yup.string().required().max(150).label("Religion"),
  civil_status: yup.string().required().max(150).label("Civil Status"),
  with_disability: yup.string().required().max(150).label("With Disability"),

  purok: yup.string().required().max(150).label("Purok"),
  phone: yup.string().max(150).label("Phone Number"),
  email: yup.string().email().max(150).label("Email Address"),
});

export const EditResident: FC<IEditResident> = memo(({ resident_pk, open, handleClose }) => {
  const dispatch = useDispatch();

  const selected_resident = useSelector((store: RootStore) => store.ResidentReducer.selected_resident);

  const [pic, setPic] = useState<any>(null);
  const handleSetPic = useCallback((logo) => {
    setPic(logo);
  }, []);

  const handleFormSubmit = useCallback(
    async (formValues: ResidentModel, helpers: FormikHelpers<ResidentModel>) => {
      console.log(`payload`, formValues);
      formValues.pic = await fileToBase64(pic);
      dispatch(
        setGeneralPrompt({
          open: true,
          continue_callback: () =>
            dispatch(
              updateResidentAction(formValues, (msg: string) => {
                helpers.resetForm();
                setPic(null);
                dispatch(setSingleResidentAction(resident_pk.toString()));
                handleClose();
              })
            ),
        })
      );
    },
    [dispatch, handleClose, pic, resident_pk]
  );

  useEffect(() => {
    if (resident_pk) {
      dispatch(setSingleResidentAction(resident_pk.toString()));
    }
  }, [dispatch, resident_pk]);

  useEffect(() => {
    if (selected_resident?.pic) {
      var file = dataURLtoFile(`data:image/jpg;base64,${selected_resident.pic}`, "adasdas.jpg");
      setPic(file);
    }
  }, [selected_resident]);

  return (
    <>
      <FormDialog
        title="Specify the information that you want to change."
        handleClose={handleClose}
        open={open}
        minWidth={600}
        body={
          <>
            <Formik
              initialValues={selected_resident}
              validationSchema={formSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleFormSubmit}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form
                  className=""
                  style={{
                    backgroundColor: `#fff`,
                    padding: `1em 4em`,
                  }}
                  id="form-edit-resident"
                  noValidate
                >
                  <div className="">
                    <div className="box-header">
                      <div className="form-title">Pun-a ang mga kinahanglan nga impormasyon sa residente</div>
                    </div>
                    <div className="box-body">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <div className="title">Personal Nga Impormasyon</div>
                        </Grid>

                        <Grid xs={12} container justify="center" item>
                          <div style={{ padding: "1.5em 0" }}>
                            <PhotoField
                              label=""
                              height={180}
                              width={180}
                              selectedFile={pic}
                              name="pic"
                              variant="circle"
                              handleChange={handleSetPic}
                            />
                          </div>
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField
                            label="Unang Pangalan"
                            name="first_name"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField
                            label="Tungatunga nga ngalan"
                            name="middle_name"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField label="Apelyido" name="last_name" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth />
                        </Grid>

                        <Grid sm={3} item>
                          <FormikInputField label="Sukwahi" name="suffix" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikRadio
                            name="gender"
                            label="Sekso"
                            variant="vertical"
                            data={[
                              {
                                id: "m",
                                label: "Lalaki",
                              },
                              {
                                id: "f",
                                label: "Babae",
                              },
                            ]}
                          />
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const label = "Adlawng Natawhan";
                            const name = "birth_date";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (date) => {
                              setFieldValue(name, moment(date).toDate());
                            };
                            return (
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                  <KeyboardDatePicker
                                    value={values[name]}
                                    onChange={handleChange}
                                    label={label}
                                    variant="inline"
                                    animateYearScrolling={true}
                                    disableFuture={true}
                                    format="MM/dd/yyyy"
                                    fullWidth={true}
                                    inputVariant="outlined"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    autoOk={true}
                                    error={!!errorText}
                                    helperText={errorText}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            );
                          })()}
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const name = "nationality";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (e: any) => {
                              setFieldValue(name, e.target.value);
                            };
                            return (
                              <TextField
                                value={values[name] ? values[name] : ""}
                                label="Nasyonalidad"
                                select
                                onChange={handleChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errorText}
                                helperText={errorText}
                                required
                              >
                                {DbNationality.map((value) => (
                                  <MenuItem key={value} value={value}>
                                    {value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            );
                          })()}
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const name = "religion";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (e: any) => {
                              setFieldValue(name, e.target.value);
                            };
                            return (
                              <TextField
                                value={values[name] ? values[name] : ""}
                                label="Relihiyon"
                                select
                                onChange={handleChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errorText}
                                helperText={errorText}
                                required
                              >
                                {DbReligion.map((value) => (
                                  <MenuItem key={value} value={value}>
                                    {value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            );
                          })()}
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const name = "civil_status";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (e: any) => {
                              setFieldValue(name, e.target.value);
                            };
                            return (
                              <TextField
                                value={values[name] ? values[name] : ""}
                                label="Hahimtang Sibil"
                                select
                                onChange={handleChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={!!errorText}
                                helperText={errorText}
                                required
                              >
                                {DbCivilStatus.map((value) => (
                                  <MenuItem key={value} value={value}>
                                    {value}
                                  </MenuItem>
                                ))}
                              </TextField>
                            );
                          })()}
                        </Grid>

                        <Grid xs={12} item>
                          <FormikRadio
                            name="purok"
                            label="Asa na purok nag puyo ang residente?"
                            variant="horizontal"
                            data={[
                              {
                                id: "1",
                                label: "Purok 1",
                              },
                              {
                                id: "2",
                                label: "Purok 2",
                              },
                              {
                                id: "3",
                                label: "Purok 3",
                              },
                              {
                                id: "4",
                                label: "Purok 4",
                              },
                              {
                                id: "5",
                                label: "Purok 5",
                              },
                              {
                                id: "6",
                                label: "Purok 6",
                              },
                              {
                                id: "7",
                                label: "Purok 7",
                              },
                              {
                                id: "8",
                                label: "Purok 8",
                              },
                            ]}
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField label="Tribo" name="tribe" variant="outlined" InputLabelProps={{ shrink: true }} fullWidth type="text" />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField
                            label="Grado nakab-ot | Nag-eskwela / wala nag eskwela"
                            name="educ"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            type="text"
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikRadio
                            name="employment"
                            label="Matang sa trabaho, kanunay o panagsa?"
                            variant="horizontal"
                            data={[
                              {
                                id: "kanunay naay trabaho",
                                label: "kanunay naay trabaho",
                              },
                              {
                                id: "panagsa",
                                label: "panagsa ra ang trabaho",
                              },
                              {
                                id: "walay tranaho",
                                label: "walay trabaho",
                              },
                            ]}
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField
                            label="Binulan na kita"
                            name="kita"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            type="number"
                          />
                        </Grid>

                        <Grid xs={12} item>
                          <FormikRadio
                            name="with_disability"
                            label="Matang sa disability"
                            variant="vertical"
                            data={[
                              {
                                id: "y",
                                label: "Naa",
                              },
                              {
                                id: "n",
                                label: "Wala",
                              },
                            ]}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <div className="title">Status sa pagkabuhi</div>
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const label = "Adlaw sugod pagpuyo sa barangay";
                            const name = "resident_date";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (date) => {
                              setFieldValue(name, moment(date).toDate());
                            };
                            return (
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                  <KeyboardDatePicker
                                    value={values[name]}
                                    onChange={handleChange}
                                    label={label}
                                    variant="inline"
                                    animateYearScrolling={true}
                                    disableFuture={true}
                                    format="MM/dd/yyyy"
                                    fullWidth={true}
                                    inputVariant="outlined"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    autoOk={true}
                                    error={!!errorText}
                                    helperText={errorText}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            );
                          })()}
                        </Grid>

                        <Grid xs={12} item>
                          {(() => {
                            const label = "Adlaw pagkamatay (kung patay na)";
                            const name = "died_date";
                            const errorText = errors[name] && touched[name] ? errors[name] : "";
                            const handleChange = (date) => {
                              setFieldValue(name, moment(date).toDate());
                            };
                            return (
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                  <KeyboardDatePicker
                                    value={values[name]}
                                    onChange={handleChange}
                                    label={label}
                                    variant="inline"
                                    animateYearScrolling={true}
                                    disableFuture={true}
                                    format="MM/dd/yyyy"
                                    fullWidth={true}
                                    inputVariant="outlined"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    autoOk={true}
                                    error={!!errorText}
                                    helperText={errorText}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            );
                          })()}
                        </Grid>

                        <Grid item xs={12}>
                          <div className="title">Account Nga Impormasyon</div>
                        </Grid>

                        <Grid xs={12} item>
                          <FormikInputField
                            label="Email Address (Used as username)"
                            name="email"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            type="email"
                            required
                          />
                        </Grid>
                        <Grid xs={12} item>
                          <FormikInputField
                            label="Numero sa telepono"
                            name="phone"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            InputProps={{
                              inputComponent: MaskedPhoneNumber,
                            }}
                            required
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        }
        actions={
          <>
            <Button type="submit" variant="contained" color="primary" disableElevation form="form-edit-resident">
              Update Resident
            </Button>

            <Button
              type="button"
              color="secondary"
              disableElevation
              onClick={() => {
                handleClose();
                // history.push(`/admin/resident`);
              }}
            >
              Cancel
            </Button>
          </>
        }
      />
    </>
  );
});

export default EditResident;

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
