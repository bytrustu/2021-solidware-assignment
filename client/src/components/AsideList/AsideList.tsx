import React, { FC, ReactElement } from 'react';
import styled from "styled-components";

const StyleAsideList = styled.aside`
  width: 270px;
  height: auto;
  position: relative;
`;

type TypeAsideList = {
  children: ReactElement | ReactElement[];
};

const AsideList: FC<TypeAsideList> = ({ children }) => {
  return <StyleAsideList>{children}</StyleAsideList>;
};

export default React.memo(AsideList);
