import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasurementItem from "../MeasurementItem";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { addMeasurement, getMeasurements } from "../../api-requests";

const MeasurementsGrid = ({ userInfo, userToken, userId }) => {
  const [measurements, setMeasurements] = useState("");
  const [fetchRequested, setFetchRequested] = useState(false);
  useEffect(() => {
    getMeasurements(userToken, setMeasurements);
  }, [fetchRequested]);

  return (
    <>
      <h1>Welcome {userInfo}!</h1>
      <Grid container>
        {measurements[0] ? (
          <>
            {measurements.map((el) => (
              <MeasurementItem
                key={el.id}
                el={el}
                userInfo={userInfo}
                userToken={userToken}
                userId={userId}
                measurements={measurements}
                setMeasurements={setMeasurements}
                fetchRequested={fetchRequested}
                setFetchRequested={setFetchRequested}
              />
            ))}
          </>
        ) : (
          <></>
        )}
        <Button
          onClick={() => addMeasurement(userToken, userId, setMeasurements)}
        >
          Add new measurement
        </Button>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  userId: state.userStore.userId,
  // measurements: state.measureReducer.measurements,
});

MeasurementsGrid.propTypes = {
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps)(MeasurementsGrid);
