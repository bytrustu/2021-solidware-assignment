import React, { FC } from "react";
import styled from "styled-components";
import { range } from "../../util";

const StyleBlockPage = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #00000042;
  z-index: 9999;
  left: 0;
  top: 0;
`;

const StyleLoadingWrap = styled.div`
  width: 250px;
  height: 250px;
  animation: sk-chase 5s infinite linear both;
  z-index: 10000;
  position: absolute;
  left: calc(50% - 125px);
  top: calc(45% - 125px);
`;

const StyleLoadingText = styled.p`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

const StyledLoaderElement = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;

  &:before {
    content: "";
    display: block;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
  }

  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }

  &:nth-child(1) {
    animation-delay: -1.1s;
  }

  &:nth-child(2) {
    animation-delay: -1s;
  }

  &:nth-child(3) {
    animation-delay: -0.9s;
  }

  &:nth-child(4) {
    animation-delay: -0.8s;
  }

  &:nth-child(5) {
    animation-delay: -0.7s;
  }

  &:nth-child(6) {
    animation-delay: -0.6s;
  }

  :nth-child(1):before {
    animation-delay: -1.1s;
  }

  &:nth-child(2):before {
    animation-delay: -1s;
  }

  &:nth-child(3):before {
    animation-delay: -0.9s;
  }

  &:nth-child(4):before {
    animation-delay: -0.8s;
  }

  &:nth-child(5):before {
    animation-delay: -0.7s;
  }

  &:nth-child(6):before {
    animation-delay: -0.6s;
  }
`;

type TypeMainTitle = {
  loadingText: string;
};

const Loading: FC<TypeMainTitle> = ({ loadingText }) => {
  const arr: number[] = range(20, 1);
  return (
    <StyleBlockPage>
      <StyleLoadingText>
        {loadingText}
      </StyleLoadingText>
      <StyleLoadingWrap>
        <StyledLoaderElement />
        <StyledLoaderElement />
        <StyledLoaderElement />
        <StyledLoaderElement />
        <StyledLoaderElement />
        <StyledLoaderElement />
      </StyleLoadingWrap>
    </StyleBlockPage>
  );
};

export default Loading;
