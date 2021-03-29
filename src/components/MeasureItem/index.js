import React from "react";
import axios from "axios";
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
  const addMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.id}/measures`,
      data: { value_of_measure: "321", measurement_id: data.id },
      method: "POST",
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
      //   .then(function (response) {
      //     const updatedMeasurements = measurements.map(
      //       (obj) => [response.data].find((o) => o.id === obj.id) || obj
      //     );
      //     setMeasurements(updatedMeasurements);
      //   })
      .then(function (response) {
        setFetchRequested(!fetchRequested);
      })
      .catch(function (error) {
        return error;
      });
  };
  const updateMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.measurement_id}/measures/${data.id}`,
      data: { value_of_measure: "123", measurement_id: data.id },
      method: "PATCH",
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
      .then(function (response) {
        setFetchRequested(!fetchRequested);
      })
      .catch(function (error) {
        return error;
      });
  };

  const deleteMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.measurement_id}/measures/${data.id}/`,
      method: "DELETE",
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
      //   .then(function (response) {
      //     const updatedMeasurements = measurements.map((obj) => {
      //       if (obj.id === data.measurement_id) {
      //         const index = obj.measures.map((el) => el.id).indexOf(data.id);
      //         obj.measures.splice(index, 1);
      //       }
      //       return obj;
      //     });

      //     setMeasurements(updatedMeasurements);
      //   })
      .then(function (response) {
        setFetchRequested(!fetchRequested);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid container>
      <Grid item xs>
        <h4>{data.name}</h4>
        <Add onClick={() => addMeasure(data)} />
      </Grid>

      {data.measures.map((value) => {
        return (
          <Grid container key={value.created_at}>
            <div>{value.value_of_measure}</div>
            <DeleteIcon onClick={() => deleteMeasure(value)} />
            <Edit onClick={() => updateMeasure(value)} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeasureItem;
