import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasurementItem from "../MeasurementItem";
import { Grid, Typography } from "@material-ui/core";
import { measureData } from "../../redux/actions";
import { getMeasurements } from "../../api-requests";
import SubmitForm from "../../components/SubmitForm";

const MeasurementsGrid = ({ userInfo, userToken, measureData, dataInfo }) => {
  const [fetchRequested, setFetchRequested] = useState(false);
  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, [fetchRequested]);
  return (
    <>
      <Typography className="text-center py-4">
        {localStorage.getItem("userInfo")}'s Measurements:
      </Typography>

      <Grid container item xs={12} spacing={3} alignItems="center" m={0}>
        {dataInfo ? (
          <>
            {dataInfo.map((el) => (
              <MeasurementItem key={el.id} el={el} />
            ))}
          </>
        ) : (
          <></>
        )}

        <SubmitForm
          userToken={userToken}
          value={dataInfo}
          setFetchRequested={setFetchRequested}
          fetchRequested={fetchRequested}
          formType={"Add Measurement"}
        />
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
  dataInfo: state.measureStore.dataInfo,
});

MeasurementsGrid.propTypes = {
  userToken: PropTypes.shape({ token: PropTypes.string }).isRequired,
  userInfo: PropTypes.string.isRequired,
  dataInfo: PropTypes.array,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(MeasurementsGrid);
