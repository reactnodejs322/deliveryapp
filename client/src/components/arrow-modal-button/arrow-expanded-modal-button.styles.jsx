import { useTransition, animated } from "react-spring/web.cjs";
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import globalcss from "../../global-css/styled-component-variable";
//styling
export const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: globalcss.lightdark,

      boxShadow: theme.shadows[5],

      borderRadius: "5px",
      padding: "20px",
      outline: "none",
      width: "500px",
      wordBreak: "break-all",
    },
  })
);

//animation
// Problems with animating this modal using useRef
// https://codesandbox.io/s/material-demo-forked-xu097?file=/demo.tsx
// https://github.com/mui-org/material-ui/issues/23176#issuecomment-712811124
export const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited } = props;

  const spring = React.useMemo(() => {
    return {
      from: { opacity: 0 },
      enter: (currentlyOpen) => async (next) => {
        if (currentlyOpen && onEnter) {
          onEnter();
        }

        await next({ opacity: 1 });
        if (!currentlyOpen && onExited) {
          onExited();
        }
      },
      leave: (currentlyOpen) => async (next, cancel) => {
        await next({ opacity: 0 });
        if (currentlyOpen && onExited) {
          //onExited();
        }
      },
    };
  }, [onEnter, onExited]);
  const transitions = useTransition(open, null, spring);

  return transitions.map(({ item, key, props }) => {
    return (
      item && (
        <animated.div key={key} style={props}>
          {children}
        </animated.div>
      )
    );
  });
});
