import React, { useEffect, useState, useRef } from "react";

import Expire from "./expire.component";
//https://stackoverflow.com/questions/54975190/react-hooks-removing-component-after-use
const CustomSnackbar = ({ children, autoHideDuration, changeTrigger }) => {
  const [reRender, setreRender] = useState(null);
  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };
  const prevReRender = usePrevious(reRender);

  useEffect(() => {
    if (prevReRender === reRender) {
      setreRender(false);
    } else {
      setreRender(true);
    }
  }, [changeTrigger, reRender, prevReRender]);

  return (
    <div>
      {reRender ? (
        <Expire autoHideDuration={autoHideDuration}>{children}</Expire>
      ) : null}
    </div>
  );
};
//
export default CustomSnackbar;

/*
import React, { useEffect, useState, useRef } from "react";

import Expire from "./expire.component";
//https://stackoverflow.com/questions/54975190/react-hooks-removing-component-after-use
const CustomSnackbar = ({ children, autoHideDuration, changeTrigger }) => {
  const [reRender, setreRender] = useState(null);
  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };
  const prevReRender = usePrevious(reRender);

  useEffect(() => {
    if (prevReRender === reRender) {
      setreRender(false);
    } else {
      setreRender(true);
    }
  }, [changeTrigger, reRender, prevReRender]);

  return (
    <div>
      {reRender ? (
        <Expire autoHideDuration={autoHideDuration}>{children}</Expire>
      ) : null}
    </div>
  );
};
//
export default CustomSnackbar;
*/
