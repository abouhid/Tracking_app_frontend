const USER_DATA = "USER_DATA";

const userData = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

export { USER_DATA, userData };
