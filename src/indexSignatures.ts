import { arraysAreSame } from "./arrays";
import { Function1 } from "./functions";
import { stringIsString } from "./strings";

/**
 * Creates an index signature from the given array.
 *
 * @param array The array to convert.
 * @param idExtractor A function to extract the id from each array elements.
 * @returns the created index signature.
 */
export const indexSignatureFromArray = <T>(
  array: T[],
  idExtractor: (element: T) => string
): { [id: string]: T } => {
  const result: { [id: string]: T } = {};
  for (const element of array) {
    result[idExtractor(element)] = element;
  }
  return result;
};

/**
 * Creates an index signature from the given array with every elements mapped using the given valueExtractor.
 *
 * @param array The array to convert.
 * @param idExtractor A function to extract the id from each array elements.
 * @param valueExtractor A mapper function to convert each element of the array from T to U.
 * @returns the created index signature.
 */
export const indexSignatureFromArrayValues = <T, U>(
  array: T[],
  idExtractor: (element: T) => string,
  valueExtractor: (element: T) => U
): { [id: string]: U } => {
  const result: { [id: string]: U } = {};
  for (const element of array) {
    result[idExtractor(element)] = valueExtractor(element);
  }
  return result;
};

/**
 * Apply the provided mapping function to all values of the given index signature, and extract all values into an array.
 *
 * @param indexSignature The index signature to map.
 * @param mapper The mapper function.
 * @param filter (optional) A filter predicate used to filter out unwanted values.
 * @returns the result array of mapped values.
 */
export const indexSignatureMapToArray = <T, U>(
  indexSignature: { [id: string]: T },
  mapper: (key: string, element: T) => U,
  filter?: (key: string, element: T) => boolean
): U[] => {
  const result: U[] = [];
  for (const [id, element] of Object.entries(indexSignature).filter(
    ([id, element]) => !filter || filter(id, element)
  )) {
    result.push(mapper(id, element));
  }
  return result;
};

/**
 * Apply the provided mapping function to all values of the given index signature, and extract all values into an array.
 *
 * @param indexSignature The index signature to map.
 * @param mapper The mapper function.
 * @param filter (optional) A filter predicate used to filter out unwanted values.
 * @returns the result array of mapped values.
 */
export const indexSignatureMapValues = <T, U>(
  indexSignature: { [id: string]: T },
  mapper: (element: T) => U,
  filter?: (element: T) => boolean
): { [id: string]: U } => {
  const result: { [id: string]: U } = {};
  for (const [id, element] of Object.entries(indexSignature).filter(
    ([, element]) => !filter || filter(element)
  )) {
    result[id] = mapper(element);
  }
  return result;
};

/**
 * Tests whether the two given index signatures are equals.
 *
 * @param indexSignature1 The first index signature to compare.
 * @param indexSignature2 The second index signature to compare.
 * @returns `true` if the index signatures are equal, `false` otherwise.
 */
export const indexSignaturesAreSame = <T>(
  indexSignature1: { [id: string]: T },
  indexSignature2: { [id: string]: T }
): boolean => {
  if (
    !arraysAreSame(Object.keys(indexSignature1), Object.keys(indexSignature2))
  )
    return false;
  if (
    !arraysAreSame(
      Object.values(indexSignature1),
      Object.values(indexSignature2)
    )
  )
    return false;
  return true;
};

/**
 * Tests whether the given index signature is included into the given array of index signatures.
 *
 * @param indexSignature The index signature to compare.
 * @param indexSignature2 An array of index signatures to test against the first parameter.
 * @returns `true` if the given index signatures is included into the array, `false` otherwise.
 */
export const indexSignatureIncludes = <T>(
  indexSignature: { [id: string]: T },
  indexSignatures: { [id: string]: T }[]
): boolean => {
  for (const iSig of indexSignatures) {
    if (indexSignaturesAreSame(iSig, indexSignature)) {
      return true;
    }
  }
  return false;
};

