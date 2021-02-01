import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const StyleMainContent = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
`;

type TypeMainContent = {
  children: ReactElement | ReactElement[];
};

const MainContent: FC<TypeMainContent> = ({ children }) => {
  return <StyleMainContent>{children}</StyleMainContent>;
};

export default React.memo(MainContent);
