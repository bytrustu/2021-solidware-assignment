import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const StyleContent = styled.section`
  overflow-y: scroll;
  height: calc(100vh - 7rem);
`;

interface Props {
  children: ReactElement;
}

const Content: FC<Props> = ({ children }) => {
  return <StyleContent>{children}</StyleContent>;
};

export default React.memo(Content);
