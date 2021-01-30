import React, { FC } from 'react';
import styled from 'styled-components';

const StyleButton = styled.button`
  color: #fff;
  background: #357dde;
  border: 1px solid #357dde;
  cursor: pointer;
  height: 2.5rem;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  padding: 4px 1.2rem;
  font-size: 14px;
  border-radius: 2px;
  &:focus {
    outline: unset;
  }
`;

const StyleButtonText = styled.span`
  color: #FFF;
  font-size: 14px;
`;

interface Props {
  text: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <StyleButton onClick={onClick}>
      <StyleButtonText>{text}</StyleButtonText>
    </StyleButton>
  );
};

export default React.memo(Button);
