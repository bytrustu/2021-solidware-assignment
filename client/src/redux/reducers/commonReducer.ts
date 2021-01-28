import produce, { Draft } from 'immer';
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


type TStateObj = {
  state: boolean,
  msg: string
}

const stateObj: TStateObj = {
  state: false,
  msg: '',
};

export const initialState = {
  loading: stateObj,
  error: stateObj,
  success: stateObj,
  userList: [],
  teamList: [],
  teamDetail: [],
};

export const loadUserListAction = () => ({
  type: LOAD_USER_LIST_REQUEST,
});

export const registerUserAction = (userName: string) => ({
  type: REGISTER_USER_REQUEST,
  data: userName,
});

export const deleteUserAction = (userIndex: number) => ({
  type: DELETE_USER_REQUEST,
  data: userIndex,
});

export const generateTeamAction = () => ({
  type: GENERATE_TEAM_REQUEST,
});

export const detailTeamAction = (generateIndex: number) => ({
  type: GENERATE_TEAM_REQUEST,
  data: generateIndex,
});

export type CommonAction =
  | ReturnType<typeof registerUserAction>
  | ReturnType<typeof loadUserListAction>
  | ReturnType<typeof deleteUserAction>
  | ReturnType<typeof generateTeamAction>
  | ReturnType<typeof detailTeamAction>

export type TCommonReducerState = typeof initialState;

export default (state: TCommonReducerState = initialState, action: CommonAction) => {
  return produce(state, (draft: Draft<TCommonReducerState>) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST : {
        draft.loading = { state: true, msg: '유저를 추가 중입니다.' };
        draft.error = { state: false, msg: '' };
        break;
      }
      case REGISTER_USER_SUCCESS: {
        draft.loading = { state: true, msg: '' };
        draft.success = { state: false, msg: '유저를 추가 했습니다.' };
        break;
      }
      case REGISTER_USER_FAILURE: {
        draft.loading = { state: false, msg: '' };
        draft.error = { state: true, msg: '오류가 발생 했습니다.' };
        break;
      }
      default: {
        break;
      }
    }
  });
};

