import React from "react";
import { TextField } from "@material-ui/core";

export const FormField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
      id="outlined-basic"
      error={touched && error}
      label={label}
      variant="outlined"
      {...input}
      {...custom}
    />
  );
};
