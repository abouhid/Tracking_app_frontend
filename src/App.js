import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTY3NzkyMDd9.6Oy2Tt_FJGBG-4xv4sDl5vUlIGAusyKv1djal9i3D00";

const name = "bbb";
const password = "bbb";
const password_confirmation = "bbb";
const email = "1234@gmail.com";

function App() {
  const [measurements, setMeasurements] = useState("");

  const loginUser = async () => {
    await axios
      .post(
        `http://localhost:3001/signup?name=${name}&password=${password}&password_confirmation=${password_confirmation}&email=${email}`
      )
      .then(function (response) {
        console.log("LOGGED IN", response);
      })
      .catch(function (error) {
        console.log("ERROR", error);
      });
  };
  console.log(measurements);
  useEffect(async () => {
    return await axios
      .get("http://localhost:3001/measurements", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then(function (response) {
        setMeasurements(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <button onClick={() => loginUser()}>LogIn</button>
      <div>Values:</div>

      {measurements.measures ? (
        measurements.measures.map((el) => <li>{el.value_of_measure}</li>)
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
