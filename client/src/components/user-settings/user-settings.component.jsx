import React from "react";
import { connect } from "react-redux";
import { signOutStart } from "../../redux/user/user.actions";
const UserSettings = ({ signOutStart }) => {
  return <button onClick={() => signOutStart()}>sign out</button>;
};
const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(null, mapDispatchToProps)(UserSettings);