/**
 * Converts the given index signature into a string formated as follow:
 *
 * ```
 *    { key1: value1, key2: value2, key3: value3, ...}
 * ```
 *
 * @param indexSignature The index signature to convert.
 * @returns a string representation of the given index signature.
 */
export const indexSignatureToString = <T>(indexSignature: {
  [id: string]: T;
}): string => {
  const resultArray = [];
  for (const [id, element] of Object.entries(indexSignature)) {
    const value = stringIsString(element) ? `'${element}'` : `${element}`;
    resultArray.push(`${id}: ${value}`);
  }
  return `{ ${resultArray.join(", ")} }`;
};

/**
 * Converts an index signature's values into an array.
 *
 * @param indexSignature The index signature to convert.
 * @returns an array of all values of the given index signature.
 */
export const indexSignatureToArray = <T>(indexSignature: {
  [id: string]: T;
}): T[] => {
  const result: T[] = [];
  for (const element of Object.values(indexSignature)) result.push(element);
  return result;
};

/**
 * Converts an index signature' keys and values converted by applying the given mapping function into an array.
 *
 * @param indexSignature The index signature to convert.
 * @param mapper The mapper function.
 * @returns an array corresponding to all entries of the given index signature using the given mapper function.
 */
export const indexSignatureEntriesToArray = <T, U>(
  indexSignature: { [id: string]: T },
  mapper: (key: string, value: T) => U
): U[] => {
  const result: U[] = [];
  for (const [id, element] of Object.entries(indexSignature))
    result.push(mapper(id, element));
  return result;
};

/**
 * Converts an index signature's keys into an array.
 *
 * @param indexSignature The index signature to convert.
 * @returns an array of all keys of the given index signature.
 */
export const indexSignatureKeysToArray = <T>(indexSignature: {
  [id: string]: T;
}): string[] => {
  const result: string[] = [];
  for (const element of Object.keys(indexSignature)) result.push(element);
  return result;
};

/**
 * Filters out all entries from the given index signature that doesn't match the given predicate.
 *
 * @param indexSignature The index signture to filter.
 * @param filter Predicate to filter the entries.
 * @returns an index signature containing only the element that match the given predicate.
 */
export const indexSignatureFilter = <T>(
  indexSignature: { [id: string]: T },
  filter: (id: string, element: T) => boolean
): { [id: string]: T } => {
  const result: { [id: string]: T } = {};
  for (const [id, element] of Object.entries(indexSignature)) {
    if (filter(id, element)) {
      result[id] = element;
    }
  }
  return result;
};

/**
 * Groups all elements of the given array by the key extracted using the given indexExtractor.
 *
 * @param array The array to convert.
 * @param indexExtractor The extractor function to extract a key from each element.
 * @returns an index signature with arrays of values grouped by keys.
 */
export const indexSignatureGroupBy = <T>(
  array: T[],
  indexExtractor: Function1<T, string>
): { [index: string]: T[] } => {
  const result: { [index: string]: T[] } = {};
  for (const value of array) {
    const index = indexExtractor(value);
    if (result[index] === undefined) result[index] = [];

    result[index].push(value);
  }
  return result;
};

/**
 * Apply the given mapping function to every elements and groups all elements of the given array by the key extracted using the given indexExtractor
 *
 * @param array The array to convert.
 * @param indexExtractor The extractor function to extract a key from each element.
 * @param mapper The mapper function.
 * @returns an index signature with arrays of converted values grouped by keys.
 */
export const indexSignatureGroupByAndMap = <T, U>(
  array: T[],
  indexExtractor: Function1<T, string>,
  mapper: (element: T) => U
) => {
  const result: { [index: string]: U[] } = {};
  for (const value of array) {
    const index = indexExtractor(value);
    if (result[index] === undefined) result[index] = [];

    result[index].push(mapper(value));
  }
  return result;
};

