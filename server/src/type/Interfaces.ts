export interface IUserName {
  name: string;
}

export type IUserId = {
  user_id: number;
}

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
  teamData: TTeamData
}

export type TTeamData = Array<number[][]>

export interface IRequestDetail {
  generate_id: number
}

export interface ITeamAndUser {
  team_id: number,
  team_step: number,
  team_name: number,
  name: string,
  disabled: number,
}

export type IResultTeam = Array<Array<IGroupUser[]>>