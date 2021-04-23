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
  padding: 10px;
  justify-content: center;
  display: flex;
  animation: ${animationName} ease 3s;
`;

export const ContainerOrder = styled.div`
  height: 100%;
  /* width: 50%; */
  /* margin-left: 2vh; */
`;

export const ContainerDriver = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: fit-content;
  @media screen and (max-width: 1150px) {
    width: 180px;
  }
`;
