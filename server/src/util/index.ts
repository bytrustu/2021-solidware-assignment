interface IRegExp {
  [key: string]: RegExp;
}

type TypeRange = (length: number, init: number) => number[];

type TypeSuffleArray = (array: any[]) => any[];

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

export const range: TypeRange = (length, init) => Array.from({ length }).map((_, index) => index + init);

export const shuffleArray: TypeSuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export const removeTextRow = (queryData: any) =>
  JSON.parse(
    JSON.stringify(queryData)
      .replace(/TextRow/g, ''),
  );
