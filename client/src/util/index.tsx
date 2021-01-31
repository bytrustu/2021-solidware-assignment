type TypeRange = (length: number, init: number) => number[];

export const range: TypeRange = (length, init) =>
  Array.from({ length }).map((_, index) => index + init);
