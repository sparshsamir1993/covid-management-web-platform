import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { logoutUser } from "../../actions";
import { mainStyles } from "../../styles/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const HeaderButtons = (props) => {
  const appStyles = mainStyles();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">You sure?</h2>
      <p id="simple-modal-description">Are you sure you want to log out?</p>
      <Button
        className={appStyles.logoutButton}
        onClick={() => {
          props.logoutUser();
          handleClose();
        }}
      >
        Sure, Logout
      </Button>
      <Button color="inherit" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  if (props.auth.id) {
    return (
      <React.Fragment>
        <Button color="inherit" onClick={handleOpen}>
          Logout
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </React.Fragment>
    );
  } else {
    return <React.Fragment />;
  }
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, { logoutUser })(HeaderButtons);
