import { Predicate } from "./functions";
import { stringIsBlank } from "./strings";

export const arrayMatchOneOrMore = <T>(array: T[], predicate: Predicate<T>) => {
  return array.filter((value) => !!value).filter(predicate).length > 0;
};

export const arrayMatchOneOnly = <T>(array: T[], predicate: Predicate<T>) => {
  return array.filter((value) => !!value).filter(predicate).length === 1;
};

export const arrayMatchAll = <T>(array: T[], predicate: Predicate<T>) => {
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

export const arrayShuffle = (array: any[]): any[] => {
  let currentIndex: number = array.length;
  let temporaryValue: any, randomIndex: number;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const arrayUniq = (array: any[]): any[] => {
  return array.filter((v, i, a) => a.indexOf(v) === i);
};

export const arrayUniqObjectsByProperty = (
  array: any[],
  property: string
): any[] => {
  return array.filter(
    (obj, i) => array.findIndex((a) => a[property] === obj[property]) === i
  );
};

export const ArrayHelpers = {
  matchAll: arrayMatchAll,
  matchOneOnly: arrayMatchOneOnly,
  matchOneOrMore: arrayMatchOneOrMore,
  same: arraysAreSame,
  cleanStringArray: arrayCleanStringArray,
  createSuite: arrayCreateSuite,
  shuffle: arrayShuffle,
  uniq: arrayUniq,
  uniqObjectsByProperty: arrayUniqObjectsByProperty,
};

export const ArraySymbols = {
  empty: EMPTY_ARRAY,
};

const Arrays = {
  helper: ArrayHelpers,
  symbol: ArraySymbols,
};

export default Arrays;
