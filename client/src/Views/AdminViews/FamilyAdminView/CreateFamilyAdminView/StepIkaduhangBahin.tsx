import { Grid } from "@material-ui/core";
import React, { FC, memo } from "react";
import MultCheckboxHookForm from "../../../../Component/HookForm/MultCheckboxHookForm";

interface IStepIkaduhangBahin {}

export const StepIkaduhangBahin: FC<IStepIkaduhangBahin> = memo(() => {
  return (
    <div style={{ margin: `0 3em` }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MultCheckboxHookForm
            name="tinubdan_tubig"
            label="1. Tinubdan sa tubig"
            radio_items={[
              {
                value: "walay konesyon sa tubig",
                label: "walay konesyon sa tubig",
              },
              {
                value: "bomba",
                label: "bomba",
              },
              {
                value: "ulan",
                label: "ulan",
              },
              {
                value: "barangay water work",
                label: "barangay water work",
              },
              {
                value: "tubod",
                label: "tubod",
              },
              {
                value: "balon",
                label: "balon",
              },
              {
                value: "DCWD",
                label: "DCWD",
              },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <MultCheckboxHookForm
            name="matang_kasilyas"
            label="2. Matang sa Kasilyas"
            radio_items={[
              {
                value: "walay kasilyas",
                label: "walay kasilyas",
              },
              {
                value: "antipolo",
                label: "antipolo",
              },
              {
                value: "buhos",
                label: "buhos",
              },
              {
                value: "water-seated",
                label: "water-seated",
              },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <MultCheckboxHookForm
            name="pasilidad_kuryente"
            label="3. Pasilidad sa Kurwente"
            radio_items={[
              {
                label: "walay koneksyon",
                value: "walay koneksyon",
              },
              {
                label: "lampara (gas)",
                value: "lampara (gas)",
              },
              {
                label: "kandila",
                value: "kandila",
              },
              {
                label: "petromaks (gas)",
                value: "petromaks (gas)",
              },
              {
                label: "davao light",
                value: "davao light",
              },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <MultCheckboxHookForm
            name="matang_basura"
            label="4. Matang sa Paghipos sa basura"
            radio_items={[
              {
                label: "ginalain ang mabulok ug dili mabulok",
                value: "ginalain ang mabulok ug dili mabulok",
              },
              {
                label: "ginakolekta sa CENTRO O Barangay",
                value: "ginakolekta sa CENTRO O Barangay",
              },
              {
                label: "ginalubong",
                value: "ginalubong",
              },
              {
                label: "ginalabay",
                value: "ginalabay",
              },
            ]}
          />
        </Grid>

        <Grid item xs={3}>
          <MultCheckboxHookForm
            name="biktima_pangabuso"
            label="5. Biktima sa pang-abuso"
            radio_items={[
              {
                label: "gibeya-an",
                value: "gibeya-an",
              },
              {
                label: "pangulata",
                value: "pangulata",
              },
              {
                label: "ginabaligya/illegal rekroter",
                value: "ginabaligya/illegal rekroter",
              },
              {
                label: "droga",
                value: "droga",
              },
              {
                label: "krime",
                value: "krime",
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
});

export default StepIkaduhangBahin;
