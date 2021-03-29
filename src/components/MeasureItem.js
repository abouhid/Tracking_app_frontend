import React from "react";
import axios from "axios";
import { Grid, Paper, makeStyles, Button, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

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
    let newObj = false;
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
    <>
      <h4>{data.name}</h4>
      {data.measures.map((value) => {
        return (
          <div key={value.created_at}>
            <li>{value.value_of_measure}</li>
            <DeleteIcon onClick={() => deleteMeasure(value)}>
              Delete measure
            </DeleteIcon>
            <Edit onClick={() => updateMeasure(value)}>Update measure</Edit>
          </div>
        );
      })}
      <button onClick={() => addMeasure(data)}>Add new measure</button>
    </>
  );
};

export default MeasureItem;
