import axios from "axios";

const URL = "http://localhost:3001";

export const logInUser = async (data) => {
  return axios({
    url: `${URL}/auth/login`,
    data: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const signInUser = async (dataObj) => {
  return axios({
    url: `${URL}/signup`,
    data: JSON.stringify(dataObj),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((err) => err);
};

export const getMeasurements = async (userToken, measureData) => {
  await axios
    .get("http://localhost:3001/measurements", {
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
    .then(function (response) {
      measureData({ dataInfo: response.data });
    })
    .catch((error) => {
      return error;
    });
};
export const addMeasurement = async (
  userToken,
  userId,
  measureData,
  fetchRequested,
  setFetchRequested
) => {
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
      setFetchRequested(!fetchRequested);
    })
    .catch((error) => {
      return error;
    });
};
export const removeMeasurement = async (
  id,
  userToken,
  userId,
  fetchRequested,
  setFetchRequested
) => {
  await axios({
    url: `http://localhost:3001/measurements/${id}`,
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
    .catch((error) => {
      return error;
    });
};

export const addMeasure = async (
  data,
  userToken,
  setFetchRequested,
  fetchRequested
) => {
  await axios({
    url: `http://localhost:3001/measurements/${data.id}/measures`,
    data: { value_of_measure: "321", measurement_id: data.id },
    method: "POST",
    headers: {
      Authorization: `Basic ${userToken}`,
    },
  })
    .then(function (response) {
      setFetchRequested(!fetchRequested);
    })
    .catch((error) => {
      return error;
    });
};
export const updateMeasure = async (
  data,
  userToken,
  setFetchRequested,
  fetchRequested
) => {
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

export const deleteMeasure = async (
  data,
  userToken,
  setFetchRequested,
  fetchRequested
) => {
  await axios({
    url: `http://localhost:3001/measurements/${data.measurement_id}/measures/${data.id}/`,
    method: "DELETE",
    headers: {
      Authorization: `Basic ${userToken}`,
    },
  })
    .then(function (response) {
      setFetchRequested(!fetchRequested);
    })
    .catch((error) => {
      return error;
    });
};
