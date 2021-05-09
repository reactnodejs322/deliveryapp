import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Dispatch } from "redux";
import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

interface SignUpProps {
  signUpStart: (value: {
    displayName: string;
    email: string;
    password: string;
  }) => void;
  /*
   setShowSignup needs a value internally this is how it works setState
   type Dispatch<A> = (value: A) => void;
   You're missing the value argument from your type.
   This should be correct (also note that it needs to be a colon not an equal sign):
  */
  setShowSignup: (active: boolean) => void;
}

interface UserCredentialsState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp: React.FC<SignUpProps> = ({ signUpStart, setShowSignup }) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setUserCredentials({ ...userCredentials, [name]: value });
  };
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    signUpStart({ displayName, email, password });
  };
  return (
    <div className="signupcontainer">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <CustomButton color={"white"} margin={"10px"} type="submit">
          SIGN UP
        </CustomButton>
        <CustomButton
          color={"white"}
          margin={"10px"}
          onClickFunctionProp={() => setShowSignup(false)}
        >
          Sign In
        </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUpStart: (value: {
    displayName: string;
    email: string;
    password: string;
  }) => dispatch(signUpStart(value)),
});

export default connect(null, mapDispatchToProps)(SignUp);
