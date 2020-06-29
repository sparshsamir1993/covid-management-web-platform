import React from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  mainAlert: {
    zIndex: 10000,
    width: "100%",
    position: "absolute",
  },
}));

const ErrorAlert = (props) => {
  const classes = useStyles();
  const { showError, type, content } = props;
  if (!showError) {
    return null;
  }
  return (
    <Alert className={classes.mainAlert} severity={type}>
      {content}
    </Alert>
  );
};

const mapStateToProps = (state) => {
  console.log(state.error);
  return {
    showError: state.error.showError,
    type: state.error?.error.type,
    content: state.error?.error.content,
  };
};

export default connect(mapStateToProps)(ErrorAlert);
