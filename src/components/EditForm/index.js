import React from "react";
import {
  FormControl,
  Button,
  InputLabel,
  Input,
  FormHelperText,
  Switch,
  Slide,
  FormControlLabel,
  Grid,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import { updateMeasure } from "../../api-requests";

const EditForm = ({ userToken, value, setFetchRequested, fetchRequested }) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Grid item>
      <FormControlLabel
        control={
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
          <Button />
        </FormControl>
      </Slide>
    </Grid>
  );
};

export default EditForm;
