import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import MeasurementItem from "../MeasurementItem";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { measureData } from "../../redux/actions";

import { addMeasurement, getMeasurements } from "../../api-requests";

const MeasurementsGrid = ({
  userInfo,
  userToken,
  userId,
  measureData,
  dataInfo,
}) => {
  const [measurements, setMeasurements] = useState("");
  const [fetchRequested, setFetchRequested] = useState(false);
  useEffect(() => {
    getMeasurements(userToken, setMeasurements);
  }, [fetchRequested]);

  console.log(dataInfo);
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
  dataInfo: state.measureStore.dataInfo,
});

MeasurementsGrid.propTypes = {
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(MeasurementsGrid);
