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
        var updatedMeasurements = measurements.map(
          (obj) => [response.data].find((o) => o.id === obj.id) || obj
        );
        setMeasurements(updatedMeasurements);
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
        {measurements[0] ? (
          <>
            {measurements.map((el) => (
              <div key={el.created_at}>
                <h1>{el.name}</h1>
                {el.measures.map((value) => {
                  return (
                    <li key={value.created_at}>{value.value_of_measure}</li>
                  );
                })}
                <button onClick={() => addMeasure(el)}>Add new measure</button>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
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
