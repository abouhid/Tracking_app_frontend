import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { removeMeasurement } from "../../api-requests";
import MeasureItem from "../../components/MeasureItem";
import { Link } from "react-router-dom";
import MeasurementPage from "../../pages/MeasurementPage";

const MeasurementItem = ({
  el,
  userInfo,
  userToken,
  userId,
  dataInfo,
  measureData,
  fetchRequested,
  setFetchRequested,
}) => {
  return (
    <Grid item md={4}>
      <Paper elevation={3} variant="outlined" key={el.created_at}>
        {el.name}
        <Clear
          onClick={() =>
            removeMeasurement(
              el,
              userInfo,
              userToken,
              userId,
              dataInfo,
              measureData,
              fetchRequested,
              setFetchRequested
            )
          }
        />
        <MeasurementPage
          data={el}
          fetchRequested={fetchRequested}
          setFetchRequested={setFetchRequested}
          dataInfo={dataInfo}
          measureData={measureData}
          userToken={userToken}
        />
      </Paper>
    </Grid>
  );
};

export default MeasurementItem;
