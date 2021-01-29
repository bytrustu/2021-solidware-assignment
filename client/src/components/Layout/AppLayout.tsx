import React, { FC, ReactElement } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import Aside from 'src/components/Layout/Aside';

interface Props {
  children: ReactElement;
}

const StyleAppLayout = styled.div`
  max-height: 100vh;
  overflow: hidden;
`

const StyleBody = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyleContent = styled.section`
  width: calc(100% - 7rem);
  padding: 3rem 5rem;
`

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <StyleAppLayout>
      <Header />
      <StyleBody>
        <Aside/>
        <StyleContent>
          {children}
        </StyleContent>
        <Aside/>
      </StyleBody>
      <Footer />
    </StyleAppLayout>
  )
    ;
};

export default AppLayout;
