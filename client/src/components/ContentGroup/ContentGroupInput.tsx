import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyleContentGroupInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: .5rem 0;
`;

const StyleContentGroupInputTitle = styled.h5`
  font-size: 1rem;
  font-weight: 500;
  margin-right: 3rem;
  margin-bottom: 0;
  width: 60px;
`

interface Props {
  title: string,
  children: ReactElement | ReactElement[];
}

const ContentGroupInput: FC<Props> = ({ title = '', children }) => {
  return (
    <StyleContentGroupInput>
      <StyleContentGroupInputTitle>
        {title}
      </StyleContentGroupInputTitle>
      {children}
    </StyleContentGroupInput>
  );
};

export default React.memo(ContentGroupInput);
