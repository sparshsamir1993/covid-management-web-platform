import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  fullWidth: {
    width: "100%",
  },
}));

const MaterialTextField = (props) => {
  const classes = useStyles();

  const { label, input, children, ...custom } = props;
  return (
    <TextField
      variant="outlined"
      {...input}
      className={classes.fullWidth}
      label={label}
    >
      {children}
    </TextField>
  );
};

export default MaterialTextField;
