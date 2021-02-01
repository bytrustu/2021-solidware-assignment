import React, { FC } from "react";
import styled from "styled-components";

const StyleUser = styled.div`
  text-align: center;
  width: 7rem;
  max-height: 3rem;
  margin: 0.5rem;
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
  user_id: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClick?: any;
};

const User: FC<props> = ({ name, user_id, onClick }) => {
  return (
    <StyleUser
      onClick={() => {
        onClick && onClick(user_id);
      }}
    >
      {name}
    </StyleUser>
  );
};

export default React.memo(User);
