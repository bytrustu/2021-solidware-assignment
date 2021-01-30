import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyleMainTitle = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 0 60px;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 61px;
    height: 61px;
  }
  &:before {
    top: -4px;
    left: -4px;
    border-top: 6px solid #357dde;
    border-left: 6px solid #357dde;
    z-index: 5;
  }

  &:after {
    bottom: -4px;
    right: -4px;
    border-bottom: 6px solid #357dde;
    border-right: 6px solid #357dde;
  }
`;

const StyleTitleText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 1.5rem;
`;

type TypeMainTitle = {
  title: string;
}

const MainTitle:FC<TypeMainTitle> = ({ title }) => {
  return (
    <StyleMainTitle>
      <Image src="/images/lunch.svg" width={48} height={48} alt="타이틀이미지"/>
      <StyleTitleText>{title}</StyleTitleText>
    </StyleMainTitle>
  );
};

export default MainTitle;
