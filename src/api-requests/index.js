import axios from "axios";

// const URL = "http://tracking-app-alex.herokuapp.com";
const URL = "http://localhost:3001";

export const logInUser = async (data) => {
  return await axios({
    url: `${URL}/auth/login`,
    data: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const signInUser = async (data) => {
  return await axios({
    url: `${URL}/signup`,
    data: JSON.stringify(data),
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
  fetchRequested,
  setFetchRequested,
  inputValue
) => {
  await axios({
    url: `http://localhost:3001/measurements/`,
    data: {
      name: inputValue,
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
  fetchRequested,
  setFetchRequested
) => {
  await axios({
    url: `http://localhost:3001/measurements/${id}`,
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
  id,
  userToken,
  setFetchRequested,
  fetchRequested,
  inputValue
) => {
  await axios({
    url: `http://localhost:3001/measurements/${id}/measures`,
    data: { value_of_measure: inputValue, measurement_id: id },
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
  fetchRequested,
  inputValue
) => {
  await axios({
    url: `http://localhost:3001/measurements/${data.measurement_id}/measures/${data.id}`,
    data: { value_of_measure: inputValue, measurement_id: data.id },
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

export const checkToken = () => {
  const NOW = Date.now();

  const cachedToken = JSON.parse(localStorage.getItem("tokenObj"));
  if (cachedToken && cachedToken.expiresAt < NOW) {
    localStorage.removeItem("tokenObj");
    return false;
  }
  if (!cachedToken) return false;
  return true;
};

export const saveToken = (token) => {
  const NOW = Date.now();

  const tokenObj = {
    token,
    expiresAt: NOW + 86400000,
  };

  return localStorage.setItem("tokenObj", JSON.stringify(tokenObj));
};

export const signOut = (history, userData) => {
  localStorage.clear("tokenObj");
  userData({
    isLoggedIn: false,
    userToken: "",
    userInfo: "",
    userId: "",
  });
  history.push("/");
};
