import * as db from "../config/mysql_connect";
import {
  ITeamData,
  IRequestDetail,
  IUserData,
  IUserId,
  IUserName,
  TTeamData,
  ITeamAndUser,
  ITeamFilter,
  IGenerationData,
} from "../type/Interfaces";

export const userDataList = async (): Promise<IUserData[]> => {
  try {
    const SQL = "select user_id, name from User where disabled = 0";
    const SQL_VALUES: any = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const userIdList = async (): Promise<{ user_id: number }[]> => {
  try {
    const SQL = "select user_id from User where disabled = 0";
    const SQL_VALUES: any = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findUserByUserName = async (
  param: IUserName
): Promise<IUserData[]> => {
  try {
    const { name } = param;
    const SQL = "select * from User where name = ? and disabled = 0";
    const SQL_VALUES: string[] = [name];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const insertUserName = async (param: IUserName): Promise<boolean> => {
  try {
    const { name } = param;
    const SQL = "insert into User(name) values(?)";
    const SQL_VALUES: string[] = [name];
    await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const deleteUserByUserId = async (param: IUserId): Promise<boolean> => {
  try {
    const { user_id } = param;
    const SQL = "update User set disabled = 1 where user_id = ?";
    const SQL_VALUES: number[] = [user_id];
    await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const editUserNameByUserId = async (
  param: IUserData
): Promise<boolean> => {
  try {
    const { user_id, name } = param;
    const SQL = "update User set name = ? where id = ?";
    const SQL_VALUES: (number | string)[] = [user_id, name];
    await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const insertTeam = async (
  param: TTeamData & ITeamFilter
): Promise<number | undefined> => {
  try {
    const { teams, users, minUserCount, teamCount, teamCase } = param;
    let resultRow;
    await db.transaction(async (con: any) => {
      const GENERATION_SQL =
        "insert into Generation(generation_users, generation_limit, generation_group, generation_case) values(?, ?, ?, ?)";
      const GENERATION_SQL_VALUES: any[] = [
        users,
        minUserCount,
        teamCount,
        teamCase,
      ];
      const [generationRow] = await con.query(
        GENERATION_SQL,
        GENERATION_SQL_VALUES
      );
      resultRow = generationRow.insertId;
      let stepCount = 0;
      for (const team of teams) {
        let nameCount = 0;
        for (const step of team) {
          const GROUP_SQL =
            "insert into Team(team_step, team_name, generation_id) values(?, ?, ?)";
          const GROUP_SQL_VALUES: number[] = [
            stepCount,
            nameCount,
            generationRow.insertId,
          ];
          const [teamRow] = await con.query(GROUP_SQL, GROUP_SQL_VALUES);
          nameCount++;
          for (const member of step) {
            const MEMBER_SQL =
              "insert into Member(user_id, team_id) values(?, ?)";
            const MEMBER_SQL_VALUES: number[] = [member, teamRow.insertId];
            await con.query(MEMBER_SQL, MEMBER_SQL_VALUES);
          }
        }
        stepCount++;
      }
    })();
    return resultRow;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const loadTeamList = async (param: {
  page: number;
}): Promise<IGenerationData[]> => {
  try {
    let { page } = param;
    page = page ? (page - 1) * 5 : 0;
    const SQL = `select generation_id, generation_users, generation_limit, generation_group from Generation
                  order by generation_id desc limit ? ,5`;
    const SQL_VALUES: [number] = [page];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const loadTeamCount = async (): Promise<number> => {
  try {
    const SQL = `select count(*) as count from Generation`;
    const SQL_VALUES: [] = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row[0].count;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findByTeamByGenerationId = async (param: {
  generate_id: number;
}): Promise<ITeamAndUser[]> => {
  try {
    const { generate_id } = param;
    const SQL = `
      select Team.team_id, Team.team_step, Team.team_name, User.name, User.disabled from Generation
      inner join Team on Team.generation_id  = Generation.generation_id 
      inner join Member on Member.Team_id = Team.team_id
      inner join User on User.user_id = Member.user_id
      where Generation.generation_id = ?
      order by Team.team_step, Team.team_name
    `;
    const SQL_VALUES: number[] = [generate_id];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findGenerationById = async (param: {
  generate_id: number;
}): Promise<IGenerationData[]> => {
  try {
    const { generate_id } = param;
    const SQL = `select generation_users, generation_limit, generation_group, generation_case from Generation
                  where generation_id = ? `;
    const SQL_VALUES: number[] = [generate_id];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};
