import React, { FC } from 'react';
import styled from 'styled-components';

const StyleGenerationList = styled.div`
  width: 100%;
  padding: 40px 30px;
  background-color: #fff;
  min-height: 510px;
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdcdc;
  margin-right: 1rem;
`;

const StyleTitle = styled.h3`
  padding-bottom: 15px;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const StyleStepWrap = styled.div`
  width: 100%;
  padding: 7px 3px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  margin-bottom: .5rem;
`;

const StyleStepIndex = styled.em`
  display: block;
  width: 100%;
  margin-right: 10px;
  margin-bottom: .5rem;
  font-weight: 900;
  color: #367dde;
  vertical-align: middle;
  font-size: 14px;
`

const StyleStepName = styled.span`
  margin-left: .8rem;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: 1px;
  font-weight: 500;
  color: #222;
  font-size: 12px;
  &:hover {
    color: #222;
  }
`

export interface IGenerationData {
  [key: string]: string;
}

type Props = {
  title: string,
  generationData: IGenerationData[] | null,
}

const GenerationList: FC<Props> = ({ title, generationData }) => {
  return (
    <StyleGenerationList>
      <StyleTitle>{title}</StyleTitle>
      {
        generationData && generationData.map((item: IGenerationData, index: number) => (
          <StyleStepWrap key={item.name}>
            <StyleStepIndex>{index + 1}회차</StyleStepIndex>
            <StyleStepName>{item.name}</StyleStepName>
          </StyleStepWrap>
        ))
      }
    </StyleGenerationList>
  );
};

export default GenerationList;
