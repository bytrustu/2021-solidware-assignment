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
import ContentGroup from 'src/components/ContentGroup/ContentGroup';
import ContentGroupInputGroup from 'src/components/ContentGroup/ContentGroupInputGroup';
import ContentGroupInput from 'src/components/ContentGroup/ContentGroupInput';
import InputText from 'src/components/Input/InputText';
import Button from 'src/components/Input/Button';
import Line from 'src/components/ContentGroup/Line';
import useInputs from 'src/hooks/useInput';
import useInput from 'src/hooks/useInput';
import InputNumber from 'src/components/Input/InputNumber';
import UserWrap from 'src/components/User/UserWrap';
import User from 'src/components/User/User';

type TypeFormState = {
  name: string,
  limitUser: number,
  groupCount: number,
}

type TypeUser = {
  user_id: number,
  name: string,
}

const IndexPage = () => {
  const dispatch = useDispatch();

  const [name, onChangeName, setName, resetName] = useInput('');
  const [limit, onChangeLimit, setLimit, resetLimit] = useInput(1);
  const [group, onChangeGroup, setGroup, resetGroup] = useInput(2);
  const [userList, setUserList] = useState<TypeUser[]>([
    { user_id: 1, name: '호랑이' },
    { user_id: 2, name: '사자' },
    { user_id: 3, name: '강아지' },
    { user_id: 4, name: '고양이' },
    { user_id: 5, name: '원숭이' },
    { user_id: 6, name: '독수리' },
    { user_id: 7, name: '하마' },
    { user_id: 8, name: '다람쥐' },
  ]);

  console.log(userList);
  const onClickRegisterUserHandle = (): void => {
    dispatch(registerUserAction(name));
    resetName();
  };

  const onClickProcessGroupHanlde = (): void => {
    resetLimit();
    resetGroup();
  };

  const onClickRemoveUserHandle = (name: string): void => {
    setUserList([
      ...userList.filter(el => el.name !== name),
    ]);
  };

  const generationData = [{ name: '인원: 8, 팀 수: 2, 최소인원: 2' }, { name: '인원: 8, 팀 수: 2, 최소인원: 2' }, { name: '인원: 8, 팀 수: 2, 최소인원: 2' }, { name: '인원: 8, 팀 수: 2, 최소인원: 2' }, { name: '인원: 8, 팀 수: 2, 최소인원: 2' }];

  return (
    <>
      <MainTitle title="오늘은 누구와 먹을까? 냠냠" />
      <ContentWrap>
        <MainContent>

          <ContentGroup title="인원 추가">
            <ContentGroupInputGroup>
              <ContentGroupInput title="이름 입력">
                <InputText onChange={onChangeName} value={name} maxLength={6} placeholder="이름 입력" />
                <Button onClick={onClickRegisterUserHandle} text="추가" />
              </ContentGroupInput>
            </ContentGroupInputGroup>
          </ContentGroup>

          <ContentGroup title="그룹 생성">
            <ContentGroupInputGroup>
              <ContentGroupInput title="최소 인원">
                <InputNumber onChange={onChangeLimit} value={limit} placeholder="최소 인원 입력" min={1} max={10} />
              </ContentGroupInput>
              <ContentGroupInput title="그룹 수">
                <InputNumber onChange={onChangeGroup} value={group} placeholder="그룹 수 입력" min={2} max={10} />
                <Button onClick={onClickProcessGroupHanlde} text="생성" />
              </ContentGroupInput>
            </ContentGroupInputGroup>
          </ContentGroup>

          <Line />

          <ContentGroup title={`참가 명단 (${userList.length})`}>
            <UserWrap>
              {
                userList.map((el) => <User key={el.user_id} name={el.name} onClick={onClickRemoveUserHandle} />)
              }
            </UserWrap>
          </ContentGroup>

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