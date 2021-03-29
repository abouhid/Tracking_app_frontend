import axios from "axios";

export const getMeasurements = async (userToken, setMeasurements) => {
  await axios
    .get("http://localhost:3001/measurements", {
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
    .then(function (response) {
      setMeasurements(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const addMeasurement = async (userToken, userId, setMeasurements) => {
  await axios({
    url: `http://localhost:3001/measurements/`,
    data: {
      name: "New one yo",
      created_by: userId,
    },
    method: "POST",
    headers: {
      Authorization: `Basic ${userToken}`,
    },
  })
    .then(function (response) {
      setMeasurements((prevState) => [...prevState, response.data]);
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const removeMeasurement = async (
  el,
  userInfo,
  userToken,
  userId,
  measurements,
  setMeasurements,
  fetchRequested,
  setFetchRequested
) => {
  await axios({
    url: `http://localhost:3001/measurements/${el.id}`,
    data: {
      name: "New one yo",
      created_by: userId,
    },
    method: "DELETE",
    headers: {
      Authorization: `Basic ${userToken}`,
    },
  })
    .then(function (response) {
      setFetchRequested(!fetchRequested);
    })
    .catch(function (error) {
      console.log(error);
    });
};
