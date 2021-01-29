import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadUserListAction,
  registerUserAction,
  deleteUserAction,
  generateTeamAction,
  detailTeamAction,
} from '../redux/reducers/commonReducer';
import MainTitle from 'src/components/MainTitle/MainTitle';
import ContentWrap from 'src/components/MainContent/ContentWrap';
import MainContent from 'src/components/MainContent/MainContent';
import AsideList from 'src/components/AsideList/AsideList';
import GenerationList from 'src/components/AsideList/GenerationList';

const IndexPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const onChangeName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setName(e.target.value);
  };
  const onClickHandle = () => {
    dispatch(registerUserAction(name));
  };

  const generationData = [{name: '인원: 8, 팀 수: 2, 최소인원: 2'},{name: '인원: 8, 팀 수: 2, 최소인원: 2'},{name: '인원: 8, 팀 수: 2, 최소인원: 2'},{name: '인원: 8, 팀 수: 2, 최소인원: 2'},{name: '인원: 8, 팀 수: 2, 최소인원: 2'}]

  return (
    <>
      <MainTitle title="오늘의 점심 멤버는? 냠냠" />
      <ContentWrap>
        <MainContent>
          <div style={{height: '50rem'}}>1</div>
        </MainContent>
        <AsideList>
          <GenerationList
            title="최근 팀 생성 목록"
            generationData={generationData}
          />
        </AsideList>
      </ContentWrap>
    </>
  );

};

export default IndexPage;