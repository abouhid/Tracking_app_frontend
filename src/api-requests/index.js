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
  console.log("siginuser", dataObj);
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
