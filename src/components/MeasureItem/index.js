import React from "react";
import { deleteMeasure } from "../../api-requests";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SubmitForm from "../SubmitForm";

const MeasureItem = ({
  id,
  userToken,
  setFetchRequested,
  fetchRequested,
  dataInfo,
}) => {
  const currentData = dataInfo.find((el) => el.id == id);
  const noMeasures = currentData.measures.length == 0;

  return (
    <Grid container>
      <SubmitForm
        userToken={userToken}
        value={currentData}
        setFetchRequested={setFetchRequested}
        fetchRequested={fetchRequested}
        formType={"ADD"}
      />
      {currentData.measures.map((value) => {
        return (
          <div key={value.id}>
            <Grid key={value.created_at} container>
              <DeleteIcon
                onClick={() =>
                  deleteMeasure(
                    value,
                    userToken,
                    setFetchRequested,
                    fetchRequested
                  )
                }
              />
              <div>{value.value_of_measure}</div>
              <SubmitForm
                userToken={userToken}
                value={value}
                setFetchRequested={setFetchRequested}
                fetchRequested={fetchRequested}
                formType={"EDIT"}
              />
            </Grid>
          </div>
        );
      })}
    </Grid>
  );
};

export default MeasureItem;
