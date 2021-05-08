import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import { Dispatch } from "redux";
import "./sign-in.styles.scss";
import GoogleButton from "../googlebutton/googlebutton.component";
import CustomButton from "../custom-button/custom-button.component";
import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

interface SignInProps {
  googleSignInStart: () => void;
  setShowSignup: (active: boolean) => void;
  emailSignInStart: (email: string, password: string) => void;
}

const SignIn: React.FC<SignInProps> = ({
  emailSignInStart,
  googleSignInStart,
  setShowSignup,
}) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>Sign In </h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton
            color={"red"}
            margin={"10px"}
            onClickFunctionProp={() =>
              emailSignInStart("test@test.com", "123456")
            }
          >
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email: string, password: string) =>
    dispatch(emailSignInStart({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);
