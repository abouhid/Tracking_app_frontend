import React from "react";
import axios from "axios";

const Measurement = ({
  measurements,
  setMeasurements,
  userToken,
  setFetchRequested,
  fetchRequested,
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
      {measurements.map((el) => (
        <div key={el.created_at}>
          <h4>{el.name}</h4>
          {el.measures.map((value) => {
            return (
              <div key={value.created_at}>
                <li>{value.value_of_measure}</li>
                <button onClick={() => deleteMeasure(value)}>
                  Delete measure
                </button>
                <button onClick={() => updateMeasure(value)}>
                  Update measure
                </button>
              </div>
            );
          })}
          <button onClick={() => addMeasure(el)}>Add new measure</button>
        </div>
      ))}
    </>
  );
};

export default Measurement;
