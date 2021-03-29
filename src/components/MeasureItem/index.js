import React from "react";
import { addMeasure, updateMeasure, deleteMeasure } from "../../api-requests";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

const MeasureItem = ({
  measurements,
  setMeasurements,
  userToken,
  setFetchRequested,
  fetchRequested,
  data,
}) => {
  return (
    <Grid container>
      <Grid item xs>
        <h4>{data.name}</h4>
        <Add
          onClick={() =>
            addMeasure(data, userToken, setFetchRequested, fetchRequested)
          }
        />
      </Grid>

      {data.measures.map((value) => {
        return (
          <Grid container key={value.created_at}>
            <div>{value.value_of_measure}</div>
            <DeleteIcon
              onClick={() =>
                deleteMeasure(
                  value,
                  userToken,
                  setFetchRequested,
                  fetchRequested
                )
              }
            />
            <Edit
              onClick={() =>
                updateMeasure(
                  value,
                  userToken,
                  setFetchRequested,
                  fetchRequested
                )
              }
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeasureItem;
