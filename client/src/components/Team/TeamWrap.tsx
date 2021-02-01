import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const StyleTeamWrap = styled.div`
  min-height: 5rem;
  width: 100%;
  height: auto;
  & + & {
    margin-top: 3rem;
  }
`;

type props = {
  children: ReactElement | ReactElement[];
};

const TeamWrap: FC<props> = ({ children }) => {
  return <StyleTeamWrap>{children}</StyleTeamWrap>;
};

export default React.memo(TeamWrap);
