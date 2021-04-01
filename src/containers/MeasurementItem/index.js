import React from "react";
import { Grid, Paper, Box } from "@material-ui/core";

import { useHistory } from "react-router-dom";
const MeasurementItem = ({ el }) => {
  const history = useHistory();

  return (
    <Grid
      elevation={3}
      item
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6}
      onClick={() => history.push(`/measurements/${el.id}`)}
    >
      <Paper elevation={3} key={el.created_at}>
        <Box padding={3}>{el.name}</Box>
      </Paper>
    </Grid>
  );
};

export default MeasurementItem;
