import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const RoleSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const role = custom.initialValue.role;
  return (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="age-native-simple">Role</InputLabel>
      <Select
        native
        {...input}
        value={role ? role : ""}
        inputProps={{
          name: "role",
          id: "role-native-simple",
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};

export default RoleSelect;
