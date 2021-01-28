import { all, fork, put, call } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects'
const takeLatest: any = Eff.takeLatest;

import axios from 'axios';
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
  GENERATE_TEAM_REQUEST,
  GENERATE_TEAM_SUCCESS,
  GENERATE_TEAM_FAILURE,
  DETAIL_TEAM_REQUEST,
  DETAIL_TEAM_SUCCESS,
  DETAIL_TEAM_FAILURE,
} from '../types';


// Register User
function registerUserAPI(userName: string) {
  return axios.post(`/user/add`, {name: userName});
}
function* registerUser(action: { data: string; }) {
  try {
    const result = yield call(registerUserAPI, action.data);
    yield put({
      type: REGISTER_USER_SUCCESS,
      data: result.data,
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

export default function* companySaga() {
  yield all([
    fork(watchRegisterUser),
  ]);
}