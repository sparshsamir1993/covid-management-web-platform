import React, { Component, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import LoginForm from "../components/authComponents/LoginForm";

const useStyles = makeStyles(() => ({
  logoArea: {
    backgroundColor: "black",
  },
  actionArea: {
    width: "70%",
    minHeight: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: "10px",
    margin: "0 auto",
  },
  rightArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    height: "calc(100vh - 64px)",
  },
}));

const Home = () => {
  const [isLogin, setAuthState] = useState(true);
  const classes = useStyles();
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={4} className={classes.logoArea}></Grid>
      <Grid item xs={8} className={classes.rightArea}>
        <div className={classes.actionArea}>
          {isLogin && <LoginForm />}
          <Typography
            variant="subtitle1"
            onClick={() => setAuthState(!isLogin)}
          >
            {isLogin
              ? "New User? Create an account."
              : "Already got an Accout? Log in."}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
