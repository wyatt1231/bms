import { Grid } from "@material-ui/core";
import React, { FC, memo } from "react";
import MultCheckboxHookForm from "../../../../Component/HookForm/MultCheckboxHookForm";

interface IStepIkaUpatBahin {}

export const StepIkaUpatBahin: FC<IStepIkaUpatBahin> = memo(() => {
  return (
    <div style={{ margin: `0 3em` }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MultCheckboxHookForm
            name="kahimtanang_komunidad"
            label="Community Status"
            // row={true}
            radio_items={[
              {
                value: "kawad-on/kulang sa panginabuhi",
                label: "kawad-on/kulang sa panginabuhi",
              },
              {
                value: "walay igong o layo sa eskwelahan",
                label: "walay igong o layo sa eskwelahan",
              },
              {
                value: "presensya sa mga nagkalain-laing krimen/bisyo o pang-abuso",
                label: "presensya sa mga nagkalain-laing krimen/bisyo o pang-abuso",
              },
              {
                value: "walay maayong agianan/kanal sa tubig",
                label: "walay maayong agianan/kanal sa tubig",
              },
              {
                value: "demolisyon",
                label: "demolisyon",
              },
              {
                value: "kulang ang mga pasilidad sa kuryente",
                label: "kulang ang mga pasilidad sa kuryente",
              },
              {
                value: "kulang ang mga pasilidad sa tubig",
                label: "kulang ang mga pasilidad sa tubig",
              },
              {
                value: "kulang ang mga pasilidad sa balay tambalan",
                label: "kulang ang mga pasilidad sa balay tambalan",
              },
              {
                value: "dulaanan sa mga bata",
                label: "dulaanan sa mga bata",
              },
              // {
              //   value: "uban pa (palihog pagsulat)",
              //   label: "uban pa (palihog pagsulat)",
              // },
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
});

export default StepIkaUpatBahin;
