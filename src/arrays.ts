import { Function2, Predicate } from "./functions";
import { Optional } from "./optional";
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

/**
 * Extracts the last element from the given array.
 *
 * @param array The array to extract the last element from.
 * @returns the last element.
 */
export const arrayLast = <T>(array: T[]): T | undefined => {
  const length = array.length;

  if (length === 0) return;

  return array[array.length - 1];
};

/**
 * Extracts the last element from the given array as an optional.
 *
 * @param array The array to extract the last element from.
 * @returns the last element as an optional.
 */
export const arrayLastOptional = <T>(array: T[]): Optional<T> => {
  const length = array.length;

  if (length === 0) return Optional.empty();

  return Optional.filled(array[array.length - 1]);
};

/**
 * Extracts the first element from the given array.
 *
 * @param array The array to extract the first element from.
 * @returns the first element.
 */
export const arrayFirst = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return;

  return array[0];
};

/**
 * Calculate the sum of the extracted values.
 *
 * @param array The array.
 * @param valueExtractor The extractor used to retrieve values to be sum up.
 * @returns the total.
 */
export const arraySum = <T>(
  array: T[],
  valueExtractor?: (item: T) => number
) => {
  if (array.length === 0) return 0;

  return array
    .filter((v) => v !== null && v !== undefined)
    .map((value) => valueExtractor ? valueExtractor(value) : Number(value))
    .reduce((total, current) => total + current, 0);
};

/**
 * Calculate the average of the extracted values.
 *
 * @param array The array.
 * @param valueExtractor The extractor used to retrieve values to be averaged up.
 * @returns the average.
 */
export const arrayAverage = <T>(
  array: T[],
  valueExtractor?: (item: T) => number,
  rounded: boolean = true
) => {
  if (array.length === 0) return 0;

  const total = arraySum(array, valueExtractor);
  const average = total / array.length;
  const finalAverage = rounded ? Math.round(average) : average;
  return finalAverage >= 0 ? finalAverage : 0;
};

/**
 * Extracts the first element from the given array as an optional.
 *
 * @param array The array to extract the first element from.
 * @returns the first element as an optional.
 */
export const arrayFirstOptional = <T>(array: T[]): Optional<T> => {
  if (array.length === 0) return Optional.empty();

  return Optional.filled(array[0]);
};

/**
 * Push the given value to the given array only if the value is not already present in the given array.
 *
 * @param array The array in which to insert the new value.
 * @param newValue The new value to insert.
 * @param valueComparator The comparator used to compare values from the array.
 */
export const arrayPushNewValue = <T>(
  array: T[],
  newValue: T,
  valueComparator?: (value1: T, value2: T) => boolean
) => {
  if (array.length === 0) {
    array.push(newValue);
    return;
  }

  if (
    !array.find((value) =>
      valueComparator ? valueComparator(value, newValue) : value === newValue
    )
  ) {
    array.push(newValue);
  }
};

/**
 * Push the given values to the given array only if the values are not already present in the given array.
 * The duplicate values will not be pushed but any other values will be.
 *
 * @param array The array in which to insert the new value.
 * @param newValue The new values to insert.
 * @param valueComparator The comparator used to compare values from the array.
 */
export const arrayPushNewValues = <T>(
  array: T[],
  newValues: T[],
  valueComparator?: (value1: T, value2: T) => boolean
) => {
  if (array.length === 0) {
    array.push(...newValues);
    return;
  }

  for (const newValue of newValues) {
    arrayPushNewValue(array, newValue, valueComparator);
  }
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
  /**
   * Extracts the last element from the given array.
   *
   * @param array The array to extract the last element from.
   * @returns the last element.
   */
  last: arrayLast,
  /**
   * Extracts the last element from the given array as an optional.
   *
   * @param array The array to extract the last element from.
   * @returns the last element as an optional.
   */
  lastOptional: arrayLastOptional,
  /**
   * Extracts the first element from the given array.
   *
   * @param array The array to extract the first element from.
   * @returns the first element.
   */
  first: arrayFirst,
  /**
   * Extracts the first element from the given array as an optional.
   *
   * @param array The array to extract the first element from.
   * @returns the first element as an optional.
   */
  firstOptional: arrayFirstOptional,
  /**
   * Calculate the sum of the extracted values.
   *
   * @param array The array.
   * @param valueExtractor The extractor used to retrieve values to be sum up.
   * @returns the total.
   */
  sum: arraySum,
  /**
   * Calculate the average of the extracted values.
   *
   * @param array The array.
   * @param valueExtractor The extractor used to retrieve values to be averaged up.
   * @returns the average.
   */
  average: arrayAverage,
  /**
   * Push the given value to the given array only if the value is not already present in the given array.
   *
   * @param array The array in which to insert the new value.
   * @param newValue The new value to insert.
   * @param valueComparator The comparator used to compare values from the array.
   */
  pushNewValue: arrayPushNewValue,
  /**
   * Push the given values to the given array only if the values are not already present in the given array.
   * The duplicate values will not be pushed but any other values will be.
   *
   * @param array The array in which to insert the new value.
   * @param newValue The new values to insert.
   * @param valueComparator The comparator used to compare values from the array.
   */
  pushNewValues: arrayPushNewValues,
};

export const ArraySymbols = {
  /**
   * An empty array.
   */
  empty: EMPTY_ARRAY,
};

export const Arrays = {
  /**
   * Array helper methods.
   */
  helper: ArrayHelpers,
  /**
   * Array symbols.
   */
  symbol: ArraySymbols,
};
