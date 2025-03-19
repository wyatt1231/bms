import { Button, Chip, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import CircularLoadingProgress from "../../../../Component/CircularLoadingProgress";
import CustomAvatar from "../../../../Component/CustomAvatar";
import { InvalidDateToDefault } from "../../../../Hooks/UseDateParser";
import { StringEmptyToDefault } from "../../../../Hooks/UseStringFormatter";
import FamilyActions from "../../../../Services/Actions/FamilyActions";
import { setGeneralPrompt, setPageLinks } from "../../../../Services/Actions/PageActions";
import ResidentActions, { setSingleResidentAction } from "../../../../Services/Actions/ResidentActions";
import { RootStore } from "../../../../Services/Store";
import EditResident from "../EditResident";
import { ManageResident } from "./styles";

interface IManageResidentAdminView {}

export const ManageResidentAdminView: FC<IManageResidentAdminView> = memo(() => {
  const { resident_pk } = useParams<any>();
  const dispatch = useDispatch();

  const selected_resident = useSelector((store: RootStore) => store.ResidentReducer.selected_resident);
  const fetching_selected_resident = useSelector((store: RootStore) => store.ResidentReducer.fetching_selected_resident);

  const family_of_resident = useSelector((store: RootStore) => store.FamilyReducer.family_of_resident);

  const [open_edit_dialog, set_open_edit_dialog] = useState(false);

  const handleCloseEditDialog = useCallback(() => {
    set_open_edit_dialog(false);
  }, []);

  const handleOpenEditDialog = useCallback(() => {
    set_open_edit_dialog(true);
  }, []);

  const handleToggleActive = useCallback(() => {
    dispatch(
      setGeneralPrompt({
        open: true,
        continue_callback: () =>
          dispatch(
            ResidentActions.toggleResidentStatus(resident_pk, (msg: string) => {
              dispatch(setSingleResidentAction(resident_pk));
            })
          ),
      })
    );
  }, []);

  const handleToggleLogin = useCallback(() => {
    dispatch(
      setGeneralPrompt({
        open: true,
        continue_callback: () =>
          dispatch(
            ResidentActions.toggleResidentLogin(resident_pk, (msg: string) => {
              dispatch(setSingleResidentAction(resident_pk));
            })
          ),
      })
    );
  }, []);

  const fetch_family_of_resident = useSelector((store: RootStore) => store.FamilyReducer.fetch_family_of_resident);

  useEffect(() => {
    dispatch(setSingleResidentAction(resident_pk));
  }, [dispatch, resident_pk]);

  useEffect(() => {
    dispatch(FamilyActions.getFamilyOfResident(resident_pk));
  }, [dispatch, resident_pk]);

  useEffect(() => {
    dispatch(
      setPageLinks([
        {
          link: "/admin/resident",
          title: "Resident",
        },
        {
          link: window.location.pathname,
          title: "Impormasyon",
        },
      ])
    );
  }, [dispatch]);
  return (
    <ManageResident maxWidth="lg">
      {open_edit_dialog && <EditResident open={open_edit_dialog} handleClose={handleCloseEditDialog} resident_pk={resident_pk} />}
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleToggleLogin}>
                {selected_resident?.allow_login === "y" && "Disable Login"}
                {selected_resident?.allow_login === "n" && "Enable Login"}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleToggleActive}>
                {selected_resident?.sts_pk === "A" && "Deactivate"}
                {selected_resident?.sts_pk === "X" && "Activate"}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleOpenEditDialog}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <div
            style={{
              height: `100%`,
              width: `100%`,
              padding: `1em`,
              borderRadius: 7,
              backgroundColor: `#fff`,
            }}
          >
            <div className="title">Resident Information</div>
            {fetching_selected_resident ? (
              <CircularLoadingProgress />
            ) : (
              selected_resident && (
                <Grid container spacing={4}>
                  <Grid item xs={12} md={3} justify="center" spacing={1} container alignItems="flex-start" alignContent="flex-start">
                    <Grid item>
                      <h1>{selected_resident?.brgy_official_pos}</h1>
                    </Grid>
                    <Grid item>
                      <CustomAvatar height={20} width={20} src={selected_resident?.pic} errorMessage={selected_resident?.first_name?.charAt(0)} />
                    </Grid>
                    <Grid
                      item
                      style={{
                        fontWeight: 900,
                        fontSize: `1.5em`,
                        textAlign: `center`,
                      }}
                      xs={12}
                    >
                      {selected_resident?.first_name} {selected_resident?.middle_name} {selected_resident?.last_name} {selected_resident?.suffix}
                    </Grid>
                    <Grid item>
                      <Chip
                        label={selected_resident?.status?.sts_desc}
                        style={{
                          backgroundColor: selected_resident?.status?.sts_backgroundColor,
                          color: selected_resident?.status?.sts_color,
                        }}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      style={{
                        display: `grid`,
                        justifyItems: `center`,
                      }}
                    >
                      <Chip label={selected_resident.allow_login === `y` ? `Login Enabled` : `Login Disabled`} />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Gender</div>
                          <div className="value">{selected_resident.gender === "m" ? "Lalaki" : "Babae"}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Date of Birth</div>
                          <div className="value">{InvalidDateToDefault(selected_resident.birth_date, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Nationality</div>
                          <div className="value">{selected_resident.nationality}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Religion</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.religion, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Civil Status</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.civil_status, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Purok</div>
                          <div className="value">Purok {selected_resident.purok}</div>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Tribe</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.tribe, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row ">
                          <div className="label">Email Address</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.email, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row ">
                          <div className="label">Telephone Number</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.phone, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="info-group row">
                          <div className="label">School Attainment</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.educ, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="info-group row">
                          <div className="label">Work Status</div>
                          <div className="value">{StringEmptyToDefault(selected_resident.employment, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Monthly Income</div>
                          <div className="value">{selected_resident.kita}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Disability Status</div>
                          <div className="value">{selected_resident.with_disability === "y" ? "Oo" : "Dili"}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <div className="info-group row">
                          <div className="label">Resident Date</div>
                          <div className="value">{InvalidDateToDefault(selected_resident.resident_date, "-")}</div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <div className="info-group row">
                          <div className="label">Died Date</div>
                          <div className="value">{InvalidDateToDefault(selected_resident.died_date, "-")}</div>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )
            )}
          </div>
        </Grid>

        {family_of_resident && !fetch_family_of_resident && (
          <Grid item xs={12} md={12}>
            <div
              style={{
                height: `100%`,
                width: `100%`,
                padding: `1em`,
                borderRadius: 7,
                backgroundColor: `#fff`,
              }}
            >
              <div className="title">Information of the Resident's Family</div>

              <Grid container>
                <Grid item xs={6}>
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Head of the Family</div>
                      <div className="value profile">
                        <CustomAvatar
                          src={family_of_resident?.ulo_pamilya_info?.pic}
                          errorMessage={family_of_resident?.ulo_pamilya_info?.first_name.charAt(0)}
                        />
                        {family_of_resident?.ulo_pamilya_info?.first_name} {family_of_resident?.ulo_pamilya_info?.middle_name}
                        {family_of_resident?.ulo_pamilya_info?.last_name} {family_of_resident?.ulo_pamilya_info?.suffix}
                      </div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Okasyon sa Balay</div>
                      <div className="value">{family_of_resident?.okasyon_balay}</div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Straktura sa Balay</div>
                      <div className="value">{family_of_resident?.straktura}</div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Years of residency in the Barangay</div>
                      <div className="value">{family_of_resident?.kadugayon_pagpuyo}</div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Okasyon sa Yuta</div>
                      <div className="value">{family_of_resident?.okasyon_yuta}</div>
                    </div>
                  </Grid>{" "}
                  <Grid item>
                    <div className="info-group">
                      <div className="label">Kalig-on sa balay</div>
                      <div className="value">{family_of_resident?.kaligon_balay}</div>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Resident</TableCell>
                          <TableCell>Relationship</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {family_of_resident?.fam_members?.map((f, i) => (
                          <TableRow key={`fm` + i}>
                            <TableCell>
                              <div className="table-cell-profile">
                                <CustomAvatar
                                  className="img"
                                  height={4}
                                  width={4}
                                  src={f?.resident_info.pic}
                                  errorMessage={f?.resident_info?.first_name.charAt(0)}
                                />
                                <div className="title">
                                  {f?.resident_info?.first_name} {f?.resident_info?.middle_name}
                                  {f?.resident_info?.last_name} {f?.resident_info?.suffix}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{f.rel}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>

              {/* <Grid container spacing={1}>
                <Grid item xs={12}>
                  <div
                    className="fam-mem"
                    style={{
                      display: `grid`,
                      gridAutoColumns: `auto 1fr`,
                      gridAutoFlow: `column`,
                      gridGap: `.5em`,
                      alignItems: `center`,
                    }}
                  >
                    <CustomAvatar
                      src=""
                      style={{
                        boxShadow: `0 2px 4px orange`,
                        border: `2px solid orange`,
                      }}
                      errorMessage="JD"
                    />
                    <div
                      className="name"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      John Doe
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div
                    className="fam-mem"
                    style={{
                      display: `grid`,
                      gridAutoColumns: `auto 1fr`,
                      gridAutoFlow: `column`,
                      gridGap: `.5em`,
                      alignItems: `center`,
                    }}
                  >
                    <CustomAvatar src="" errorMessage="JD" />
                    <div
                      className="name"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      John Doe
                    </div>
                  </div>
                </Grid>
              </Grid>
            */}
            </div>
          </Grid>
        )}
        {/* <Grid item xs={12}>
            <div
              style={{
                height: `100%`,
                width: `100%`,
                padding: `1em`,
                borderRadius: 7,
                backgroundColor: `#fff`,
              }}
            >
              <div className="title">Aktibidad sa Resident</div>
            </div>
          </Grid> */}
      </Grid>
    </ManageResident>
  );
});

export default ManageResidentAdminView;
