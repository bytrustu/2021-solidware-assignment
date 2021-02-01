import React, { FC } from "react";
import styled from "styled-components";

const StyleTeamTitle = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #000;
  border-bottom: 5px solid #ddd;
  padding: 0.5rem;
`;

type props = {
  title: string;
};

const TeamTitle: FC<props> = ({ title }) => {
  return <StyleTeamTitle>{title}</StyleTeamTitle>;
};

export default React.memo(TeamTitle);
