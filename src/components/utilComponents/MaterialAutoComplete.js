import React, { useLayoutEffect } from "react";
import { InputLabel, FormControl, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MaterialTextField from "./MaterialTextField";

let MaterialAutoComplete = (props) => {
  const {
    input,
    autoCompleteOptions,
    handleInputChange,
    label,
    meta: { touched, error },
    children,
    ...custom
  } = props;
  let a = ["1", "2", "3"];
  return (
    <Autocomplete
      id="material-autoselect"
      options={autoCompleteOptions}
      getOptionLabel={(option) => option[props.labelname]}
      freeSolo={true}
      onInputChange={(event, newInput) => handleInputChange(newInput)}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...input}
          {...custom}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default MaterialAutoComplete;
