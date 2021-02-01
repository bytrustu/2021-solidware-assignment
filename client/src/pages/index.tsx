import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import { message } from "antd";
import {
  loadUserListAction,
  registerUserAction,
  deleteUserAction,
  generateTeamAction,
  clearStateObj,
  loadTeamListAction,
  detailTeamAction,
} from "../redux/reducers/commonReducer";
import MainTitle from "../components/MainTitle/MainTitle";
import ContentWrap from "../components/MainContent/ContentWrap";
import MainContent from "../components/MainContent/MainContent";
import AsideList from "../components/AsideList/AsideList";
import GenerationList from "../components/AsideList/GenerationList";
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
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DETAIL_TEAM_REQUEST,
  DETAIL_TEAM_SUCCESS,
  GENERATE_TEAM_FAILURE,
  GENERATE_TEAM_REQUEST,
  GENERATE_TEAM_SUCCESS,
  LOAD_TEAM_LIST_REQUEST,
  LOAD_USER_LIST_FAILURE,
  LOAD_USER_LIST_REQUEST,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../redux/types";
import { TypeCommonState } from "../type/types";
import Skeleton from "react-loading-skeleton";
import TeamPagination from "../components/Pagination/TeamPagination";
import Loading from "../components/Loading/Loading";
import TeamModal from "../components/Modal/TeamModal";

const MIN = 2;
const MAX = 10;

const IndexPage = () => {
  const dispatch = useDispatch();
  const {
    userList,
    teamList,
    teamListState,
    teamDetail,
    generate_id,
    success,
    loading,
    error,
  }: TypeCommonState = useSelector((state: RootState) => state.common);

  const [name, onChangeName, , resetName] = useInput("");
  const [group, onChangeGroup] = useInput(2);
  const [limit, onChangeLimit] = useInput(1);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const nameRef = useRef<HTMLElement>();

  const onClickRegisterUserHandle = useCallback((): void => {
    dispatch(registerUserAction(name));
    resetName();
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [name]);

  const onClickProcessGroupHanlde = useCallback((): void => {
    dispatch(generateTeamAction({ teamCount: group, minUserCount: limit }));
  }, [group, limit]);

  const onClickRemoveUserHandle = useCallback((user_id: number): void => {
    dispatch(deleteUserAction(user_id));
  }, []);

  const onClickPrevHandle = useCallback((): void => {
    teamListState &&
      dispatch(loadTeamListAction({ page: teamListState.currentPage - 1 }));
  }, [teamListState]);

  const onClickNextHandle = useCallback((): void => {
    teamListState &&
      dispatch(loadTeamListAction({ page: teamListState.currentPage + 1 }));
  }, [teamListState]);

  const onClickModalCloseHandle = useCallback((): void => {
    setVisibleModal(false);
  }, []);

  const onClickLoadDetailTeamHandle = useCallback(
    (generate_id: number): void => {
      dispatch(detailTeamAction(generate_id));
    },
    []
  );

  useEffect(() => {
    if (loading.type === GENERATE_TEAM_REQUEST) {
      setLoadingText("팀 생성 중");
    }
    if (loading.type === DETAIL_TEAM_REQUEST) {
      setLoadingText("팀 정보 로드 중");
    }
  }, [loading.type]);

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
    }

    if ([GENERATE_TEAM_SUCCESS].includes(success.type)) {
      dispatch(loadTeamListAction({ page: 1 }));
      if (generate_id) {
        dispatch(detailTeamAction(generate_id));
      } else {
        message.error("팀 정보 호출에 실패 했습니다.");
      }
    }

    if ([DETAIL_TEAM_SUCCESS].includes(success.type)) {
      setVisibleModal(true);
      dispatch(clearStateObj());
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
    }
  }, [error.type]);

  return (
    <>
      {[GENERATE_TEAM_REQUEST, DETAIL_TEAM_REQUEST].includes(loading.type) && (
        <Loading loadingText={loadingText} />
      )}
      <TeamModal
        visible={visibleModal}
        onClose={onClickModalCloseHandle}
        users={teamDetail?.options?.users}
        limit={teamDetail?.options?.limit}
        group={teamDetail?.options?.group}
        teamCase={teamDetail?.options?.teamCase}
        teams={teamDetail?.teams}
      />
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
                  inputRef={nameRef}
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
              {loading.type === LOAD_USER_LIST_REQUEST ? (
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
            onClickHandle={onClickLoadDetailTeamHandle}
          >
            <TeamPagination
              currentPage={teamListState.currentPage}
              maxPage={teamListState.maxPage}
              onClickPrevHandle={onClickPrevHandle}
              onClickNextHandle={onClickNextHandle}
            />
          </GenerationList>
        </AsideList>
      </ContentWrap>
    </>
  );
};

export default IndexPage;

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const store: any = context.store;
    store.dispatch(loadUserListAction());
    store.dispatch(loadTeamListAction({ page: 1 }));
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);
