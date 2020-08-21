import React, { useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";

import LoginForm from "../authComponents/LoginForm";
import SignUpForm from "../authComponents/SignUpForm";
import { Image } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  logoArea: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  actionArea: {
    width: "70%",
    minHeight: "60%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "10px",
    margin: "0 auto",
    borderRadius: "7px",
  },
  rightArea: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
  },
  container: {
    height: "calc(100vh - 64px)",
  },
  appLogo: {
    width: "100%",
  },
}));

const Home = () => {
  const logo = require("../../assets/img/logo.png");
  const [isLogin, setAuthState] = useState(true);
  const classes = useStyles();
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={4} className={classes.logoArea}>
        <img
          onClick={() => console.log("onClick")}
          src={logo}
          className={classes.appLogo}
        />
      </Grid>
      <Grid item xs={8} className={classes.rightArea}>
        <div className={classes.actionArea}>
          {isLogin && <LoginForm />}
          {!isLogin && <SignUpForm />}
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
