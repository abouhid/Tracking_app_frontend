import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureItem from "../components/MeasureItem";
import Clear from "@material-ui/icons/Clear";
import { getMeasurements, removeMeasurement } from "../api-requests";
import SubmitForm from "../components/SubmitForm";

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

  const measurementInfo = dataInfo.find((el) => el.id == id);

  return (
    <div className="MeasurementPage w-100">
      {isLoggedIn ? (
        <>
          {/* <Clear
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
          /> */}

          <SubmitForm
            userToken={userToken}
            value={id}
            setFetchRequested={setFetchRequested}
            fetchRequested={fetchRequested}
            formType={"ADD"}
          />
          <MeasureItem
            id={id}
            userI={userId}
            fetchRequested={fetchRequested}
            setFetchRequested={setFetchRequested}
            item={measurementInfo}
            measureData={measureData}
            userToken={userToken}
            isLoggedIn={isLoggedIn}
          />
        </>
      ) : (
        <Redirect to="/" />
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
