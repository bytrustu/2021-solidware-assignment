import React, { FC } from "react";
import styled from "styled-components";

const StyleHeader = styled.header`
  height: 3.5rem;
  width: 100%;
  background: #f1f3f5;
`;

const Header: FC = () => {
  return <StyleHeader />;
};

export default React.memo(Header);
