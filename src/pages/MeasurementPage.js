import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import HomePage from "./HomePage";
import MeasureItem from "../components/MeasureItem";

const MeasurementPage = ({
  isLoggedIn,
  measurements,
  setMeasurements,
  userToken,
  setFetchRequested,
  fetchRequested,
  data,
}) => {
  if (isLoggedIn) {
    return (
      <>
        <div className="d-flex justify-content-center mt-3 font-weight-bold"></div>
        <MeasureItem
          data={data}
          fetchRequested={fetchRequested}
          setFetchRequested={setFetchRequested}
          measurements={measurements}
          setMeasurements={setMeasurements}
          userToken={userToken}
        />
      </>
    );
  }
  return <HomePage />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
});

MeasurementPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MeasurementPage);
