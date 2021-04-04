import styled, { keyframes } from "styled-components";

export const animationName = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

export const Container = styled.div`
  width: 70%;
  margin: auto;
  justify-content: center;
  display: flex;
  animation: ${animationName} ease 3s;
`;

export const ContainerOrder = styled.div`
  height: 100%;
  width: 50%;
  margin: 1vh;
`;

export const ContainerDriver = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 1vh;
`;
