import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import React, { FC, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RadioItems {
  label: string;
  value: string | number;
  disabled?: boolean;
  defaultCheck?: boolean;
}

interface MultiCheckboxTextFieldHookFormProps {
  name: string;
  label: string;
  variant?: "standard" | "outlined" | "filled";
  row?: boolean;
  radio_items: Array<RadioItems>;
  input_field_name: string;
  checkbox_name: string;
}

export const MultiCheckboxTextFieldHookForm: FC<MultiCheckboxTextFieldHookFormProps> =
  memo((main_cb_props) => {
    const { control, errors, trigger } = useFormContext();

    return (
      <FormControl variant={main_cb_props.variant} component="fieldset">
        <FormLabel component="legend">{main_cb_props.label}</FormLabel>
        <FormGroup row={main_cb_props.row}>
          {main_cb_props.radio_items.map((field, index) => {
            return (
              <div
                key={main_cb_props.name + `[${index}`}
                style={{
                  display: `grid`,
                  gridAutoFlow: `column`,
                  gridGap: `.5em`,
                  gridAutoColumns: `1fr 1fr`,
                  padding: `.5em 0`,
                }}
              >
                <FormControlLabel
                  label={field.label}
                  control={
                    <Controller
                      name={
                        main_cb_props.name +
                        `[${index}].${main_cb_props.checkbox_name}`
                      }
                      control={control}
                      render={(props) => (
                        <Checkbox
                          {...props}
                          checked={props.value === field.value ? true : false}
                          onChange={(e) => {
                            props.onChange(
                              e.target.checked ? field.value : false
                            );
                            trigger(main_cb_props.name);
                          }}
                        />
                      )}
                    />
                  }
                />

                <CheckBoxTextFieldHookForm
                  variant="outlined"
                  fullWidth
                  name={
                    main_cb_props.name +
                    `[${index}].${main_cb_props.input_field_name}`
                  }
                  placeholder="I-type ang ahensyaa"
                  error={extractErrBool(
                    index,
                    errors,
                    main_cb_props.name,
                    main_cb_props.input_field_name
                  )}
                  helperText={extractErrText(
                    index,
                    errors,
                    main_cb_props.name,
                    main_cb_props.input_field_name
                  )}
                />
              </div>
            );
          })}
        </FormGroup>
        {/* <FormHelperText>{error_message}</FormHelperText> */}
      </FormControl>
    );
  });

export default MultiCheckboxTextFieldHookForm;

export const CheckBoxTextFieldHookForm: FC<TextFieldProps> = memo((props) => {
  const { control, watch } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      render={(ctrlProps, { invalid, isTouched, isDirty }) => (
        <TextField
          {...props}
          {...ctrlProps}
          value={ctrlProps.value ? ctrlProps.value : ""}
        />
      )}
    />
  );
});

const extractErrText = (
  index: number,
  errors: any,
  name: string,
  input_field_name: string
): string => {
  try {
    if (errors && errors?.hasOwnProperty(name)) {
      return errors[name][index][input_field_name]?.message;
    }

    return "";
  } catch (error) {
    return "";
  }
};
const extractErrBool = (
  index: number,
  errors: any,
  name: string,
  input_field_name: string
): boolean => {
  try {
    if (errors && errors?.hasOwnProperty(name)) {
      if (!!errors[name][index][input_field_name]?.message) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};
