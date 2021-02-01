import { shuffleArray } from "../util/index";
import { IUserId } from "../type/Interfaces";

type TypeSplitTeamCase = (
  userLength: number,
  group: number,
  limit: number
) => number[][];

const splitTeamCase: TypeSplitTeamCase = (userLength, group, limit) => {
  if (group == 1) {
    return [[userLength]];
  }
  const teamArray = [];
  for (let i: number = limit; i <= userLength - (group - 1) * limit; i++) {
    const remainArray = splitTeamCase(userLength - i, group - 1, limit);
    teamArray.push(...remainArray.map((el) => [i, ...el]));
  }
  return teamArray;
};

export const generateTeam = (
  users: IUserId[],
  group: number,
  limit: number
) => {
  const userLength: number = users.length;
  const teamCase: number[][] = splitTeamCase(userLength, group, limit);
  const teams: any[][] = [];
  teamCase.forEach((team, index) => {
    const shuffleUsers = shuffleArray([...users]);
    teams.push([]);
    team.forEach((el: number) => {
      teams[index].push(shuffleUsers.splice(0, el));
    });
  });
  return {
    teams,
    teamCase,
  };
};
