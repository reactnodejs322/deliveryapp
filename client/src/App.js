import React, { useEffect, lazy, Suspense } from "react";
import Spinner from "./components/spinner/spinner.component";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import NavBar from "./components/navbar/navbar.component";
import Tutorial from "./components/tutorial/tutorial.component";
import PrivateRoute from "./components/private-route/private-route.component";
import "./App.styles.scss";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectTutorial } from "./redux/tutorial/tutorial.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { STATES } from "mongoose";

const Authentication = lazy(() =>
  import("./pages/Authentication/authentication.component")
);
const MissionControl = lazy(() =>
  import("./pages/missioncontrol/mission-control.component")
);
const UserSettings = lazy(() =>
  import("./pages/user-settings/user-settings.component")
);

const App = ({ checkUserSession, currentUser, tutorial }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  console.log(tutorial);

  return (
    <div className="App">
      {currentUser !== null ? <NavBar currentUser={currentUser} /> : null}
      {currentUser && !tutorial ? <Tutorial /> : null}

      <Switch>
        {/*Note without caching user session with redux persesit  it will bug up
         and show Signup component for a split second
        */}
        <Suspense fallback={<Spinner />}>
          <PrivateRoute path="/missioncontrol" component={MissionControl} />
          <PrivateRoute path="/settings" component={UserSettings} />

          <Route
            exact
            path="/"
            render={() =>
              currentUser ? (
                <Redirect to="/missioncontrol" />
              ) : (
                <Authentication />
              )
            }
          />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  tutorial: selectTutorial,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
