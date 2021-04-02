import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MeasureItem from "../components/MeasureItem";
import { getMeasurements, removeMeasurement } from "../api-requests";
import SubmitForm from "../components/SubmitForm";
import { Modal, Button } from "react-bootstrap";

const MeasurementPage = ({ isLoggedIn, dataInfo, measureData, userToken }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();
  const [fetchRequested, setFetchRequested] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, [fetchRequested]);

  const measurementInfo = dataInfo.find((el) => el.id == id);

  return (
    <div className="Page w-100">
      {isLoggedIn ? (
        <>
          <h3 className="my-4 text-center">
            Your{" "}
            <span style={{ color: "#62b5e5" }}>{measurementInfo.name}</span> 's
            Progress
          </h3>
          <SubmitForm
            userToken={userToken}
            value={id}
            setFetchRequested={setFetchRequested}
            fetchRequested={fetchRequested}
            formType={"ADD"}
          />
          <MeasureItem
            id={id}
            fetchRequested={fetchRequested}
            setFetchRequested={setFetchRequested}
            item={measurementInfo}
            measureData={measureData}
            userToken={userToken}
            isLoggedIn={isLoggedIn}
          />
          <Button variant="danger" onClick={handleShow}>
            Delete Measurement
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={async () => {
                  handleClose();
                  await removeMeasurement(
                    id,
                    userToken,
                    fetchRequested,
                    setFetchRequested
                  );
                  history.push(`/`);
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
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
  dataInfo: state.measureStore.dataInfo,
});

MeasurementPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  dataInfo: PropTypes.array.isRequired,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(MeasurementPage);
