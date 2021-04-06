import React from "react";

import "./sign-in-form.styles.scss";

import SignInNumpad from "../sign-in-numpad/sign-in-numpad.component";
const SignInForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const userid = event.target.userid.value;
    if (!userid) {
      alert("You must enter your user id!");
      return;
    }
  };

  return (
    <section className="form-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>User id:</p>
            <input name="userid" id="userid" type="password" />
          </label>
          <SignInNumpad />
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default SignInForm;
