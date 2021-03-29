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
} from "@material-ui/core";

const EditForm = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div>
      <div>
        <FormControlLabel
          control={
            <Switch checked={checked} onChange={() => setChecked(!checked)} />
          }
          label="Show"
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
      </div>
    </div>
  );
};

export default EditForm;
