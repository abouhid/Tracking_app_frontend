import { USER_DATA } from "../actions";

const userReducer = (
  state = {
    isLoggedIn: false,
    userToken: JSON.parse(localStorage.getItem("tokenObj")),
    userInfo: localStorage.getItem("userInfo"),
    userId: JSON.parse(localStorage.getItem("userId")),
  },
  action
) => {
  switch (action.type) {
    case USER_DATA:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
