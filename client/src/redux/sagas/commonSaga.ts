import { all, fork, put, call } from "redux-saga/effects";
import * as Eff from "redux-saga/effects";

const takeLatest: any = Eff.takeLatest;

import axios from "axios";
import {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  LOAD_USER_LIST_REQUEST,
  LOAD_USER_LIST_SUCCESS,
  LOAD_USER_LIST_FAILURE,
  LOAD_TEAM_LIST_REQUEST,
  LOAD_TEAM_LIST_SUCCESS,
  LOAD_TEAM_LIST_FAILURE,
  GENERATE_TEAM_REQUEST,
  GENERATE_TEAM_SUCCESS,
  GENERATE_TEAM_FAILURE,
  DETAIL_TEAM_REQUEST,
  DETAIL_TEAM_SUCCESS,
  DETAIL_TEAM_FAILURE,
} from "../types";

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

// Register User
function registerUserAPI(userName: string) {
  return axios.post(`/user/add`, { name: userName });
}

function* registerUser(action: { data: string }) {
  try {
    const result = yield call(registerUserAPI, action.data);
    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REGISTER_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchRegisterUser() {
  yield takeLatest(REGISTER_USER_REQUEST, registerUser);
}

// Load User List
export function loadUserListAPI() {
  return axios.get(`/user/list`);
}

export function* loadUserList() {
  try {
    const result = yield call(loadUserListAPI);
    yield sleep(0.5);
    yield put({
      type: LOAD_USER_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_USER_LIST_FAILURE,
      error: e.response,
    });
  }
}

function* watchLoadUserList() {
  yield takeLatest(LOAD_USER_LIST_REQUEST, loadUserList);
}

// Delete User
function deleteUserAPI(userIndex: number) {
  return axios.post(`/user/delete`, { user_id: userIndex });
}

function* deleteUser(action: { data: number }) {
  try {
    const result = yield call(deleteUserAPI, action.data);
    yield put({
      type: DELETE_USER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DELETE_USER_FAILURE,
      error: e.response,
    });
  }
}

function* watchDeleteUser() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUser);
}

// Load Team List
function loadTeamListAPI(data: { page: number }) {
  return axios.post(`/team/list`, data);
}

function* loadTeamList(action: { data: number }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(loadTeamListAPI, action.data);
    yield sleep(0.5);
    yield put({
      type: LOAD_TEAM_LIST_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOAD_TEAM_LIST_FAILURE,
      error: e.response,
    });
  }
}

function* watchLoadTeamList() {
  yield takeLatest(LOAD_TEAM_LIST_REQUEST, loadTeamList);
}

// Generate Team
function generateTeamAPI(data: { teamCount: number; minUserCount: number }) {
  return axios.post(`/team/generate`, data);
}

function* generateTeam(action: { data: number }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(generateTeamAPI, action.data);
    yield sleep(1);
    yield put({
      type: GENERATE_TEAM_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: GENERATE_TEAM_FAILURE,
      error: e.response,
    });
  }
}

function* watchGenerateTeam() {
  yield takeLatest(GENERATE_TEAM_REQUEST, generateTeam);
}

// Detail Team
function detailTeamAPI(data: number) {
  return axios.get(`/team/detail/${data}`);
}

function* detailTeam(action: { data: number }) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = yield call(detailTeamAPI, action.data);
    yield sleep(2);
    yield put({
      type: DETAIL_TEAM_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: DETAIL_TEAM_FAILURE,
      error: e.response,
    });
  }
}

function* watchDetailTeam() {
  yield takeLatest(DETAIL_TEAM_REQUEST, detailTeam);
}

export default function* companySaga() {
  yield all([
    fork(watchRegisterUser),
    fork(watchLoadUserList),
    fork(watchDeleteUser),
    fork(watchLoadTeamList),
    fork(watchGenerateTeam),
    fork(watchDetailTeam),
  ]);
}
