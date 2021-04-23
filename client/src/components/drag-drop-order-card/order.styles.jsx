import styled, { keyframes } from "styled-components";
import { makeStyles, createStyles } from "@material-ui/core/styles";

export const CardContainer = styled.div`
  /* left: 50px; */
  margin: 10px;
  position: relative;
  width: 290px;
  height: ${(props) => props.theme.height};
  background: linear-gradient(to right, #ea3839, #414146);
  border-radius: 10px;
  /* border: ${(props) =>
    props.isDragging ? "3px solid #fa4700" : "unset"}; */
  @media screen and (max-width: 1150px) {
    //THIS
    background: linear-gradient(to bottom, #ea3839, #414146);
    font-size: 15px;
    width: 150px;
    height: 180px;
  }
`;
export const OrderDetailContainer = styled.div`
  padding-left: 10px;
  display: inline-block;
  position: absolute;
  bottom: 0px;

  @media screen and (max-width: 1150px) {
    //THIS
    bottom: 5px;
    display: unset;
  }
`;
export const WhiteSideBarContainer = styled.div`
  height: ${(props) => props.theme.height};
  width: 80px;

  background-color: white;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center;

  //draggable color
  /* border: 3px solid ; */
  @media screen and (max-width: 1150px) {
    //THIS
    justify-content: center;
    position: relative;
    top: 0;
    display: flex;

    border-bottom-right-radius: unset;
    border-top-left-radius: 10px;
    width: 150px;
    height: 60px;
    background-color: unset;
    justify-content: unset;
    align-items: unset;
  }
`;
export const IconSpace = styled.div`
  margin-left: 30px;
  word-wrap: wrap;
  width: 160px;
  font-size: ${(props) => (props.address ? "11px" : "unset")};
  @media screen and (max-width: 1150px) {
    width: 100px;
  }
`;

export const OrderNumberContainer = styled.div`
  text-align: center;
  @media screen and (max-width: 1150px) {
    //THIS
    border-top-left-radius: 10px;
    display: flex;
    text-align: center;
    width: 150px;

    /* background-color: cyan; */
    border-top-right-radius: 10px;
  }
`;
export const OrderTitle = styled.div`
  color: #5e5555;

  font-weight: 500;
  @media screen and (max-width: 1150px) {
    display: none;
    align-items: center;
    justify-content: center;
    flex: 10%;
    color: white;
  }
`;
export const OrderNumber = styled.div`
  color: #383131;
  margin-top: 0px;
  font-weight: 900;
  font-size: 30px;
  @media screen and (max-width: 1150px) {
    display: none;
  }
`;

export const animationName = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;
export const XMarkContainer = styled.div`
  animation: ${animationName} ease 1s;
  @media screen and (max-width: 1150px) {
    border-top-right-radius: 10px;
    display: block;
    background-color: white;
    flex: 10%;
    text-align: right;
    padding: 10px;
    clip-path: polygon(42% 0, 100% 0, 100% 100%);
  }
`;

export const useIconStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      bottom: "0",

      [theme.breakpoints.down("md")]: {
        fontSize: `20px`,
      },
    },
  })
);
export const useIconAddressStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "0",

      [theme.breakpoints.down("md")]: {
        fontSize: `20px`,
      },
    },
  })
);

export const IconContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => (props.title ? "15px" : "13px")};
  &:nth-child(1) {
    display: none;
    @media screen and (max-width: 1150px) {
      display: block;
      font-weight: 600;
      font-size: 16px;
    }
  }
  @media screen and (max-width: 1150px) {
    margin-bottom: ${(props) => (props.title ? "15px" : "0px")};
  }
`;
