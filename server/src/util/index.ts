import { IUserData } from '../type/Interfaces';

interface IRegExp {
  [key: string]: RegExp;
}

export const testRegExp = (type: string, value: string): boolean => {
  const rules: IRegExp = {
    name: /^.{1,20}$/,
  };
  console.log(value, value.length);
  console.log(rules.hasOwnProperty(type) ?
    rules[type].test(value.trim()) : false);
  return rules.hasOwnProperty(type) ?
    rules[type].test(value.trim()) : false;
};

export const generateMessage = (message: string) => ({ msg: message });

export const shuffleArray = (array: any[]) => array.sort(_ => Math.random() - 0.5);

export const generateTeam = (users: IUserData[], minUserCount: number, groupCount: number) => {
  const requireCount = minUserCount * groupCount;
  if (users.length < requireCount) return false;

  const group = {};



  const shuffleUser:IUserData[] = shuffleArray(users);


};