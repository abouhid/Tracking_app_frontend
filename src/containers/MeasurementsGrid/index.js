import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureItem from "../../components/MeasureItem";
import MeasurementItem from "../MeasurementItem";
import { Grid, Button } from "@material-ui/core";
import {
  addMeasurement,
  removeMeasurement,
  getMeasurements,
} from "../../api-requests/measurementFetchs";

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
              <div key={el.created_at}>
                <MeasureItem
                  data={el}
                  fetchRequested={fetchRequested}
                  setFetchRequested={setFetchRequested}
                  measurements={measurements}
                  setMeasurements={setMeasurements}
                  userToken={userToken}
                />
                <button
                  onClick={() =>
                    removeMeasurement(
                      el,
                      userInfo,
                      userToken,
                      userId,
                      measurements,
                      setMeasurements,
                      fetchRequested,
                      setFetchRequested
                    )
                  }
                >
                  Delete measurement
                </button>
              </div>
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
});

MeasurementsGrid.propTypes = {
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps)(MeasurementsGrid);
