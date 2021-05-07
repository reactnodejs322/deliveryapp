import React, { useState } from "react";
import { connect } from "react-redux";

// import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Dispatch } from "redux";
import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

interface SignUpProps {
  signUpStart: ({}) => void;
  /*
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
const SignUp = ({ signUpStart, setShowSignup }: SignUpProps) => {
  const [userCredentials, setUserCredentials] = useState<UserCredentialsState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="signupcontainer">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form">
        <input
          style={{ color: "black" }}
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
        />

        {/* <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          required
        /> */}
        {/* <FormInput
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
        </CustomButton> */}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUpStart: (userCredentials: {}) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
