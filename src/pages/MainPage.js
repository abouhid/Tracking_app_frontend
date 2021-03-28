import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePage from "./HomePage";
import React from "react";
import MeasurementsGrid from "../containers/MeasurementsGrid";

const MainPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <MeasurementsGrid />;
  }
  return <HomePage />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
});

MainPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MainPage);
