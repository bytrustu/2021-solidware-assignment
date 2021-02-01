import React, { FC } from "react";
import styled from "styled-components";

const StyleLine = styled.section`
  width: 65vw;
  background-color: #dcdcdc;
  height: 1px;
`;

const Line: FC = () => {
  return <StyleLine />;
};

export default React.memo(Line);
