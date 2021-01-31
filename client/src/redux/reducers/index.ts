import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import common, { TCommonReducerState } from "../reducers/commonReducer";

export interface IReducerState {
  user: TCommonReducerState;
}

const rootReducer = (state: any = {}, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        common,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
