import { TypeGenerationOptions, TypeTeams } from "./types";

export interface ITeamDetail {
  teams: TypeTeams[];
  options: TypeGenerationOptions;
}

export interface IGenerationData {
  [key: string]: string;
}