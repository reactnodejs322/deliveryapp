import React from "react";
import { Switch, Route } from "react-router-dom";
import MissionControl from "./pages/missioncontrol/mission-control.component";
import HomePage from "./pages/home/home.component";
import SignIn from "./pages/sign-in/sign-in.component";
import NavBar from "./components/navbar/navbar.component";
import "./App.styles.scss";
/*
https://flaviocopes.com/react-how-to-configure-https-localhost/
*/
const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/missioncontrol" component={MissionControl} />
        <Route exact path="/" component={HomePage} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </div>
  );
};

export default App;
