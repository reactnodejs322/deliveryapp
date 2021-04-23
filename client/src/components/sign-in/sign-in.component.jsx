import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";

import "./sign-in.styles.scss";
import GoogleButton from "../googlebutton/googlebutton.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

// import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart, setShowSignup }) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>Sign In </h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton color={"red"} margin={"10px"}>
            Demo
          </CustomButton>

          <CustomButton color={"white"} margin={"10px"} type="submit">
            Sign in
          </CustomButton>

          <CustomButton
            onClickFunctionProp={() => setShowSignup(true)}
            color={"white"}
            margin={"10px"}
          >
            Sign up
          </CustomButton>
          <GoogleButton onClick={googleSignInStart} />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);
