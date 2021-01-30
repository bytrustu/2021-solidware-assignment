import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';

const StyleContentGroupInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 13rem);
  padding-top: .5rem;
`;

interface Props {
  children: ReactElement | ReactElement[];
}

const ContentGroupInputGroup:FC<Props> = ({ children }) => {
  return (
    <StyleContentGroupInputGroup>
      {children}
    </StyleContentGroupInputGroup>
  );
};

export default React.memo(ContentGroupInputGroup);
