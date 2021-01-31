import * as mysql from 'mysql2/promise';
import config from './index';

type MysqlConfig = {
  host: string | undefined;
  port: number;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  connectionLimit: number;
  waitForConnections: boolean;
}

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = config;

const mysqlConfig: MysqlConfig = {
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 100,
  waitForConnections: true,
};

const pool = mysql.createPool(mysqlConfig);

export const connect = (fn: any) => async (...args: any) => {
  const con: any = await pool.getConnection();
  const result = await fn(con, ...args).catch(async (error: any) => {
    con.release();
    throw error;
  });
  con.release();
  return result;
};

export const transaction = (fn: any) => async (...args: any) => {
  const con: any = await pool.getConnection();
  await con.beginTransaction();
  const result = await fn(con, ...args).catch(async (error: any) => {
    await con.rollback();
    con.release();
    throw error;
  });
  await con.commit();
  con.release();
  return result;
};
