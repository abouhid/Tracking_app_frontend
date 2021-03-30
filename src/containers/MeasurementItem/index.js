import React from "react";
import { Grid, Paper } from "@material-ui/core";

import { useHistory } from "react-router-dom";
const MeasurementItem = ({ el }) => {
  const history = useHistory();

  return (
    <Grid item md={4} onClick={() => history.push(`/measurements/${el.id}`)}>
      <Paper elevation={3} variant="outlined" key={el.created_at}>
        {el.name}
      </Paper>
    </Grid>
  );
};

export default MeasurementItem;
