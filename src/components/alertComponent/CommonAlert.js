import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Field } from "redux-form";

const useStyles = makeStyles(() => ({
  mainAlert: {
    zIndex: 10000,
    width: "100%",
    position: "absolute",
  },
}));

const CommonAlert = (props) => {
  const classes = useStyles();
  const { showAlert, type, content } = props;
  if (!showAlert) {
    return null;
  }
  return (
    <Alert className={classes.mainAlert} severity={type}>
      {content}
    </Alert>
  );
};

const mapStateToProps = (state) => {
  return {
    showAlert: state.error.showAlert,
    type: state.error?.error.type,
    content: state.error?.error.content,
  };
};

export default connect(mapStateToProps)(CommonAlert);
