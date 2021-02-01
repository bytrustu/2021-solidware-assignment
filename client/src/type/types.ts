import { IGenerationData, ITeamDetail } from "./interfaces";

export type TypeTeams = {
  [k: string]: string | number | undefined;
};

export type TypeGenerationOptions = {
  users?: number | undefined;
  group?: number | undefined;
  limit?: number | undefined;
  teamCase?: number[][][] | undefined;
};

export type TypeUser = {
  user_id: number;
  name: string;
  disabled?: boolean;
};

export type TStateObj = {
  type: string;
  state: boolean;
  msg: string;
};

export type TTeamListState = {
  currentPage: number;
  maxPage: number;
};

export type TypeInitialState = {
  loading: TStateObj;
  error: TStateObj;
  success: TStateObj;
  userList: any[];
  teamList: any[];
  teamListState: TTeamListState;
  teamDetail: any[];
  generate_id: number | null;
};

export type TypeCommonState = {
  userList: TypeUser[];
  teamList: IGenerationData[];
  teamListState: TTeamListState;
  teamDetail: ITeamDetail;
  generate_id: number | null;
  success: TStateObj;
  loading: TStateObj;
  error: TStateObj;
};
