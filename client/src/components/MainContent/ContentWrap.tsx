import React, { FC, ReactElement } from "react";
import styled from "styled-components";

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

type TypeContentWrap = {
  children: ReactElement | ReactElement[];
};

const ContentWrap: FC<TypeContentWrap> = ({ children }) => {
  return <StyleContentWrap>{children}</StyleContentWrap>;
};

export default React.memo(ContentWrap);
