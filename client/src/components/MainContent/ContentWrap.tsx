import React, { FC } from 'react';
import styled from 'styled-components';

const StyleContentWrap = styled.section`
  width: 100%;
  max-height: calc(100vh - 20.5rem);
  overflow: scroll;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem;
`;


const ContentWrap:FC = ({ children }) => {
  return (
    <StyleContentWrap>
      {children}
    </StyleContentWrap>
  );
};

export default ContentWrap;
