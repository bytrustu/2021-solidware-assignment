import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const StyleUserWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  height: 12.5rem;
  width: 73%;
`;

type props = {
  children: ReactElement | ReactElement[];
};

const UserWrap: FC<props> = ({ children }) => {
  return <StyleUserWrap>{children}</StyleUserWrap>;
};

export default UserWrap;
