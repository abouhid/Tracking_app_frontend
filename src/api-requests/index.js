import axios from "axios";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";
import store from "../redux/store";

const URL = "https://tracking-app-alex.herokuapp.com";

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
    .catch((err) => err.response);
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
    .catch((err) => err.response);
};

export const getMeasurements = async (userToken, measureData) => {
  await axios
    .get(`${URL}/measurements`, {
      headers: {
        Authorization: `Basic ${userToken.token}`,
      },
    })
    .then(function (response) {
      store.dispatch(measureData({ dataInfo: response.data }));
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
    url: `${URL}/measurements`,
    data: {
      name: inputValue,
      created_by: userId,
    },
    method: "POST",
    headers: {
      Authorization: `Basic ${userToken.token}`,
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
    url: `${URL}/measurements/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Basic ${userToken.token}`,
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
    url: `${URL}/measurements/${id}/measures`,
    data: { value_of_measure: inputValue, measurement_id: id },
    method: "POST",
    headers: {
      Authorization: `Basic ${userToken.token}`,
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
    url: `${URL}/measurements/${data.measurement_id}/measures/${data.id}`,
    data: { value_of_measure: inputValue, measurement_id: data.id },
    method: "PATCH",
    headers: {
      Authorization: `Basic ${userToken.token}`,
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
    url: `${URL}/measurements/${data.measurement_id}/measures/${data.id}/`,
    method: "DELETE",
    headers: {
      Authorization: `Basic ${userToken.token}`,
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

export const saveToken = (data) => {
  const NOW = Date.now();
  const tokenObj = {
    token: data.data.auth_token,
    expiresAt: NOW + 86400000,
  };
  localStorage.setItem("isLoggedIn", true);
  localStorage.setItem("tokenObj", JSON.stringify(tokenObj));
  localStorage.setItem("userInfo", jwt(data.data.auth_token).name);
  localStorage.setItem(
    "userId",
    JSON.stringify(jwt(data.data.auth_token).user_id)
  );
};

export const signOut = (history) => {
  localStorage.clear();
  store.dispatch(
    userData({
      isLoggedIn: false,
      userToken: "",
      userInfo: "",
      userId: "",
    })
  );
  history.push("/");
};
