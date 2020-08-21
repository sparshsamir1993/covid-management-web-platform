const { makeStyles } = require("@material-ui/core");

export const mainStyles = makeStyles(() => ({
  primaryButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: "20px",
  },
  logoutButton: {
    background: "red",
    marginRight: "20px",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
  ///////////////////////////// global margins //////////////////////////
  marginCenter: {
    margin: "0 auto",
  },
  mt10: {
    marginTop: "10px",
  },
  mt25: {
    marginTop: "25px",
  },
  mt50: {
    marginTop: "50px",
  },
  mt100: {
    marginTop: "100px",
  },
}));
