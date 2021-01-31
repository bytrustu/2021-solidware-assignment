import React, { FC } from "react";
import styled from "styled-components";

const StyleAside = styled.aside`
  width: 3.5rem;
  min-height: calc(100vh - 7rem);
  height: 100%;
  background: #f1f3f5;
`;

const Aside: FC = () => {
  return <StyleAside />;
};

export default Aside;
