export interface IUserName {
  name: string;
}

export type IUserId = {
  user_id: number;
};

export interface IUserData {
  user_id: number;
  name: string;
}

export interface IGroupUser {
  name: string;
  disabled: number;
}

export interface ITeamFilter {
  minUserCount: number;
  teamCount: number;
}

export interface ITeamData {
  teams: TTeamData;
}

export type TTeamData = {
  teams: Array<number[][]>;
  teamCase: Array<number[]> | string;
  users?: number;
};

export interface IRequestDetail {
  generate_id: number;
}

export interface IGenerationData {
  generation_id: number;
  generation_users: number;
  generation_limit: number;
  generation_group: number;
  generation_case?: any;
}

export interface ITeamAndUser {
  team_id: number;
  team_step: number;
  team_name: number;
  name: string;
  disabled: number;
}

export type IResultTeam = Array<Array<IGroupUser[]>>;
