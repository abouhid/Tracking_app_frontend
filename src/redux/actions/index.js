const USER_DATA = "USER_DATA";

const userData = (data) => {
  console.log("data inside action", data);
  return {
    type: USER_DATA,
    payload: data,
  };
};

export { USER_DATA, userData };
