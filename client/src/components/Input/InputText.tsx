import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyleInputText = styled.input`
  height: 2.5rem;
  width: 30rem;
  margin-right: 1rem;
  box-sizing: border-box;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  &:focus {
    outline: unset;
  }
`

interface Props {
  value?: string;
  maxLength?: number;
  onChange?: React.ChangeEventHandler<HTMLElement>;
  placeholder?: string;
}

const InputText: FC<Props> = ({value, maxLength, onChange, placeholder}) => {
  return (
    <StyleInputText type="text" value={value} maxLength={maxLength} onChange={onChange} placeholder={placeholder}/>
  );
};

export default React.memo(InputText);
