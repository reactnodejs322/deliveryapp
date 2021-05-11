import React from "react";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import {
  hiddingTutorial,
  moveTroughTheArray,
} from "../../redux/tutorial/tutorial.action";

import "./tutorial.styles.scss";
import Button from "@material-ui/core/Button";

const Tutorial = ({
  hiddingTutorial,
  moveTroughTheArray,
  nextPath,
  prevPath,
}) => {
  let history = useHistory();
  //I want to move to the next page and update the state using moveTroughTheArray action, but state didn't update

  const clickPrev = () => {
    // Click => move to another page
    history.push(prevPath);
    // Update the states
    moveTroughTheArray();
  };

  const clickNext = () => {
    history.push(nextPath);
    moveTroughTheArray();
  };

  return (
    <div className="tutorial-container">
      <span className="close-tutorial" onClick={hiddingTutorial}>
        X close tutorial
      </span>

      <p className="tutorial-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id nisi
        suscipit, aliquet purus nec, ultricies lacus. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>

      {/* Not sure how to orginize this dives for now*/}

      <div className="tutorial-selectors">
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector active"></div>
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector"></div>
        <div className="selector"></div>
      </div>

      <div className="buttons">
        <Button
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "3px 30px",
            margin: "0 25px",
          }}
          onClick={clickPrev}
        >
          Prev
        </Button>

        <Button
          style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: "3px 30px",
            margin: "0 25px",
          }}
          onClick={clickNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  console.log(state);
  return {
    prevPath: state.tutorial.prevPath,
    nextPath: state.tutorial.nextPath,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    hiddingTutorial: () => dispatch(hiddingTutorial()),
    moveTroughTheArray: () => dispatch(moveTroughTheArray()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Tutorial)
);
