import React from "react";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  Slide,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import { updateMeasure, addMeasure } from "../../api-requests";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import { Icon } from "@material-ui/core";

const SubmitForm = ({
  userToken,
  value,
  setFetchRequested,
  fetchRequested,
  formType,
}) => {
  const [checked, setChecked] = React.useState(false);
  const editForm = formType === "EDIT";
  const buttonText = editForm ? "Edit Measure" : "Add Measure";

  return (
    <Grid item>
      <FormControlLabel
        control={
          <>
            {editForm ? (
              <Edit
                onClick={() => {
                  setChecked(!checked);
                  updateMeasure(
                    value,
                    userToken,
                    setFetchRequested,
                    fetchRequested
                  );
                }}
              />
            ) : (
              <Add
                onClick={() =>
                  addMeasure(
                    value,
                    userToken,
                    setFetchRequested,
                    fetchRequested
                  )
                }
              />
            )}
          </>
        }
      />
      <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        <FormControl>
          <InputLabel htmlFor="my-input">Add measure (cm)</InputLabel>
          <Input
            type="number"
            required={true}
            id="my-input"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            Type only numbers.
          </FormHelperText>
          <Button type="submit" variant="contained" color="primary">
            {buttonText} <Icon>send</Icon>
          </Button>
        </FormControl>
      </Slide>
    </Grid>
  );
};

export default SubmitForm;
