import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureItem from "../components/MeasureItem";
import Clear from "@material-ui/icons/Clear";
import { getMeasurements, removeMeasurement } from "../api-requests";
import MainPage from "./MainPage";
import { Grid } from "@material-ui/core";

const MeasurementPage = ({
  isLoggedIn,
  dataInfo,
  measureData,
  userToken,
  userId,
}) => {
  const { id } = useParams();
  const [fetchRequested, setFetchRequested] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, [fetchRequested]);
  return (
    <div className="p-3">
      {isLoggedIn ? (
        <>
          <Clear
            onClick={async () => {
              await removeMeasurement(
                id,
                userToken,
                userId,
                fetchRequested,
                setFetchRequested
              );
              history.push(`/`);
            }}
          />
          <Link to="/">Home</Link>
          <div className="d-flex justify-content-center mt-3 font-weight-bold">
            123
          </div>
          <MeasureItem
            id={id}
            userI={userId}
            fetchRequested={fetchRequested}
            setFetchRequested={setFetchRequested}
            dataInfo={dataInfo}
            measureData={measureData}
            userToken={userToken}
          />
        </>
      ) : (
        <MainPage />
      )}
    </div>
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
