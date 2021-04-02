import React from "react";
import { deleteMeasure } from "../../api-requests";
import { Grid, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SubmitForm from "../SubmitForm";
import "./index.css";
import { TrendingDown, TrendingUp } from "@material-ui/icons";

const MeasureItem = ({
  userToken,
  setFetchRequested,
  fetchRequested,
  item,
  userId,
}) => {
  const creationDate = (date) => {
    const createdAt = new Date(date)
      .toUTCString()
      .split(" ")
      .splice(1, 3)
      .join(" ");

    return createdAt;
  };

  const deleteIcon = (value) => (
    <DeleteIcon
      onClick={() =>
        deleteMeasure(value, userToken, setFetchRequested, fetchRequested)
      }
    />
  );

  const editIcon = (value) => (
    <SubmitForm
      userToken={userToken}
      value={value}
      setFetchRequested={setFetchRequested}
      fetchRequested={fetchRequested}
      formType={"EDIT"}
      userId={userId}
    />
  );
  let measureArr = item.measures.map((item) => parseInt(item.value_of_measure));
  let diffArr = [];
  for (let i = measureArr.length; i > 0; i--) {
    diffArr.unshift(measureArr[i - 1] - measureArr[i]);
  }
  console.log(diffArr);
  console.log(diffArr);

  const showProgress = (idx) => {
    return (
      <span>
        {diffArr[idx] ? (
          <>
            {diffArr[idx] >= 0 ? <TrendingUp /> : <TrendingDown />}
            {`${diffArr[idx]} cm`}
          </>
        ) : (
          <></>
        )}
      </span>
    );
  };

  return (
    <>
      {item.measures.map((value, idx) => {
        return (
          <Grid key={value.id} item className="my-3">
            <Paper elevation={3}>
              <List component="div" disablePadding>
                <ListItem button>
                  <ListItemText
                    primary={creationDate(value.created_at)}
                    secondary={`${value.value_of_measure} cm`}
                  />

                  <div className="d-flex flex-column align-items-end">
                    {showProgress(idx)}
                    {editIcon(value)}
                    {deleteIcon(value)}
                  </div>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        );
      })}
    </>
  );
};

export default MeasureItem;
