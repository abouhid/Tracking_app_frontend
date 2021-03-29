import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { removeMeasurement } from "../../api-requests";
import { useHistory } from "react-router-dom";
const MeasurementItem = ({
  el,
  userToken,
  userId,
  fetchRequested,
  setFetchRequested,
}) => {
  const history = useHistory();

  return (
    <Grid item md={4} onClick={() => history.push(`/measurements/${el.id}`)}>
      <Paper elevation={3} variant="outlined" key={el.created_at}>
        {el.name}
        {/* <Clear
          onClick={() =>
            removeMeasurement(
              el,
              userToken,
              userId,
              fetchRequested,
              setFetchRequested
            )
          }
        /> */}
      </Paper>
    </Grid>
  );
};

export default MeasurementItem;
