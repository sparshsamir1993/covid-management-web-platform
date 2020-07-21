import React, { useLayoutEffect, useState, useEffect } from "react";
import { InputLabel, FormControl, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTextField from "./MaterialTextField";

let MaterialAutoComplete = (props) => {
  const {
    input,
    autoCompleteOptions, // custom
    handleInputChange, // custom
    allowNewInput, // custom
    label, // custom
    meta: { touched, error },
    children,
    initialValues,
    ...custom
  } = props;

  let [iVal, setIVal] = useState("");
  // console.log(input.name, initialValues[input.name], iVal);
  return (
    <Autocomplete
      id="material-autoselect"
      options={autoCompleteOptions}
      getOptionLabel={(option) =>
        option[props.labelname] ? option[props.labelname] : ""
      }
      freeSolo={allowNewInput}
      clearOnBlur={!allowNewInput}
      value={
        iVal
          ? iVal
          : initialValues?.[input.name]
          ? initialValues[input.name]
          : ""
      }
      onInputChange={(event, newInput) => {
        setIVal(
          autoCompleteOptions.filter(
            (option) => option[props.labelname] === newInput
          )[0]
        );
        handleInputChange(newInput);
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...input}
          {...custom}
          autoComplete="no"
          label={label}
          variant="outlined"
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default MaterialAutoComplete;
