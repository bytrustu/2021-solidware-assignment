import React, { FC } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

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
  margin-bottom: 0.5rem;
`;

const StyleStepIndex = styled.em`
  display: block;
  width: 100%;
  margin-right: 10px;
  margin-bottom: 0.5rem;
  font-weight: 900;
  color: #367dde;
  vertical-align: middle;
  font-size: 14px;
`;

const StyleStepName = styled.span`
  margin-left: 0.8rem;
  display: inline-block;
  vertical-align: middle;
  letter-spacing: 1px;
  font-weight: 500;
  color: #222;
  font-size: 12px;
  &:hover {
    color: #222;
  }
`;

export interface IGenerationData {
  [key: string]: string;
}

type Props = {
  title: string;
  generationData: IGenerationData[] | null;
};

const GenerationList: FC<Props> = ({ title, generationData }) => {
  return (
    <StyleGenerationList>
      <StyleTitle>{title}</StyleTitle>
      {generationData ? (
        generationData &&
        generationData.map((item: IGenerationData, index: number) => (
          <StyleStepWrap key={item.name}>
            <StyleStepIndex>{item.generation_id}회차</StyleStepIndex>
            <StyleStepName>
              인원: {item.generation_users}, 팀 수: {item.generation_group},
              최소 인원: {item.generation_limit}
            </StyleStepName>
          </StyleStepWrap>
        ))
      ) : (
        <Skeleton
          count={10}
          width={200}
          height={30}
          style={{ lineHeight: 4 }}
        />
      )}
    </StyleGenerationList>
  );
};

export default GenerationList;
