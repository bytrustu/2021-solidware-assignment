import React, { FC, ReactElement } from "react";
import styled from "styled-components";

const StyleContentGroup = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  margin-left: 3rem;
  padding: 0 0 2rem;
`;

const StyleContentGroupTitle = styled.h4`
  width: 13rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

interface Props {
  title: string;
  children: ReactElement;
}

const ContentGroup: FC<Props> = ({ title = "", children }) => {
  return (
    <StyleContentGroup>
      <StyleContentGroupTitle>{title}</StyleContentGroupTitle>
      {children}
    </StyleContentGroup>
  );
};

export default React.memo(ContentGroup);
