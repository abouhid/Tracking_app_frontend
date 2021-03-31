import React, { useReducer } from "react";
import {
  Button,
  Slide,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { updateMeasure, addMeasure, addMeasurement } from "../../api-requests";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import { Icon } from "@material-ui/core";

const SubmitForm = ({
  userToken,
  value,
  setFetchRequested,
  fetchRequested,
  formType,
  userId,
}) => {
  const [checked, setChecked] = React.useState(false);
  const editForm = formType === "EDIT";
  const measurementForm = formType === "Add Measurement";

  const buttonText = editForm ? "Edit" : "Add";

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      measure: "",
    }
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let inputValue = formInput.measure;
    editForm
      ? updateMeasure(
          value,
          userToken,
          setFetchRequested,
          fetchRequested,
          inputValue
        )
      : measurementForm
      ? addMeasurement(
          userToken,
          userId,
          fetchRequested,
          setFetchRequested,
          inputValue
        )
      : addMeasure(
          value,
          userToken,
          setFetchRequested,
          fetchRequested,
          inputValue
        );

    setChecked(!checked);
    setFormInput({ measure: "" });
  };

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  return (
    <Grid item>
      <FormControlLabel
        control={
          <>
            {editForm ? (
              <Edit onClick={() => setChecked(!checked)} />
            ) : (
              <Add onClick={() => setChecked(!checked)} />
            )}
          </>
        }
      />
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <form onSubmit={handleSubmit}>
          <TextField
            type={measurementForm ? "any" : "number"}
            label={measurementForm ? formType : buttonText + " Measure (cm)"}
            id="margin-normal"
            name="measure"
            defaultValue={formInput.measure}
            helperText={measurementForm ? "" : "Use only numbers"}
            onChange={handleInput}
            required={true}
          />

          <Button type="submit" variant="contained" color="primary">
            {measurementForm ? formType : buttonText + " Measure"}
            <Icon>send</Icon>
          </Button>
        </form>
      </Slide>
    </Grid>
  );
};

export default SubmitForm;
