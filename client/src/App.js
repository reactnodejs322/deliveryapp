import React from "react";
import { Switch, Route } from "react-router-dom";
import MissionControl from "./pages/missioncontrol/mission-control.component";
import HomePage from "./pages/home/home.component";
import SignIn from "./pages/sign-in/sign-in.component";
import SignUp from "./pages/sign-up/sign-up.component";
import NavBar from "./components/navbar/navbar.component";
import "./App.styles.scss";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={MissionControl} />
        {/* <Route path="/missioncontrol" component={HomePage} /> */}
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
