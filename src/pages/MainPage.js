import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MainPage = ({ isLoggedIn, userInfo }) => {
  if (isLoggedIn) {
    return <>Welcome {userInfo}!</>;
  }
  return (
    <>
      <p>You are not logged in!</p>
      <Link to={{ pathname: "/login" }}>Log In</Link>
      <Link to={{ pathname: "/signin" }}>Sign In</Link>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userStore.isLoggedIn,
  userToken: state.userStore.userToken,
  userInfo: state.userStore.userInfo,
});

MainPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userToken: PropTypes.string.isRequired,
  userInfo: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(MainPage);
