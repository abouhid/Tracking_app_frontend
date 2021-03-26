// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardHeader } from "@material-ui/core";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTY3NzkyMDd9.6Oy2Tt_FJGBG-4xv4sDl5vUlIGAusyKv1djal9i3D00";

// const name = "bbb";
// const password = "bbb";
// const password_confirmation = "bbb";
// const email = "1234@gmail.com";
// export const logInUser = (data) =>
//   axios({
//     url: `${URL}/auth/login`,
//     data: JSON.stringify(data),
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res)
//     .catch((err) => err);

function App() {
  const [measurements, setMeasurements] = useState("");
  const addMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.id}/measures`,
      data: { value_of_measure: "321" },
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        // setMeasurements(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const loginUser = async () => {
      // await axios
      //   .post(
      //     `http://localhost:3001/signup?name=${name}&password=${password}&password_confirmation=${password_confirmation}&email=${email}`
      //   )
      //   .then(function (response) {
      //     console.log("LOGGED IN", response);
      //   })
      //   .catch(function (error) {
      //     console.log("ERROR", error);
      //   });
      await axios
        .get("http://localhost:3001/measurements", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then(function (response) {
          setMeasurements(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    loginUser();
  }, []);
  return (
    <div className="App">
      <CardHeader>test</CardHeader>
      <div>Values:</div>

      {measurements[0] ? (
        <>
          {measurements.map((el) => (
            <div key={el.id}>
              <h1>{el.name}</h1>
              {el.measures.map((value) => {
                return <li key={value.id}>{value.value_of_measure}</li>;
              })}
              <button onClick={() => addMeasure(el)}>Add new measure</button>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
