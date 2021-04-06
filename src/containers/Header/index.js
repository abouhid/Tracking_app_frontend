import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { connect } from "react-redux";
import { userData } from "../../redux/actions";
import PropTypes from "prop-types";
import "./index.css";
import logo from "../../images/logo.png";

import { useHistory } from "react-router";
import { signOut } from "../../api-requests";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header({ isLoggedIn, userData }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="header">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => {
              history.push(`/`);
            }}
          >
            <img className="logo" src={logo} alt="Logo" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Track.it
          </Typography>
          {isLoggedIn && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => {
                  signOut(history, userData);
                  history.push("/");
                }}
                color="inherit"
              >
                <ExitToApp />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
});

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapDispatch = {
  userData,
};

export default connect(mapStateToProps, mapDispatch)(Header);
