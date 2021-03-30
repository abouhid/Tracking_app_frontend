import React from "react";
import { addMeasure, deleteMeasure } from "../../api-requests";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import EditForm from "../EditForm";

const MeasureItem = ({
  id,
  userToken,
  setFetchRequested,
  fetchRequested,
  dataInfo,
}) => {
  const currentData = dataInfo.find((el) => el.id == id);
  return (
    <Grid container>
      <Grid item xs>
        <Add
          onClick={() =>
            addMeasure(
              currentData,
              userToken,
              setFetchRequested,
              fetchRequested
            )
          }
        />
      </Grid>

      {currentData.measures.map((value) => {
        return (
          <Grid key={value.created_at} container>
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
            <div>{value.value_of_measure}</div>
            <EditForm
              userToken={userToken}
              value={value}
              setFetchRequested={setFetchRequested}
              fetchRequested={fetchRequested}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeasureItem;
