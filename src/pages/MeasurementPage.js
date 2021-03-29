import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HomePage from "./HomePage";
import MeasureItem from "../components/MeasureItem";
import { addMeasurement, getMeasurements } from "../api-requests";

const MeasurementPage = ({
  isLoggedIn,
  dataInfo,
  measureData,
  userToken,

  data,
}) => {
  const { id } = useParams();
  const [fetchRequested, setFetchRequested] = useState(false);

  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, [fetchRequested]);
  console.log(data, "page", dataInfo);
  return (
    <>
      {isLoggedIn ? (
        <>
          <Link to="/">Home</Link>
          <div className="d-flex justify-content-center mt-3 font-weight-bold"></div>
          <MeasureItem
            id={id}
            fetchRequested={fetchRequested}
            setFetchRequested={setFetchRequested}
            dataInfo={dataInfo}
            measureData={measureData}
            userToken={userToken}
          />
        </>
      ) : (
        <HomePage />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  userId: state.userStore.userId,
  dataInfo: state.measureStore.dataInfo,
});

MeasurementPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dataInfo: PropTypes.array.isRequired,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(MeasurementPage);
