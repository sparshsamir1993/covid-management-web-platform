import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles(() => ({
  w100: {
    width: "100%",
  },
}));
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const MaterialSelect = (props) => {
  let [iVal, setIVal] = useState("");
  const classes = useStyles();
  const {
    input,
    label,
    meta: { touched, error },
    children,
    initialValues,
    ...custom
  } = props;
  return (
    <FormControl error={touched && error} className={classes.w100}>
      <InputLabel htmlFor="role-native-simple">{label}</InputLabel>
      <Select
        native
        {...input}
        value={
          iVal
            ? iVal
            : initialValues?.[input.name]
            ? initialValues[input.name]
            : ""
        }
        onChange={(e) => {
          setIVal(e.currentTarget.value);
        }}
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

export default MaterialSelect;
