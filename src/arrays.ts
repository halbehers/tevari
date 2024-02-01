import { stringIsBlank } from "./strings";

export const arrayHasAtLeastOneElement = <T>(
  array: T[],
  predicate: (element: T) => boolean
) => {
  return array.filter((value) => !!value).filter(predicate).length > 0;
};
export const arrayAllElements = <T>(
  array: T[],
  predicate: (element: T) => boolean
) => {
  const cleanedArray = array.filter((value) => !!value);
  return cleanedArray.filter(predicate).length === cleanedArray.length;
};

export const arraysAreSame = <T>(array1: T[], array2: T[]): boolean => {
  return (
    array1.length == array2.length &&
    array1.every((element, index) => element === array2[index])
  );
};

export const arrayCreateSuite = (n: number): number[] => {
  return Array.from({ length: n }, (_, i) => i + 1);
};

export const EMPTY_ARRAY = [];

export const arrayCleanStringArray = (
  array?: string[]
): string[] | undefined => {
  if (!array) return;

  return array.filter((value) => !stringIsBlank(value));
};

export const ArrayHelpers = {
  hasAtLeastOneElement: arrayHasAtLeastOneElement,
  allElements: arrayAllElements,
  same: arraysAreSame,
  cleanStringArray: arrayCleanStringArray,
  createSuite: arrayCreateSuite,
};

export const ArraySymbols = {
  empty: EMPTY_ARRAY,
};

const Arrays = {
  helper: ArrayHelpers,
  symbol: ArraySymbols,
};

export default Arrays;
