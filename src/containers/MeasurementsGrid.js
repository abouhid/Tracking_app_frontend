import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import MeasureItem from "../components/MeasureItem";

const MeasurementsGrid = ({ userInfo, userToken, userId }) => {
  const [measurements, setMeasurements] = useState("");
  const [fetchRequested, setFetchRequested] = useState(false);
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
  }, [fetchRequested]);
  const addMeasurement = async () => {
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
  const removeMeasurement = async () => {
    await axios({
      url: `http://localhost:3001/measurements/`,
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
        setMeasurements((prevState) => [...prevState, response.data]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Welcome {userInfo}!</h1>
      <div style={{ display: "flex" }}>
        {measurements[0] ? (
          <>
            {measurements.map((el) => (
              <div key={el.created_at}>
                <MeasureItem
                  data={el}
                  fetchRequested={fetchRequested}
                  setFetchRequested={setFetchRequested}
                  measurements={measurements}
                  setMeasurements={setMeasurements}
                  userToken={userToken}
                />
              </div>
            ))}

            <button onClick={() => removeMeasurement()}>
              Delete measurement
            </button>
          </>
        ) : (
          <></>
        )}
        <button onClick={() => addMeasurement()}>Add new measurement</button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  userId: state.userStore.userId,
});

MeasurementsGrid.propTypes = {
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default connect(mapStateToProps)(MeasurementsGrid);
