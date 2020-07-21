import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import StyledLink from "@material-ui/core/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Link } from "react-router-dom";
import RouterSwitch from "./RouterSwitch";
import Loader from "./loader/Loader";
import { Button } from "@material-ui/core";
import HeaderButtons from "./authComponents/HeaderButtons";
import { connect } from "react-redux";
import ErrorAlert from "./alertComponent/CommonAlert";
import { ADMIN_ROLE, HOSPITAL_ADMIN_ROLE } from "../constants";
import { showLoading, hideLoading, getUser } from "../actions";
import { checkAndUpdateTokens } from "../utils";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const storedToken = window.sessionStorage.getItem("token");
  const storedRefreshToken = window.sessionStorage.getItem("refreshToken");
  let tokens;
  if (storedToken && storedRefreshToken) {
    tokens = checkAndUpdateTokens(storedToken, storedRefreshToken);
    if (!props.auth.id) {
      props.showLoading();
      props.getUser(tokens);
      props.hideLoading();
    }
  }
  const adminLinks = () => {
    if (props.auth.role === ADMIN_ROLE) {
      return (
        <React.Fragment>
          <Typography variant="h6" align="center">
            Admin Links
          </Typography>
          <List>
            <ListItem button key={"User List"} onClick={handleDrawerClose}>
              <Link to="/admin/users" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"User List"} />
              </Link>
            </ListItem>
            <ListItem button key={"Question List"} onClick={handleDrawerClose}>
              <Link to="/admin/questions" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Question List"} />
              </Link>
            </ListItem>
            <ListItem button key={"Hospital List"} onClick={handleDrawerClose}>
              <Link to="/admin/hospitals" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Hospital List"} />
              </Link>
            </ListItem>
          </List>
          <Divider />
        </React.Fragment>
      );
    } else if (props.auth.role === HOSPITAL_ADMIN_ROLE) {
      return (
        <React.Fragment>
          <Typography variant="h6" align="center">
            Hospital Admin Links
          </Typography>
          <List>
            <ListItem button key={"Patient List"} onClick={handleDrawerClose}>
              <Link to="/hospital/users" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Pateint List"} />
              </Link>
            </ListItem>
            <ListItem
              button
              key={"Appointment List"}
              onClick={handleDrawerClose}
            >
              <Link to="/hospital/appointment/list" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Appointment List"} />
              </Link>
            </ListItem>

            <ListItem
              button
              key={"Book Appointment"}
              onClick={handleDrawerClose}
            >
              <Link to="/hospital/appointment/booking" className="nav-link">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Book Appointment"} />
              </Link>
            </ListItem>
          </List>
          <Divider />
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
  const authLinks = () => {
    return (
      <React.Fragment>
        <List>
          <ListItem button key={"Home"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </Link>
          </ListItem>
          <ListItem button key={"Dashboard"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </Link>
          </ListItem>
          <ListItem button key={"Profile"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </Link>
          </ListItem>
        </List>
        <Divider />
        {adminLinks()}
        <List>
          <ListItem button key={"Logout"} onClick={handleDrawerClose}>
            <Link to="/" className="nav-link">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </Link>
          </ListItem>
        </List>
      </React.Fragment>
    );
  };

  const unAuthLinks = () => {
    return (
      <List>
        <ListItem button key={"Home"}>
          <Link to="/" className="nav-link">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </Link>
        </ListItem>
        <ListItem button key={"Login"}>
          <Link to="/" className="nav-link">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </Link>
        </ListItem>
        <ListItem button key={"Register"}>
          <Link to="/" className="nav-link">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Register"} />
          </Link>
        </ListItem>
      </List>
    );
  };

  return (
    <div>
      <Loader />
      <div className={classes.root}>
        <ErrorAlert />
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title} noWrap>
              Covid Fighter
            </Typography>
            <HeaderButtons />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />

          {props.auth.id && authLinks()}
          {!props.auth.id && unAuthLinks()}
        </Drawer>
      </div>
      <RouterSwitch />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { showLoading, hideLoading, getUser })(
  Header
);
