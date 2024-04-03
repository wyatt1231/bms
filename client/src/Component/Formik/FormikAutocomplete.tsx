import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useField } from "formik";
import React, { FC, memo, useEffect, useState } from "react";
import useDebounce from "../../Hooks/UseDebounce";
import { PostFetch } from "../../Hooks/UseFetch";
import CustomAvatar from "../CustomAvatar";

interface IFormikAutocomplete {
  label?: string;
  optKeyId: string;
  optKeyLabel: string;
  inputFieldName: string;
  selectFieldName: string;
  endPoint: string;
  className?: string;
  rows?: string;
  multiline?: string;
  variant?: any;
  required?: boolean;
  placeholder?: string;
  size?: "small" | "medium";
  onSelectChange?: () => void;
}

const FormikAutocomplete: FC<IFormikAutocomplete> = memo(
  ({
    label,
    optKeyId,
    optKeyLabel,
    inputFieldName,
    selectFieldName,
    endPoint,
    className,
    rows,
    multiline,
    variant,
    required,
    placeholder,
    size,
  }) => {
    const [options, setOptions] = useState([]);
    const [inputField, inputMeta, inputArgs] = useField({
      name: inputFieldName,
    });
    const errorText =
      inputMeta.error && inputMeta.touched ? inputMeta.error : "";
    const [loading, setLoading] = useState(false);
    const [selectField, selectMeta, selectArgs] = useField({
      name: selectFieldName,
    });

    const debouncedSearchTerm = useDebounce(
      selectField.value ? selectField.value : "",
      500
    );

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        setOptions([]);
        const response = await PostFetch(endPoint, {
          value: selectField.value ? selectField.value : "",
        });
        setLoading(false);
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
      selectArgs.setValue(selectField.value ? selectField.value : "");
      return () => {};
    }, []);

    return (
      <Autocomplete
        // value={inputField?.value[optKeyId]}
        options={options}
        loading={loading}
        filterSelectedOptions={true}
        loadingText="Loading options"
        getOptionLabel={(option) => option[optKeyLabel]}
        renderOption={(option, state) => {
          if (option.picture) {
            return (
              <div className="autocomplete-picture">
                <CustomAvatar
                  src={option.picture}
                  errorMessage={option.label.charAt(0)}
                  className=""
                />
                {option.label}
              </div>
            );
          } else {
            return <option>{option.label}</option>;
          }
        }}
        onChange={(event, newValue) => {
          if (newValue && typeof newValue !== "undefined") {
            if (typeof newValue[optKeyId] === "number") {
              inputArgs.setValue(newValue[optKeyId].toString());
            } else {
              inputArgs.setValue(newValue[optKeyId]);
            }
          } else {
            inputArgs.setValue("");
          }
        }}
        inputValue={selectField?.value ? selectField?.value : ""}
        onInputChange={(event, newInputValue) => {
          if (newInputValue) {
            selectArgs.setValue(newInputValue);
          } else {
            selectArgs.setValue("");
          }
        }}
        filterOptions={(options, state) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            {...inputField}
            size={size}
            helperText={errorText}
            error={!!errorText}
            label={label}
            variant={variant}
            // InputProps={{
            //   ...inputField,
            //   value: inputField.value ? inputField.value : "",
            // }}
            InputLabelProps={{
              shrink: true,
            }}
            rows={rows}
            multiline={multiline ? true : false}
            required={required ? true : false}
            placeholder={placeholder}
            fullWidth
          />
        )}
        className={className}
      />
    );
  }
);

export default FormikAutocomplete;
