import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { measureData } from "../redux/actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getMeasurements } from "../api-requests";
import { DropdownButton, Dropdown } from "react-bootstrap";
import SubmitForm from "../components/SubmitForm";
import { Paper } from "@material-ui/core";

const AddPage = ({
  isLoggedIn,
  dataInfo,
  measureData,
  userToken,
  userInfo,
}) => {
  const [value, setValue] = useState("Choose Measurement");
  const [id, setId] = useState("");

  const [fetchRequested, setFetchRequested] = useState(false);

  const handleSelect = (e) => {
    const chosenId = dataInfo.find((el) => el.name == e).id;
    setValue(e);
    setId(chosenId);
  };
  const todaysDate = new Date();
  const result = todaysDate.toUTCString().split(" ");
  result.splice(4, 2);
  const finalValue = result.join(" ");

  useEffect(() => {
    getMeasurements(userToken, measureData);
  }, []);

  const dropdownItems = () => {
    return dataInfo.map((el) => {
      return (
        <Dropdown.Item key={el.id} eventKey={el.name}>
          {el.name}
        </Dropdown.Item>
      );
    });
  };
  return (
    <div className="Page">
      {isLoggedIn ? (
        <Paper className="Page add d-flex flex-column align-items-center justify-content-around">
          <div className="d-flex justify-content-center mt-3 font-weight-bold ">
            {finalValue}
          </div>
          <h4 className="text-nowrap px-3">Add your measures!</h4>
          <DropdownButton
            title={value}
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
          >
            {dropdownItems()}
          </DropdownButton>
          <SubmitForm
            userToken={userToken}
            value={id}
            setFetchRequested={setFetchRequested}
            fetchRequested={fetchRequested}
            formType={"ADD"}
          />
        </Paper>
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
  dataInfo: state.measureStore.dataInfo,
});

AddPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
  dataInfo: PropTypes.array.isRequired,
};

const mapDispatch = {
  measureData,
};

export default connect(mapStateToProps, mapDispatch)(AddPage);
