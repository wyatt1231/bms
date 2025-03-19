import { Button, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CustomAvatar from "../../../Component/CustomAvatar";
import IconButtonPopper from "../../../Component/IconButtonPopper/IconButtonPopper";
import FamilyActions from "../../../Services/Actions/FamilyActions";
import { ResidentModel } from "../../../Services/Models/ResidentModels";
import { RootStore } from "../../../Services/Store";
import ResidentInfo from "./CreateFamilyAdminView/ResidentInfo";

interface FamilyViewProps {}

const FamilyView: FC<FamilyViewProps> = memo(() => {
  const dispatch = useDispatch();
  const { fam_pk } = useParams<any>();

  const single_fam_by_fam_pk = useSelector((store: RootStore) => store.FamilyReducer.single_fam_by_fam_pk);

  console.log(`single_fam_by_fam_pk --->`, single_fam_by_fam_pk);

  const [selected_resident, set_selected_resident] = useState<ResidentModel>(null);

  const handleSetResident = useCallback((resident: ResidentModel | null) => {
    set_selected_resident(resident);
  }, []);

  useEffect(() => {
    dispatch(FamilyActions.getSingleFamByFamPk(parseInt(fam_pk)));
  }, [dispatch, fam_pk]);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2} justify="flex-end">
              <NavLink to={`/admin/family/update/${fam_pk}`}>
                <Button color="primary" variant="contained">
                  Reset Details
                </Button>
              </NavLink>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
                padding: `1em`,
                borderRadius: 10,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} container>
                  <h3>Information of balay</h3>
                </Grid>
                <Grid item xs={12} md={4} container justify="center">
                  <CustomAvatar
                    src={single_fam_by_fam_pk?.ulo_pamilya_info?.pic}
                    errorMessage={single_fam_by_fam_pk?.ulo_fam_name?.charAt(0)}
                    height={15}
                    width={15}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Head of the family Name:</div>
                        <div className="value">{single_fam_by_fam_pk?.ulo_fam_name}</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Purok:</div>
                        <div className="value">{single_fam_by_fam_pk?.ulo_fam_purok}</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Years of being a resident:</div>
                        <div className="value">{single_fam_by_fam_pk?.kadugayon_pagpuyo} years</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Okasyon sa balay:</div>
                        <div className="value">{single_fam_by_fam_pk?.okasyon_balay}</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Structura sa balay:</div>
                        <div className="value">{single_fam_by_fam_pk?.straktura}</div>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <div className="info-group">
                        <div className="label">Kalig-on sa balay:</div>
                        <div className="value">{single_fam_by_fam_pk?.kaligon_balay}</div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
                padding: `1em`,
                borderRadius: 10,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} container>
                  <h3>Mga sakop sa panimalay</h3>
                </Grid>

                <Grid item xs={12}>
                  <TableContainer
                    style={{
                      maxHeight: 250,
                    }}
                  >
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Relationship</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {single_fam_by_fam_pk?.fam_members?.length <= 0 && (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              No Family Members added.
                            </TableCell>
                          </TableRow>
                        )}
                        {single_fam_by_fam_pk?.fam_members?.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell>
                              <div
                                style={{
                                  display: `grid`,
                                  gridGap: `.5em`,
                                  alignItems: `center`,
                                  alignContent: `center`,
                                  justifyContent: `start`,
                                  gridAutoFlow: `column`,
                                }}
                              >
                                <CustomAvatar
                                  height={2.5}
                                  width={2.5}
                                  errorMessage={f?.resident_info?.first_name.charAt(0) + f?.resident_info?.last_name.charAt(0)}
                                  src={f?.resident_info?.pic}
                                />
                                <div>
                                  {f?.resident_info?.last_name} {f?.resident_info?.first_name} {f?.resident_info?.middle_name}{" "}
                                  {f?.resident_info?.suffix}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>{f.rel}</TableCell>
                            <TableCell>
                              <IconButtonPopper
                                buttons={[
                                  {
                                    text: "Ipakita ang tibuok impormasyon",
                                    handleClick: () => {
                                      handleSetResident(f.resident_info);
                                    },
                                  },
                                ]}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
                padding: `1em`,
                borderRadius: 10,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} container>
                  <h3>First problems of the family</h3>
                </Grid>

                <Grid item xs={12} container spacing={1}>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">1. Tinubdan sa tubig :</div>
                      <div className="value">{single_fam_by_fam_pk?.tinubdan_tubig}</div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">2. Matang sa Kasilyas :</div>
                      <div className="value">{single_fam_by_fam_pk?.matang_kasilyas}</div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">3. Pasilidad sa Kurwente :</div>
                      <div className="value">{single_fam_by_fam_pk?.pasilidad_kuryente}</div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">4. Matang sa Paghipos sa basura :</div>
                      <div className="value">{single_fam_by_fam_pk?.matang_basura}</div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">5. Biktima sa pang-abuso :</div>
                      <div className="value">{single_fam_by_fam_pk?.biktima_pangabuso}</div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <div className="info-group">
                      <div className="label">Community Status: </div>
                      <div className="value">{single_fam_by_fam_pk?.kahimtanang_komunidad}</div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
                padding: `1em`,
                borderRadius: 10,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} container>
                  <h3>Status</h3>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                  {single_fam_by_fam_pk?.kahimtanang_komunidad.map((r, i) => (
                    <>
                      <Grid item xs={12}>
                        <div className="info-group">
                          <div className="label">{i + 1}. </div>
                          <div className="value">{r}</div>
                        </div>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
                padding: `1em`,
                borderRadius: 10,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} container>
                  <h3>Received programs and services form agencies</h3>
                </Grid>

                <Grid item xs={12} container spacing={1}>
                  {single_fam_by_fam_pk?.serbisyo_nadawat.map((r, i) => (
                    <>
                      <Grid item xs={12}>
                        <div className="info-group">
                          <div className="label">{i + 1}. </div>
                          <div className="value">
                            {r.ahensya}- {r.programa}
                          </div>
                        </div>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>

      <ResidentInfo resident={selected_resident} handleSetResident={handleSetResident} />
    </>
  );
});

export default FamilyView;
