import React, { useEffect, useState } from "react";

const AddSnack = ({ children, changeTrigger }) => {
  const [state, setstate] = useState([]);
  //adding

  useEffect(() => {
    // console.log("adding");
    //
    if (children.props.children.props.disconnect_snackbar) {
      setstate((state) => {
        return [...state, children];
      });
    }
  }, [changeTrigger, children]);
  // removing
  useEffect(() => {
    if (state.length === 3 + 1) {
      // let newState = [...state];
      // newState.pop();
      setstate([]);
    }
  }, [state]);
  // console.log("state", state);

  return (
    <div>
      {state.map((e, index) => {
        return <div key={index.toString()}>{e}</div>;
      })}
    </div>
  );
};
/*
 {state.map((e, index) => {
        return <div key={index.toString()}>{e}</div>;
      })}
*/
export default AddSnack;
