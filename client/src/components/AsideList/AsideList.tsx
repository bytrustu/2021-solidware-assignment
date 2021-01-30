import React, { FC } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyleAsideList = styled.aside`
  width: 270px;
  height: auto;
  position: relative;
`;

const AsideList:FC = ({ children }) => {
  return (
    <StyleAsideList>
      {children}
    </StyleAsideList>
  );
};

export default AsideList;
