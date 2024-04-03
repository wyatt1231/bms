import { TextField, TextFieldProps } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useField } from "formik";
import React, { useEffect, useState, memo, FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import useDebounce from "../../Hooks/UseDebounce";
import { PostFetch } from "../../Hooks/UseFetch";

interface IAutocompleteHookForm {
  label?: string;
  name: string;
  // endPoint: string;
  className?: string;
  rows?: string;
  multiline?: string;
  required?: boolean;
  placeholder?: string;
  size?: "small" | "medium";
  optKeyIdType?: "string" | "number";
  disabled?: boolean;
  endpoint: string;
  defaultInputValue?: string;
  payload?: any;
  handleGetExtProp?: (ext_props: any) => void;
}

const AutocompleteHookForm: FC<IAutocompleteHookForm & TextFieldProps> = memo(
  ({
    label,
    className,
    rows,
    multiline,
    variant,
    required,
    placeholder,
    disabled,
    name,
    endpoint,
    defaultInputValue,
    handleGetExtProp,
    payload,
    ...props
  }) => {
    const [options, setOptions] = useState<Array<any>>([]);

    const [input_val, set_input_val] = useState<string>(
      defaultInputValue ? defaultInputValue : ""
    );

    const { setValue, getValues, errors, trigger } = useFormContext();

    let error = false;
    let error_message = "";

    if (errors && errors?.hasOwnProperty(name)) {
      error = true;
      error_message = errors[name]?.message;
    }

    const debouncedSearchTerm = useDebounce(input_val, 500);

    useEffect(() => {
      async function fetchData() {
        // setLoading(true);

        // const changed_value = getValues()[name];
        const changed_value = debouncedSearchTerm;
        // console.log(`change_value`, changed_value);
        setOptions([]);
        const response = await PostFetch(endpoint, {
          value: changed_value ? changed_value : "",
          ...payload,
        });

        // console.log(`debouncedSearchTerm`, debouncedSearchTerm);

        if (response.success) {
          setOptions(response.data);
        }
      }

      if (
        typeof debouncedSearchTerm === "string" &&
        debouncedSearchTerm !== null
      ) {
        fetchData();
      } else {
        setOptions([]);
      }
    }, [debouncedSearchTerm]);

    useEffect(() => {
      !!defaultInputValue && set_input_val(defaultInputValue);
    }, [defaultInputValue]);

    return (
      <Controller
        name={name}
        render={({ onChange, onBlur, value, ref }) => (
          <Autocomplete
            options={options}
            onChange={(event: any, newValue: any) => {
              if (newValue) {
                setValue(name, newValue.id);
                trigger(name);
                if (typeof handleGetExtProp === "function") {
                  const findIndex = options.findIndex(
                    (o) => o.id === newValue.id
                  );

                  if (findIndex !== -1) {
                    handleGetExtProp(options[findIndex]);
                  } else {
                    handleGetExtProp(null);
                  }
                }
              } else {
                setValue(name, "");
                trigger(name);

                if (typeof handleGetExtProp === "function") {
                  handleGetExtProp(null);
                }
              }
            }}
            inputValue={input_val}
            onInputChange={(event: object, value: string, reason: string) => {
              if (event) {
                set_input_val(value);
              }
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                InputLabelProps={props.InputLabelProps}
                label={label}
                variant={"outlined"}
                error={error}
                helperText={error_message}
              />
            )}
          />
        )}
      />
    );
  }
);

export default AutocompleteHookForm;
