import { useTransition, animated } from "react-spring/web.cjs";
import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styled from "styled-components";
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
      width: "600px",
      height: "500px",
      overflowY: "auto",
      wordBreak: "break-all",
    },
  })
);

export const RowContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const DriverColumnContainer = styled.div`
  display: flex;
  flex: 10%;
  justify-content: center;
  word-break: break-all;
`;

export const CenterColumnContainer = styled.div`
  display: flex;
  flex: 10%;
  justify-content: center;
`;

export const OrderColumnContainer = styled.div`
  display: flex;
  flex: 10%;
  justify-content: center;
`;

export const OrderNumbersContainer = styled.div`
  width: 37px;
  color: red;
  text-align: center;
  height: 25px;
`;

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
