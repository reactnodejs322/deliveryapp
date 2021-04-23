import React, { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import Signup from "../../components/sign-up/sign-up.component";
import "./authentication.styles.scss";
const Authentication = () => {
  const [show_signup, setShowSignup] = useState(false);
  // const x = () => {
  //   console.log(Math.floor(Math.random() * (9999 - 1000) + 1000));
  // };
  return (
    <div className="authentication">
      {show_signup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <SignIn setShowSignup={setShowSignup} />
      )}

      {/* <button onClick={() => x()}>generate</button> */}
    </div>
  );
};
export default Authentication;
