import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MainPage = ({ isLoggedIn, userInfo, userToken, userId }) => {
  const [measurements, setMeasurements] = useState("");
  const addMeasure = async (data) => {
    await axios({
      url: `http://localhost:3001/measurements/${data.id}/measures`,
      data: { value_of_measure: "321", measurement_id: data.id },
      method: "POST",
      headers: {
        Authorization: `Basic ${userToken}`,
      },
    })
      .then(function (response) {
        const updatedMeasurements = measurements.map(
          (obj) => [response.data].find((o) => o.id === obj.id) || obj
        );
        setMeasurements(updatedMeasurements);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addMeasurement = async () => {
    console.log(userId, "aaaaaaaaaaaaaaaa");
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
  console.log("object", measurements);

  useEffect(() => {
    const getMeasurements = async () => {
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
    getMeasurements();
  }, []);

  if (isLoggedIn) {
    return (
      <>
        <h1>Welcome {userInfo}!</h1>
        <div style={{ display: "flex" }}>
          {measurements[0] ? (
            <>
              {measurements.map((el) => (
                <div key={el.created_at}>
                  <h4>{el.name}</h4>
                  {el.measures.map((value) => {
                    return (
                      <li key={value.created_at}>{value.value_of_measure}</li>
                    );
                  })}
                  <button onClick={() => addMeasure(el)}>
                    Add new measure
                  </button>
                </div>
              ))}
            </>
          ) : (
            <></>
          )}
          <button onClick={() => addMeasurement()}>Add new measurement</button>
        </div>
      </>
    );
  }
  return <HomePage />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  userId: state.userStore.userId,
});

MainPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps)(MainPage);
