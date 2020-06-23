import React, { Component, useState } from "react";
import {
  Grid,
  Button,
  RootRef,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

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

const LinkBehavior = React.forwardRef((props, ref) => (
  <Link ref={ref} to="/" {...props} />
));

const Home = () => {
  const [isLogin, setAuthState] = useState(true);
  const classes = useStyles();
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={4} className={classes.logoArea}></Grid>
      <Grid item xs={8} className={classes.rightArea}>
        <div className={classes.actionArea}>
          {isLogin && (
            <React.Fragment>
              <Typography variant="h4" gutterBottom>
                Log into Hospital Dashboard
              </Typography>
              <Button component={LinkBehavior} variant="outlined">
                Default
              </Button>
            </React.Fragment>
          )}
          <Typography
            variant="subtitle1"
            onClick={() => setAuthState(!isLogin)}
          >
            New User? Create an account.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
