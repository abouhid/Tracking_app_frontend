import React from "react";
import { Grid } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { removeMeasurement } from "../../api-requests";
import MeasureItem from "../../components/MeasureItem";

const MeasurementItem = ({
  el,
  userInfo,
  userToken,
  userId,
  measurements,
  setMeasurements,
  fetchRequested,
  setFetchRequested,
}) => {
  return (
    <Grid item key={el.created_at}>
      <Clear
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
      />
      <MeasureItem
        data={el}
        fetchRequested={fetchRequested}
        setFetchRequested={setFetchRequested}
        measurements={measurements}
        setMeasurements={setMeasurements}
        userToken={userToken}
      />
    </Grid>
  );
};

export default MeasurementItem;
