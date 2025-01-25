import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Grid } from "@material-ui/core";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as yup from "yup";
import CircularLoadingProgress from "../../../../Component/CircularLoadingProgress";
import CustomStepper from "../../../../Component/CustomStepper/CustomStepper";
import FamilyActions from "../../../../Services/Actions/FamilyActions";
import { setGeneralPrompt, setPageLinks, setSnackbar } from "../../../../Services/Actions/PageActions";
import { FamMemberModel } from "../../../../Services/Models/FamilyModel";
import { ResidentModel } from "../../../../Services/Models/ResidentModels";
import { RootStore } from "../../../../Services/Store";
import { DbSerbisyoNadawat } from "../../../../Storage/LocalDatabase";
import AddFamMemDialog from "../CreateFamilyAdminView/AddFamMemDialog";
import StepIkaduhangBahin from "../CreateFamilyAdminView/StepIkaduhangBahin";
import StepIkatulongBahin from "../CreateFamilyAdminView/StepIkatulongBahin";
import StepIkaUpatBahin from "../CreateFamilyAdminView/StepIkaUpatBahin";
import StepUnangBahin from "../CreateFamilyAdminView/StepUnangBahin";
interface IManageFamilyAdminView {}

interface IParams {
  fam_pk: string;
}

export const ManageFamilyAdminView: FC<IManageFamilyAdminView> = memo(() => {
  const dispatch = useDispatch();

  const { fam_pk } = useParams<IParams>();

  const [form_schema, set_form_schema] = useState<any>(yup.object());

  const fam_members = useSelector((store: RootStore) => store.FamilyReducer.fam_members);

  const single_fam_by_fam_pk = useSelector((store: RootStore) => store.FamilyReducer.single_fam_by_fam_pk);

  // console.log(`single_fam_by_fam_pk`, single_fam_by_fam_pk);

  const fetch_single_fam_by_fam_pk = useSelector((store: RootStore) => store.FamilyReducer.fetch_single_fam_by_fam_pk);

  const [ulo_pamilya_extend_props, set_ulo_pamilya_extend_props] = useState<ResidentModel | null>({});

  const [active_step, set_active_step] = useState(0);

  const handleSetUloPamExtProps = useCallback((prop: any) => {
    set_ulo_pamilya_extend_props(prop);
  }, []);

  const form_create_fam = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(form_schema),
  });

  const Steps = [
    {
      label: "Unang Bahin",
      View: (
        <StepUnangBahin
          handleSetUloPamExtProps={handleSetUloPamExtProps}
          ulo_pamilya_extend_props={ulo_pamilya_extend_props}
          default_purok={single_fam_by_fam_pk?.ulo_fam_purok}
          defaultUloPamilya={single_fam_by_fam_pk?.ulo_fam_name}
        />
      ),
      subtitle: "Miyembro sa pamilya",
    },
    {
      label: "Ikaduhang Bahin",
      subtitle: "Mga unang  problema  sa panimalay",
      View: <StepIkaduhangBahin />,
    },
    {
      label: "Ikatulong Bahin",
      subtitle: "Kahimtang sa komunidad",
      View: <StepIkatulongBahin />,
    },
    {
      label: "Ika-upat Nga Bahin",
      subtitle: "Programa o serbisyo nga nadawat sa mga ahensya",
      View: <StepIkaUpatBahin />,
    },
  ];

  const submitForm = (payload) => {
    if (active_step === 0) {
      if (fam_members.length < 1) {
        dispatch(setSnackbar("Kinahanglan magbutang og bisan isa ka miyembro sa pamilya!", "error"));
        return;
      }
    }

    set_active_step((s) => {
      if (s < Steps.length - 1) {
        return s + 1;
      }
      return s;
    });

    if (active_step === 3 && !!single_fam_by_fam_pk?.fam_pk) {
      const biktima_pangabuso = payload.biktima_pangabuso.filter((value) => !!value && value !== "");
      const kahimtanang_komunidad = payload.kahimtanang_komunidad.filter((value) => !!value && value !== "");
      const matang_basura = payload.matang_basura.filter((value) => !!value && value !== "");
      const matang_kasilyas = payload.matang_kasilyas.filter((value) => !!value && value !== "");
      const pasilidad_kuryente = payload.pasilidad_kuryente.filter((value) => !!value && value !== "");
      const tinubdan_tubig = payload.tinubdan_tubig.filter((value) => !!value && value !== "");

      const serbisyo_nadawat = payload.serbisyo_nadawat.filter((value) => {
        if (typeof value?.programa === "string") {
          if (value?.programa !== "false") {
            return true;
          }
        }
        return false;
      });

      const fm: Array<FamMemberModel> = [];

      fam_members.forEach((r) => {
        fm.push({
          rel: r.rel,
          resident_pk: r.resident_pk,
        });
      });

      const form_data = {
        ...payload,
        fam_members: fm,
        biktima_pangabuso,
        kahimtanang_komunidad,
        matang_basura,
        matang_kasilyas,
        pasilidad_kuryente,
        tinubdan_tubig,
        serbisyo_nadawat,
        fam_pk: single_fam_by_fam_pk.fam_pk,
      };

      dispatch(
        setGeneralPrompt({
          open: true,
          continue_callback: () =>
            dispatch(
              FamilyActions.updateFamily(form_data, (msg: string) => {
                set_active_step(0);
                // form_create_fam.reset();
                dispatch(FamilyActions.getSingleFamByFamPk(parseInt(fam_pk)));
              })
            ),
        })
      );
    }
  };

  useEffect(() => {
    if (active_step === 0) {
      set_form_schema(
        yup.object({
          ulo_pamilya: yup.string().required().label("Ulo sa Pamilya"),
          kadugayon_pagpuyo: yup.number().nullable().required().label("Kadugayon sa pagpuyo"),
          okasyon_balay: yup.string().required().label("Okasyon sa balay"),
          okasyon_yuta: yup.string().required().label("Okasyon sa yuta"),
          straktura: yup.string().required().label("Straktura sa balay"),
          kaligon_balay: yup.string().required().label("Kalig-on sa balay"),
        })
      );
    } else if (active_step === 1) {
      set_form_schema(
        yup.object({
          tinubdan_tubig: yup.array().of(yup.string().required()).compact().min(1).label("Tinubdan sa tubig"),
          matang_kasilyas: yup.array().of(yup.string().required()).compact().min(1).label("Matang kasilyas"),
          pasilidad_kuryente: yup.array().of(yup.string().required()).compact().min(1).label("Pasilidad sa Kurwente"),
          matang_basura: yup.array().of(yup.string().required()).compact().min(1).label("Matang sa Paghipos sa basura"),
          biktima_pangabuso: yup.array().of(yup.string().required()).compact().label("Biktima sa pang-abuso"),
        })
      );
    } else if (active_step === 2) {
      set_form_schema(
        yup.object({
          kahimtanang_komunidad: yup.array().of(yup.string().required()).compact().label("Kahimtang sa komunidad"),
        })
      );
    } else if (active_step === 3) {
      set_form_schema(
        yup.object({
          serbisyo_nadawat: yup.array().of(
            yup.object({
              programa: yup.string().nullable().label("Programa"),
              ahensya: yup
                .string()
                .when("programa", (other, schema) => {
                  if (typeof other === "undefined") {
                    return schema;
                  }
                  if (other.toString() === "false" || other.toString() === "undefined") {
                    return schema;
                  } else {
                    return schema.required();
                  }

                  // return schema.required();

                  // return other.toString() === "false" ||
                  //   other.toString() === "undefined"
                  //   ? schema
                  //   : schema.required();
                })
                .label("Ahensya"),
            })
          ),
        })
      );
    }
  }, [active_step]);

  useEffect(() => {
    dispatch(FamilyActions.getSingleFamByFamPk(parseInt(fam_pk)));
  }, [dispatch, fam_pk]);

  useEffect(() => {
    dispatch(
      setPageLinks([
        {
          link: "/admin/family",
          title: "Families",
        },
        {
          link: window.location.pathname,
          title: "Create",
        },
      ])
    );

    dispatch(FamilyActions.setFamMembers([]));
  }, [dispatch]);

  useEffect(() => {
    if (!!single_fam_by_fam_pk && fetch_single_fam_by_fam_pk) {
      dispatch(FamilyActions.setFamMembers(single_fam_by_fam_pk.fam_members));

      const serbisyo_nadawat = [];

      // .map(
      //   (s) => {
      //     return {
      //       programa: s.programa,
      //       ahensya: s.ahensya,
      //     };
      //   }
      // );

      DbSerbisyoNadawat.forEach((dt) => {
        let sn_item = {
          programa: undefined,
          ahensya: "",
        };
        single_fam_by_fam_pk.serbisyo_nadawat.forEach((df) => {
          if (dt.value === df.programa) {
            sn_item = {
              programa: df.programa,
              ahensya: df.ahensya,
            };
          }
        });
        serbisyo_nadawat.push(sn_item);
      });

      // console.log(`reset -> `, single_fam_by_fam_pk);
      // form_create_fam.reset(single_fam_by_fam_pk);
      form_create_fam.reset({
        ...single_fam_by_fam_pk,
        serbisyo_nadawat: serbisyo_nadawat,
      });
    }
  }, [single_fam_by_fam_pk, dispatch, fetch_single_fam_by_fam_pk]);

  return (
    <>
      {fetch_single_fam_by_fam_pk && !!single_fam_by_fam_pk ? (
        <CircularLoadingProgress />
      ) : (
        <Container maxWidth="xl">
          <div
            style={{
              backgroundColor: `#fff`,
              padding: `1em`,
              borderRadius: 10,
            }}
          >
            <FormProvider {...form_create_fam}>
              <form id="form-add-fam" noValidate onSubmit={form_create_fam.handleSubmit(submitForm)} style={{ padding: `0 2em` }}>
                <CustomStepper steps={Steps} active_step={active_step} />

                <Grid container spacing={1} justify="flex-end">
                  <Grid item>
                    <Button
                      type="button"
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        set_active_step((s) => {
                          if (s > 0) {
                            return s - 1;
                          }
                          return s;
                        });
                      }}
                    >
                      Miaging Bahin
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button type="submit" form="form-add-fam" color="primary" variant="contained">
                      {active_step === Steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          </div>

          <AddFamMemDialog ulo_pamilya={ulo_pamilya_extend_props?.resident_pk} />
        </Container>
      )}
    </>
  );
});

export default ManageFamilyAdminView;
