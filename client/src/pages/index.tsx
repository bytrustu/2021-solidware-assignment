import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import { message } from "antd";
import {
  loadUserListAction,
  registerUserAction,
  deleteUserAction,
  generateTeamAction,
  TStateObj,
  clearStateObj,
  loadTeamListAction,
} from "../redux/reducers/commonReducer";
import MainTitle from "../components/MainTitle/MainTitle";
import ContentWrap from "../components/MainContent/ContentWrap";
import MainContent from "../components/MainContent/MainContent";
import AsideList from "../components/AsideList/AsideList";
import GenerationList, {
  IGenerationData,
} from "../components/AsideList/GenerationList";
import ContentGroup from "../components/ContentGroup/ContentGroup";
import ContentGroupInputGroup from "../components/ContentGroup/ContentGroupInputGroup";
import ContentGroupInput from "../components/ContentGroup/ContentGroupInput";
import InputText from "../components/Input/InputText";
import Button from "../components/Input/Button";
import Line from "../components/ContentGroup/Line";
import useInput from "../hooks/useInput";
import InputNumber from "../components/Input/InputNumber";
import UserWrap from "../components/User/UserWrap";
import User from "../components/User/User";
import { RootState } from "../redux/reducers";
import {
  CLEAR_STATE_OBJECT,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  GENERATE_TEAM_FAILURE,
  GENERATE_TEAM_REQUEST,
  GENERATE_TEAM_SUCCESS,
  LOAD_TEAM_LIST_REQUEST,
  LOAD_USER_LIST_FAILURE,
  LOAD_USER_LIST_REQUEST,
  LOAD_USER_LIST_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../redux/types";
import Skeleton from "react-loading-skeleton";

type TypeFormState = {
  name: string;
  limitUser: number;
  groupCount: number;
};

type TypeUser = {
  user_id: number;
  name: string;
};

type TypeCommonState = {
  userList: TypeUser[];
  teamList: IGenerationData[];
  success: TStateObj;
  loading: TStateObj;
  error: TStateObj;
};

const MIN = 2;
const MAX = 10;

const IndexPage = () => {
  const dispatch = useDispatch();
  const {
    userList,
    teamList,
    success,
    loading,
    error,
  }: TypeCommonState = useSelector((state: RootState) => state.common);

  const [name, onChangeName, , resetName] = useInput("");
  const [group, onChangeGroup, , resetGroup] = useInput(2);
  const [limit, onChangeLimit, , resetLimit] = useInput(1);

  const onClickRegisterUserHandle = (): void => {
    dispatch(registerUserAction(name));
    resetName();
  };

  const onClickProcessGroupHanlde = (): void => {
    dispatch(generateTeamAction({ teamCount: group, minUserCount: limit }));
  };

  const onClickRemoveUserHandle = (user_id: number): void => {
    dispatch(deleteUserAction(user_id));
  };

  useEffect(() => {
    if (
      [
        REGISTER_USER_SUCCESS,
        DELETE_USER_SUCCESS,
        GENERATE_TEAM_SUCCESS,
      ].includes(success.type)
    ) {
      dispatch(loadUserListAction());
      message.success(success.msg);
      dispatch(clearStateObj());
    }
    if ([GENERATE_TEAM_SUCCESS].includes(success.type)) {
      dispatch(loadTeamListAction({ page: 1 }));
    }
  }, [success.type]);

  useEffect(() => {
    if (
      [
        LOAD_USER_LIST_FAILURE,
        REGISTER_USER_FAILURE,
        DELETE_USER_FAILURE,
        GENERATE_TEAM_FAILURE,
      ].includes(error.type)
    ) {
      message.error(error.msg);
      dispatch(clearStateObj());
    }
  }, [error.type]);

  return (
    <>
      <MainTitle title="오늘은 누구와 먹을까? 냠냠" />
      <ContentWrap>
        <MainContent>
          <ContentGroup title="인원 추가">
            <ContentGroupInputGroup>
              <ContentGroupInput title="이름 입력">
                <InputText
                  onChange={onChangeName}
                  value={name}
                  maxLength={6}
                  placeholder="이름 입력"
                />
                <Button
                  onClick={onClickRegisterUserHandle}
                  text="추가"
                  disabled={loading.type === REGISTER_USER_REQUEST}
                />
              </ContentGroupInput>
            </ContentGroupInputGroup>
          </ContentGroup>

          <ContentGroup title="그룹 생성">
            <ContentGroupInputGroup>
              <ContentGroupInput title="최소 인원">
                <InputNumber
                  onChange={onChangeLimit}
                  value={limit}
                  placeholder="최소 인원 입력"
                  min={MIN}
                  max={MAX}
                />
              </ContentGroupInput>
              <ContentGroupInput title="그룹 수">
                <InputNumber
                  onChange={onChangeGroup}
                  value={group}
                  placeholder="그룹 수 입력"
                  min={MIN}
                  max={MAX}
                />
                <Button
                  onClick={onClickProcessGroupHanlde}
                  text="생성"
                  disabled={loading.type === GENERATE_TEAM_REQUEST}
                />
              </ContentGroupInput>
            </ContentGroupInputGroup>
          </ContentGroup>

          <Line />

          <ContentGroup title="참가 명단">
            <UserWrap>
              {loading.type === LOAD_USER_LIST_REQUEST &&
              loading.state &&
              !userList ? (
                <Skeleton
                  count={5}
                  width={900}
                  height={30}
                  style={{ lineHeight: 4 }}
                />
              ) : (
                userList &&
                userList.map((el) => (
                  <User
                    key={el.user_id}
                    user_id={el.user_id}
                    name={el.name}
                    onClick={onClickRemoveUserHandle}
                  />
                ))
              )}
            </UserWrap>
          </ContentGroup>
        </MainContent>
        <AsideList>
          <GenerationList
            title="최근 팀 생성 목록"
            generationData={
              loading.type === LOAD_TEAM_LIST_REQUEST && loading.state
                ? null
                : teamList
            }
          />
        </AsideList>
      </ContentWrap>
    </>
  );
};

export default IndexPage;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(loadUserListAction());
    context.store.dispatch(loadTeamListAction({ page: 1 }));
    context.store.dispatch(END);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await context.store.sagaTask.toPromise();
  }
);
