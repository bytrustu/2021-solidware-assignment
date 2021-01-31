export type TypeTeams = {
  [k: string]: string | number | undefined;
};

export type TypeGenerationOptions = {
  users?: number | undefined;
  group?: number | undefined;
  limit?: number | undefined;
  teamCase?: number[][][] | undefined;
};