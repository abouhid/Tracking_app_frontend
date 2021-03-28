// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { logInUser, signInUser } from "./api-requests";
import { userData } from "./redux/actions";
import jwt from "jwt-decode";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function App({ isLoggedIn }) {
  const [measurements, setMeasurements] = useState("");
  const [signIn, setSignIn] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignIn((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signInUser(signIn);
    console.log("data", jwt(data.data.auth_token), data);
    if (data.statusText === "Created") {
      const userInfo = {
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).email,
      };
      userData(userInfo);
      // history.push("/");
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    // const data = await logInUser(signIn);
    // console.log(data);
    // console.log("jwt", jwt(data.data.auth_token));
    // if (data.statusText === "Created") {
    //   const userInfo = {
    //     isLoggedIn: true,
    //     userToken: data.data.auth_token,
    //     userInfo: jwt(data.data.auth_token).name,
    //     userId: jwt(data.data.auth_token).user_id,
    //   };
    //   userData(userInfo);
    //   // history.push("/");
    // }
  };

  const addMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.id}/measures`,
      data: { value_of_measure: "321" },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log("response");
        // setMeasurements(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {

  //     await axios
  //       .get("http://localhost:3001/measurements", {
  //         headers: {
  //           Authorization: `Basic ${token}`,
  //         },
  //       })
  //       .then(function (response) {
  //         setMeasurements(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   loginUser();
  // }, []);
  return (
    <div className="App">
      <button onClick={(e) => handleSubmit2(e)}>Log in</button>
      <h4>State of user: {isLoggedIn}</h4>
      <form>
        <h1>Log In</h1>
        <input
          type="text"
          id="name"
          placeholder="name"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          id="password_confirmation"
          placeholder="password_confirmation"
          required
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Sign in
        </button>
      </form>
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

const mapDispatch = {
  userData,
};

// App.propTypes = {
//   userData: PropTypes.func.isRequired,
// };

export default connect(null, mapDispatch)(App);
