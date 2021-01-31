import produce, { Draft } from "immer";
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
  CLEAR_STATE_OBJECT,
} from "../types";
import { loadUserList, loadUserListAPI } from "../sagas/commonSaga";

export type TStateObj = {
  type: string;
  state: boolean;
  msg: string;
};

const stateObj: TStateObj = {
  type: "",
  state: false,
  msg: "",
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

export const loadTeamListAction = (data: { page: number }) => ({
  type: LOAD_TEAM_LIST_REQUEST,
  data,
});

export const generateTeamAction = (data: { [k: string]: number }) => ({
  type: GENERATE_TEAM_REQUEST,
  data,
});

export const detailTeamAction = (generateIndex: number) => ({
  type: GENERATE_TEAM_REQUEST,
  data: generateIndex,
});

export const clearStateObj = () => ({
  type: CLEAR_STATE_OBJECT,
});

export type CommonAction =
  | ReturnType<typeof registerUserAction>
  | ReturnType<typeof loadUserListAction>
  | ReturnType<typeof deleteUserAction>
  | ReturnType<typeof generateTeamAction>
  | ReturnType<typeof detailTeamAction>;

export type TCommonReducerState = typeof initialState;

export default (state: TCommonReducerState = initialState, action: any) => {
  return produce(state, (draft: Draft<TCommonReducerState>) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST: {
        draft.loading = { type: REGISTER_USER_REQUEST, state: true, msg: "" };
        draft.error = { type: "", state: false, msg: "" };
        break;
      }
      case REGISTER_USER_SUCCESS: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.success = {
          type: REGISTER_USER_SUCCESS,
          state: true,
          msg: action.payload.msg,
        };
        break;
      }
      case REGISTER_USER_FAILURE: {
        console.log(action.error);
        draft.loading = { type: "", state: false, msg: "" };
        draft.error = {
          type: REGISTER_USER_FAILURE,
          state: true,
          msg: action.error.data.msg,
        };
        break;
      }

      case DELETE_USER_REQUEST: {
        draft.loading = { type: DELETE_USER_REQUEST, state: true, msg: "" };
        draft.error = { type: "", state: false, msg: "" };
        break;
      }
      case DELETE_USER_SUCCESS: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.success = {
          type: DELETE_USER_SUCCESS,
          state: true,
          msg: action.payload.msg,
        };
        draft.userList = action.payload;
        break;
      }
      case DELETE_USER_FAILURE: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.error = {
          type: DELETE_USER_FAILURE,
          state: true,
          msg: action.error.data.msg,
        };
        break;
      }

      case LOAD_USER_LIST_REQUEST: {
        draft.loading = { type: LOAD_USER_LIST_REQUEST, state: true, msg: "" };
        draft.error = { type: "", state: false, msg: "" };
        break;
      }
      case LOAD_USER_LIST_SUCCESS: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.success = { type: LOAD_USER_LIST_SUCCESS, state: true, msg: "" };
        draft.userList = action.payload;
        break;
      }
      case LOAD_USER_LIST_FAILURE: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.error = {
          type: LOAD_USER_LIST_FAILURE,
          state: true,
          msg: action.error.data.msg,
        };
        break;
      }

      case LOAD_TEAM_LIST_REQUEST: {
        draft.loading = { type: LOAD_TEAM_LIST_REQUEST, state: true, msg: "" };
        draft.error = { type: "", state: false, msg: "" };
        break;
      }
      case LOAD_TEAM_LIST_SUCCESS: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.success = { type: LOAD_TEAM_LIST_SUCCESS, state: true, msg: "" };
        draft.teamList = action.payload;
        break;
      }
      case LOAD_TEAM_LIST_FAILURE: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.error = {
          type: LOAD_TEAM_LIST_FAILURE,
          state: true,
          msg: action.error.data.msg,
        };
        break;
      }

      case GENERATE_TEAM_REQUEST: {
        draft.loading = { type: GENERATE_TEAM_REQUEST, state: true, msg: "" };
        draft.error = { type: "", state: false, msg: "" };
        break;
      }
      case GENERATE_TEAM_SUCCESS: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.success = {
          type: GENERATE_TEAM_SUCCESS,
          state: true,
          msg: action.payload.msg,
        };
        draft.teamDetail = action.payload;
        break;
      }
      case GENERATE_TEAM_FAILURE: {
        draft.loading = { type: "", state: false, msg: "" };
        draft.error = {
          type: GENERATE_TEAM_FAILURE,
          state: true,
          msg: action.error.data.msg,
        };
        break;
      }

      case CLEAR_STATE_OBJECT: {
        draft.loading = stateObj;
        draft.success = stateObj;
        draft.error = stateObj;
        break;
      }

      default: {
        break;
      }
    }
  });
};
