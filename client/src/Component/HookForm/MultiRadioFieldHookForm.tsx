import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { FC, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RadioItems {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface MultiRadioFieldHookFormProps {
  //extends Partial<> {
  name: string;
  label: string;
  variant?: "standard" | "outlined" | "filled";
  row?: boolean;
  radio_items: Array<RadioItems>;
}

export const MultiRadioFieldHookForm: FC<MultiRadioFieldHookFormProps> = memo(
  (props) => {
    const { control, errors } = useFormContext();

    let error = false;
    let error_message = "";

    if (errors && errors?.hasOwnProperty(props?.name)) {
      error = true;
      error_message = errors[props?.name]?.message;
    }

    return (
      <Controller
        name={props.name}
        control={control}
        render={(ctrlProps, { invalid, isTouched, isDirty }) => (
          <FormControl
            error={error}
            variant={props.variant}
            component="fieldset"
          >
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup
              row={props.row}
              {...ctrlProps}
              value={ctrlProps.value ? ctrlProps.value : ""}
            >
              {props.radio_items.map((radio, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={radio.value}
                    control={<Radio />}
                    label={radio.label}
                    disabled={radio.disabled}
                    // checked={radio.value === ctrlProps.value}
                    // defaultChecked={radio.value === ctrlProps.value}
                  />
                );
              })}
            </RadioGroup>
            <FormHelperText>{error_message}</FormHelperText>
          </FormControl>
        )}
      />
    );
  }
);

export default MultiRadioFieldHookForm;
