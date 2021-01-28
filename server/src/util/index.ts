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