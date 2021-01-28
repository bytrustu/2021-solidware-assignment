import * as db from '../config/mysql_connect';
import { IUserData, IUserId, IUserName } from '../type/Interfaces';

export const userList = async (): Promise<IUserData[]> => {
  try {
    const SQL: string = 'select user_id, name from User where disabled = 0';
    const SQL_VALUES:any = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findByUserName = async (param: IUserName): Promise<IUserData[]> => {
  try {
    const { name } = param;
    const SQL: string = 'select * from User where name = ? and disabled = 0';
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
    const SQL: string = 'insert into User(name) values(?)';
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
    const SQL: string = 'update User set disabled = 1 where user_id = ?';
    const SQL_VALUES: number[] = [user_id];
    await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const editUserNameByUserId = async (param: IUserData): Promise<boolean> => {
  try {
    const { user_id, name } = param;
    const SQL: string = 'update User set name = ? where id = ?';
    const SQL_VALUES: (number|string)[] = [user_id, name];
    await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return true;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};


