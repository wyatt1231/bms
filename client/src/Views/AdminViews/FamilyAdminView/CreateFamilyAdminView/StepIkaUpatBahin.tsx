import { Grid } from "@material-ui/core";
import React, { FC, memo } from "react";
import MultiCheckboxTextFieldHookForm from "../../../../Component/HookForm/MultiCheckboxTextFieldHookForm";

interface IStepIkaUpatBahin {}

export const StepIkaUpatBahin: FC<IStepIkaUpatBahin> = memo(({}) => {
  return (
    <div style={{ margin: `0 3em` }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MultiCheckboxTextFieldHookForm
            name="serbisyo_nadawat"
            label="Programa o serbisyo nga nadawat sa mga nagkalain-laing ahensya (goberno o pribado)"
            checkbox_name="programa"
            input_field_name="ahensya"
            radio_items={[
              {
                value: "scholarship",
                label: "scholarship",
              },
              {
                value: "livelihood",
                label: "livelihood",
              },
              {
                value: "4p's",
                label: "4p's",
              },
              {
                value: "housing",
                label: "housing",
              },
              {
                value: "financial",
                label: "financial",
              },
              {
                value: "lingat (burial ug medical)",
                label: "lingat (burial ug medical)",
              },
              {
                value: "medical nga tabang",
                label: "medical nga tabang",
              },
              {
                value: "day care service",
                label: "day care service",
              },
              {
                value: "skill training",
                label: "skill training",
              },
              {
                value: "employment",
                label: "employment",
              },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
});

export default StepIkaUpatBahin;