export const IndexSignatureHelpers = {
  /**
   * Creates an index signature from the given array.
   *
   * @param array The array to convert.
   * @param idExtractor A function to extract the id from each array elements.
   * @returns the created index signature.
   */
  fromArray: indexSignatureFromArray,
  /**
   * Creates an index signature from the given array with every elements mapped using the given valueExtractor.
   *
   * @param array The array to convert.
   * @param idExtractor A function to extract the id from each array elements.
   * @param valueExtractor A mapper function to convert each element of the array from T to U.
   * @returns the created index signature.
   */
  fromArrayValues: indexSignatureFromArrayValues,
  /**
   * Apply the provided mapping function to all values of the given index signature, and extract all values into an array.
   *
   * @param indexSignature The index signature to map.
   * @param mapper The mapper function.
   * @param filter (optional) A filter predicate used to filter out unwanted values.
   * @returns the result array of mapped values.
   */
  mapToArray: indexSignatureMapToArray,
  /**
   * Apply the provided mapping function to all values of the given index signature, and extract all values into an array.
   *
   * @param indexSignature The index signature to map.
   * @param mapper The mapper function.
   * @param filter (optional) A filter predicate used to filter out unwanted values.
   * @returns the result array of mapped values.
   */
  mapValues: indexSignatureMapValues,
  /**
   * Tests whether the two given index signatures are equals.
   *
   * @param indexSignature1 The first index signature to compare.
   * @param indexSignature2 The second index signature to compare.
   * @returns `true` if the index signatures are equal, `false` otherwise.
   */
  same: indexSignaturesAreSame,
  /**
   * Tests whether the given index signature is included into the given array of index signatures.
   *
   * @param indexSignature The index signature to compare.
   * @param indexSignature2 An array of index signatures to test against the first parameter.
   * @returns `true` if the given index signatures is included into the array, `false` otherwise.
   */
  includes: indexSignatureIncludes,
  /**
   * Converts the given index signature into a string formated as follow:
   *
   * ```
   *    { key1: value1, key2: value2, key3: value3, ...}
   * ```
   *
   * @param indexSignature The index signature to convert.
   * @returns a string representation of the given index signature.
   */
  toString: indexSignatureToString,
  /**
   * Converts an index signature's values into an array.
   *
   * @param indexSignature The index signature to convert.
   * @returns an array of all values of the given index signature.
   */
  toArray: indexSignatureToArray,
  /**
   * Converts an index signature' keys and values converted by applying the given mapping function into an array.
   *
   * @param indexSignature The index signature to convert.
   * @param mapper The mapper function.
   * @returns an array corresponding to all entries of the given index signature using the given mapper function.
   */
  entriesToArray: indexSignatureEntriesToArray,
  /**
   * Converts an index signature's keys into an array.
   *
   * @param indexSignature The index signature to convert.
   * @returns an array of all keys of the given index signature.
   */
  keysToArray: indexSignatureKeysToArray,
  /**
   * Filters out all entries from the given index signature that doesn't match the given predicate.
   *
   * @param indexSignature The index signture to filter.
   * @param filter Predicate to filter the entries.
   * @returns an index signature containing only the element that match the given predicate.
   */
  filter: indexSignatureFilter,
  /**
   * Groups all elements of the given array by the key extracted using the given indexExtractor.
   *
   * @param array The array to convert.
   * @param indexExtractor The extractor function to extract a key from each element.
   * @returns an index signature with arrays of values grouped by keys.
   */
  groupBy: indexSignatureGroupBy,
  /**
   * Apply the given mapping function to every elements and groups all elements of the given array by the key extracted using the given indexExtractor
   *
   * @param array The array to convert.
   * @param indexExtractor The extractor function to extract a key from each element.
   * @param mapper The mapper function.
   * @returns an index signature with arrays of converted values grouped by keys.
   */
  groupByAndMap: indexSignatureGroupByAndMap,
};

const IndexSignatures = {
  /**
   * Index signatures helper methods.
   */
  helper: IndexSignatureHelpers,
};

export default IndexSignatures;
