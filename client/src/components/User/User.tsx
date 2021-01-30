import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyleUser = styled.div`
  text-align: center;
  width: 7rem;
  max-height: 5rem;
  margin: .5rem;
  border: 1px solid #dcdcdc;
  background-color: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type props = {
  name: string;
  onClick?: Function
}

const User:FC<props> = ({ name, onClick }) => {
  console.log(name);
  return (
    <StyleUser onClick={() => {onClick && onClick(name)}}>
      {name}
    </StyleUser>
  );
};

export default User;
