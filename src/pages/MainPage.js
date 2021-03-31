import PropTypes from "prop-types";
import { connect } from "react-redux";
import React from "react";
import MeasurementsGrid from "../containers/MeasurementsGrid";
import LogIn from "./LogIn";

const MainPage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    const todaysDate = new Date();
    const result = todaysDate.toUTCString().split(" ");
    result.splice(4, 2);
    const finalValue = result.join(" ");

    return (
      <div className="MainPage">
        <div className="d-flex justify-content-center mt-3 font-weight-bold">
          {finalValue}
        </div>

        <MeasurementsGrid />
      </div>
    );
  }
  return <LogIn />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
});

MainPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MainPage);
