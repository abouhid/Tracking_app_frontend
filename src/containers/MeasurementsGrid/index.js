import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
  const [fetchRequested, setFetchRequested] = useState(false);

  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, [fetchRequested]);
  console.log("xxx", userToken, userId, measureData);
  return (
    <>
      <h1>Welcome {userInfo}!</h1>

      <Grid container>
        {dataInfo[0] ? (
          <>
            {dataInfo.map((el) => (
              <MeasurementItem
                key={el.id}
                el={el}
                userInfo={userInfo}
                userToken={userToken}
                userId={userId}
                dataInfo={dataInfo}
                measureData={measureData}
                fetchRequested={fetchRequested}
                setFetchRequested={setFetchRequested}
              />
            ))}
          </>
        ) : (
          <></>
        )}
        <Button onClick={() => addMeasurement(userToken, userId, measureData)}>
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
  dataInfo: PropTypes.array.isRequired,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(MeasurementsGrid);
