import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import React, { FC, memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAvatar from "../../../../Component/CustomAvatar";
import AutocompleteHookForm from "../../../../Component/HookForm/AutocompleteHookForm";
import MultiRadioFieldHookForm from "../../../../Component/HookForm/MultiRadioFieldHookForm";
import TextFieldHookForm from "../../../../Component/HookForm/TextFieldHookForm";
import IconButtonPopper from "../../../../Component/IconButtonPopper/IconButtonPopper";
import { InvalidDateToDefault } from "../../../../Hooks/UseDateParser";
import FamilyActions from "../../../../Services/Actions/FamilyActions";
import { ResidentModel } from "../../../../Services/Models/ResidentModels";
import { RootStore } from "../../../../Services/Store";
import ResidentInfo from "./ResidentInfo";

interface IStepUnangBahin {
  ulo_pamilya_extend_props: ResidentModel | any;
  handleSetUloPamExtProps: (ext_prop: any) => void;
  defaultUloPamilya?: string;
  default_purok?: string;
}

export const StepUnangBahin: FC<IStepUnangBahin> = memo(
  ({
    handleSetUloPamExtProps,
    defaultUloPamilya,
    default_purok,
    ulo_pamilya_extend_props,
  }) => {
    const dispatch = useDispatch();

    const fam_members = useSelector(
      (store: RootStore) => store.FamilyReducer.fam_members
    );

    console.log(`defaultUloPamilya`, defaultUloPamilya);

    const handleRemoveFamMember = useCallback(
      (index: number) => {
        fam_members.splice(index, 1);
        const fam_mem_payload = [...fam_members];
        dispatch(FamilyActions.setFamMembers(fam_mem_payload));
      },
      [dispatch, fam_members]
    );

    const handleGetExtPropUloPam = (values: any) => {
      handleSetUloPamExtProps(values);
    };

    const [selected_resident, set_selected_resident] = useState<ResidentModel>(
      null
    );

    const handleSetResident = useCallback((resident: ResidentModel | null) => {
      set_selected_resident(resident);
    }, []);

    return (
      <div style={{ margin: `0 3em` }}>
        <Grid container spacing={2}>
          <Grid item xs={12} spacing={2} container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AutocompleteHookForm
                    label="Pangalan sa Ulo sa Pamilya"
                    endpoint="api/family/searchNoFamResident"
                    name="ulo_pamilya"
                    fullWidth
                    defaultInputValue={
                      !!defaultUloPamilya ? defaultUloPamilya : ""
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    handleGetExtProp={handleGetExtPropUloPam}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    disabled
                    value={
                      !!ulo_pamilya_extend_props?.purok
                        ? ulo_pamilya_extend_props.purok
                        : !!default_purok
                        ? default_purok
                        : ""
                    }
                    label="Purok"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    disabled
                    value={InvalidDateToDefault(
                      ulo_pamilya_extend_props?.resident_date,
                      "-"
                    )}
                    label="Petsa pagkaresidente"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={12}>
                <TextFieldHookForm
                  // fullWidth
                  variant="outlined"
                  name="kadugayon_pagpuyo"
                  label="Kadugayon sa pagpuyo sa Barangay (tuig)"
                  type="number"
                  style={{ minWidth: 380 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiRadioFieldHookForm
                  name="okasyon_balay"
                  label="Okasyon sa balay"
                  radio_items={[
                    {
                      value: "tag-iya",
                      label: "tag-iya",
                    },
                    {
                      value: "renta",
                      label: "renta",
                    },
                    {
                      value: "boarder",
                      label: "boarder",
                    },
                    {
                      label: "nangipon ug puyo",
                      value: "nangipon ug puyo",
                    },
                    {
                      label: "balay ug balay",
                      value: "nisumpay ug balay",
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={3}>
                <MultiRadioFieldHookForm
                  name="okasyon_yuta"
                  label="Okasyon sa Yuta"
                  radio_items={[
                    {
                      label: "nanag-iya sa yuta",
                      value: "nanag-iya sa yuta",
                    },
                    {
                      value: "nang arkila sa yuya",
                      label: "binuhat sa Semento",
                    },
                    {
                      value: "informal settler",
                      label: "informal settler",
                    },
                    {
                      value: "tig-bantay sa yuta",
                      label: "tig-bantay sa yuta",
                    },
                  ]}
                />
              </Grid>

              <Grid item xs={3}>
                <MultiRadioFieldHookForm
                  name="straktura"
                  label="Straktura sa Balay"
                  radio_items={[
                    {
                      label: "binuhat sa kahoy",
                      value: "binuhat sa kahoy",
                    },
                    {
                      value: "binuhat sa semento",
                      label: "binuhat sa semento",
                    },
                    {
                      value: "kombinasyon sa kahoy ug semento",
                      label: "kombinasyon sa kahoy ug semento",
                    },

                    {
                      value: "binuhat sa mga nilabay na materyales",
                      label:
                        "binuhat sa mga nilabay na materyales sama sa (karton, plastic, kahoy, kawayan ug uban pa)(Salvaged materials)",
                    },
                    // {
                    //   value: "uban matang",
                    //   label: "Uban matang",
                    // },
                  ]}
                />
              </Grid>
              <Grid item xs={3}>
                <MultiRadioFieldHookForm
                  name="kaligon_balay"
                  label="Kalig-on sa balay"
                  radio_items={[
                    {
                      label: "huyang",
                      value: "huyang",
                    },
                    {
                      label: "lig-on",
                      value: "lig-on",
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div className="title">SAKOP SA PINIMALAY</div>
          </Grid>
          <Grid item xs={12} container justify="flex-end">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  dispatch(FamilyActions.setOpenFamMemberDialog(true));
                }}
              >
                Dungag og Sakop sa Pamilya
              </Button>
            </Grid>
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
                    <TableCell>Pangalan</TableCell>
                    <TableCell>Relasyon</TableCell>
                    <TableCell>Aksyon</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fam_members.length <= 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Walay sakop sa pamilya nga gi butang.
                      </TableCell>
                    </TableRow>
                  )}
                  {fam_members.map((f, i) => (
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
                            height={3}
                            width={3}
                            errorMessage={
                              f?.resident_info?.first_name.charAt(0) +
                              f?.resident_info?.last_name.charAt(0)
                            }
                            src={f?.resident_info?.pic}
                          />
                          <div>
                            {f?.resident_info?.last_name}{" "}
                            {f?.resident_info?.first_name}{" "}
                            {f?.resident_info?.middle_name}{" "}
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
                            {
                              text: "Tanggalon sa listahan",
                              handleClick: () => {
                                handleRemoveFamMember(i);
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
        <ResidentInfo
          resident={selected_resident}
          handleSetResident={handleSetResident}
        />
      </div>
    );
  }
);

export default StepUnangBahin;
