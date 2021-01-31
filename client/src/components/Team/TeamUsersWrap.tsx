import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyleTeamUsersWrap = styled.div`
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 1rem 2rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 2rem;
  height: fit-content;
  grid-row-gap: 5px;

  & + & {
    margin-top: 1rem;
  }

  .ant-tag {
    text-align: center;
  }
`;

const StyleTeamName = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: .2rem;
  background-color: #ff8e8e;
  left: -.5rem;
  top: -.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #fff;
`;

type props = {
  teamIndex: number;
  children: ReactElement | ReactElement[];
};

const TeamUsersWrap: FC<props> = ({ teamIndex, children }) => {
  return (
    <StyleTeamUsersWrap>
      <StyleTeamName>{teamIndex + 1}</StyleTeamName>
      {children}
    </StyleTeamUsersWrap>
  );
};

export default TeamUsersWrap;
