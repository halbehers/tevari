import { Function2, Predicate } from "./functions";
import { stringIsBlank } from "./strings";

/**
 * Tests if at least one element of the given array matches the predicate.
 *
 * @param array The array to test
 * @param predicate The predicate used to test each element of the given array
 * @returns `true` if at leat one element matches the given predicate, `false` otherwise.
 */
export const arrayMatchOneOrMore = <T>(
  array: T[],
  predicate: Predicate<T>
): boolean => {
  return array.filter((value) => !!value).filter(predicate).length > 0;
};

/**
 * Tests if exactly one element of the given array matches the predicate.
 *
 * @param array The array to test
 * @param predicate The predicate used to test each element of the given array
 * @returns `true` if one element only matches the given predicate, `false` otherwise.
 */
export const arrayMatchOneExactly = <T>(
  array: T[],
  predicate: Predicate<T>
): boolean => {
  return array.filter((value) => !!value).filter(predicate).length === 1;
};

/**
 * Tests if all elements of the given array match the predicate.
 *
 * @param array The array to test
 * @param predicate The predicate used to test each element of the given array
 * @returns `true` if all of the elements match the given predicate, `false` otherwise.
 */
export const arrayMatchAll = <T>(
  array: T[],
  predicate: Predicate<T>
): boolean => {
  const cleanedArray = array.filter((value) => !!value);

  return (
    cleanedArray.length > 0 &&
    cleanedArray.filter(predicate).length === cleanedArray.length
  );
};

/**
 * Tests whether the given arrays are exactly the same in length and content.
 * If no predicate is given to compare the elements of the arrays, `===` will be used.
 *
 * @param array1 The first array to test
 * @param array2 The second array to test
 * @param comparator The predicate used to compare each element of the given arrays.
 * @returns `true` if both arrays are equal, `false` otherwise.
 */
export const arraysAreSame = <T>(
  array1: T[],
  array2: T[],
  comparator?: Function2<T, T, boolean>
): boolean => {
  return (
    array1.length == array2.length &&
    array1.every((element, index) =>
      comparator !== undefined
        ? comparator(element, array2[index])
        : element === array2[index]
    )
  );
};

/**
 * Creates an array of the given length composed of a suite of numbers from `offset` to `offset + (length * step)`.
 *
 * @param length The length of the array to be created.
 * @param offset The starting offset of the suite to be created. `1` is set by default.
 * @returns the suite array from `offset` to `offset + (length * step)`.
 */
export const arrayCreateSuite = (
  length: number,
  offset = 1,
  step = 1
): number[] => {
  return Array.from({ length }, (_, i) => offset + i * step);
};

export const EMPTY_ARRAY = [];

/**
 * Strips the given string array of any blank values (either `null`, `undefined` of empty string).
 *
 * @param array The string array to be cleaned.
 * @returns `undefined` if the given array was undefined, the cleaned up array otherwise.
 */
export const arrayCleanStringArray = (
  array?: (string | undefined | null)[]
): string[] | undefined => {
  if (!array) return;

  return array.filter((value) => !stringIsBlank(value)) as string[];
};

/**
 * Shuffles the elements of the given array to a random order.
 *
 * @param array The array to shuffle.
 * @returns An array with every elements of the given array but in a random order.
 */
export const arrayShuffle = <T>(array: T[]): T[] => {
  let currentIndex: number = array.length;
  let temporaryValue: T, randomIndex: number;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

/**
 * Strips the given array of duplicate values.
 *
 * @param array The array with potential duplicates.
 * @returns An array where of elements are uniq.
 */
export const arrayUniq = <T>(array: T[]): T[] => {
  return array.filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Strips the given array of duplicate property values.
 *
 * @param array The array with potential duplicates.
 * @param property The property to extract for the comparaison.
 * @param comparator The predicate used to compare each element of the given arrays.
 * @returns An array where of elements are uniq.
 */
export const arrayUniqObjectsByProperty = <T extends { [id: string]: any }>(
  array: T[],
  property: string,
  comparator?: Function2<T, T, boolean>
): T[] => {
  return array.filter(
    (obj, i) =>
      array.findIndex((a) =>
        comparator
          ? comparator(a[property], obj[property])
          : a[property] === obj[property]
      ) === i
  );
};

export const ArrayHelpers = {
  /**
   * Tests if all elements of the given array match the predicate.
   *
   * @param array The array to test
   * @param predicate The predicate used to test each element of the given array
   * @returns `true` if all of the elements match the given predicate, `false` otherwise.
   */
  matchAll: arrayMatchAll,
  /**
   * Tests if exactly one element of the given array matches the predicate.
   *
   * @param array The array to test
   * @param predicate The predicate used to test each element of the given array
   * @returns `true` if one element only matches the given predicate, `false` otherwise.
   */
  matchOneExactly: arrayMatchOneExactly,
  /**
   * Tests if at least one element of the given array matches the predicate.
   *
   * @param array The array to test
   * @param predicate The predicate used to test each element of the given array
   * @returns `true` if at leat one element matches the given predicate, `false` otherwise.
   */
  matchOneOrMore: arrayMatchOneOrMore,
  /**
   * Tests whether the given arrays are exactly the same in length and content.
   * If no predicate is given to compare the elements of the arrays, `===` will be used.
   *
   * @param array1 The first array to test
   * @param array2 The second array to test
   * @param comparator The predicate used to compare each element of the given arrays.
   * @returns `true` if both arrays are equal, `false` otherwise.
   */
  same: arraysAreSame,
  /**
   * Strips the given string array of any blank values (either `null`, `undefined` of empty string).
   *
   * @param array The string array to be cleaned.
   * @returns `undefined` if the given array was undefined, the cleaned up array otherwise.
   */
  cleanStringArray: arrayCleanStringArray,
  /**
   * Creates an array of the given length composed of a suite of numbers from `offset` to `offset + (length * step)`.
   *
   * @param length The length of the array to be created.
   * @param offset The starting offset of the suite to be created. `1` is set by default.
   * @returns the suite array from `offset` to `offset + (length * step)`.
   */
  createSuite: arrayCreateSuite,
  /**
   * Shuffles the elements of the given array to a random order.
   *
   * @param array The array to shuffle.
   * @returns An array with every elements of the given array but in a random order.
   */
  shuffle: arrayShuffle,
  /**
   * Strips the given array of duplicate values.
   *
   * @param array The array with potential duplicates.
   * @returns An array where of elements are uniq.
   */
  uniq: arrayUniq,
  /**
   * Strips the given array of duplicate property values.
   *
   * @param array The array with potential duplicates.
   * @param property The property to extract for the comparaison.
   * @param comparator The predicate used to compare each element of the given arrays.
   * @returns An array where of elements are uniq.
   */
  uniqObjectsByProperty: arrayUniqObjectsByProperty,
};

export const ArraySymbols = {
  /**
   * An empty array.
   */
  empty: EMPTY_ARRAY,
};

const Arrays = {
  /**
   * Array helper methods.
   */
  helper: ArrayHelpers,
  /**
   * Array symbols.
   */
  symbol: ArraySymbols,
};

export default Arrays;
