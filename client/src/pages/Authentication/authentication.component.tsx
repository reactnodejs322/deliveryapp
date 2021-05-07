import React, { useState } from "react";
import SignIn from "../../components/sign-in/sign-in.component";
import Signup from "../../components/sign-up/sign-up.component";
import "./authentication.styles.scss";

const Authentication = () => {
  const [show_signup, setShowSignup] = useState<boolean>(true);

  return (
    <div className="authentication">
      {show_signup ? (
        <Signup setShowSignup={setShowSignup} />
      ) : (
        <SignIn setShowSignup={setShowSignup} />
      )}
    </div>
  );
};
export default Authentication;
