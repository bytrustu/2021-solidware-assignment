import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyleMainContent = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
`;


const MainContent:FC = ({ children }) => {
  return (
    <StyleMainContent>
      {children}
    </StyleMainContent>
  );
};

export default MainContent;
