import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMeasurements } from "../api-requests";
import { Paper } from "@material-ui/core";

const UserPage = ({
  isLoggedIn,
  dataInfo,
  measureData,
  userToken,
  userInfo,
}) => {
  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, []);

  const totalMeasurments = () =>
    dataInfo.map((el) => el.measures.map((el) => el.value_of_measure)).length;

  const totalMeasures = () =>
    dataInfo
      .map((el) => el.measures.map((el) => el.value_of_measure))
      .reduce((count, row) => count + row.length, 0);

  return (
    <div className="Page">
      {isLoggedIn ? (
        <Paper
          elevation={3}
          className="p-3 profile d-flex flex-column justify-content-around"
        >
          <h4>Username: {userInfo}</h4>
          <h4>Number of Measurements added: {totalMeasurments()}</h4>
          <h4>Total of Measures recorded: {totalMeasures()}</h4>
        </Paper>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  dataInfo: state.measureStore.dataInfo,
});

UserPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  dataInfo: PropTypes.array.isRequired,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(UserPage);
