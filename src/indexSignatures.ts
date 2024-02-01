import { arraysAreSame } from "./arrays";
import { Function1 } from "./functions";

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

export const indexSignatureMapValues = <T, U>(
  indexSignature: { [id: string]: T },
  converter: (element: T) => U,
  filter?: (element: T) => boolean
): { [id: string]: U } => {
  const result: { [id: string]: U } = {};
  for (const [id, element] of Object.entries(indexSignature).filter(
    ([, element]) => !filter || filter(element)
  )) {
    result[id] = converter(element);
  }
  return result;
};

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

export const indexSignatureToString = <T>(indexSignature: {
  [id: string]: T;
}): string => {
  const resultArray = [];
  for (const [id, element] of Object.entries(indexSignature)) {
    resultArray.push(`${id}: '${element}'`);
  }
  return `{ ${resultArray.join(", ")} }`;
};

export const indexSignatureToArray = <T>(indexSignature: {
  [id: string]: T;
}): T[] => {
  const result: T[] = [];
  for (const element of Object.values(indexSignature)) result.push(element);
  return result;
};

export const indexSignatureEntriesToArray = <T, U>(
  indexSignature: { [id: string]: T },
  converter: (key: string, value: T) => U
): U[] => {
  const result: U[] = [];
  for (const [id, element] of Object.entries(indexSignature))
    result.push(converter(id, element));
  return result;
};

export const indexSignatureKeysToArray = <T>(indexSignature: {
  [id: string]: T;
}): string[] => {
  const result: string[] = [];
  for (const element of Object.keys(indexSignature)) result.push(element);
  return result;
};

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

export const indexSignatureGroupBy = <T>(
  array: T[],
  indexExtractor: Function1<T, string>
) => {
  const result: { [index: string]: T[] } = {};
  for (const value of array) {
    const index = indexExtractor(value);
    if (result[index] === undefined) result[index] = [];

    result[index].push(value);
  }
  return result;
};

export const indexSignatureGroupByAndMap = <T, U>(
  array: T[],
  indexExtractor: Function1<T, string>,
  converter: (element: T) => U
) => {
  const result: { [index: string]: U[] } = {};
  for (const value of array) {
    const index = indexExtractor(value);
    if (result[index] === undefined) result[index] = [];

    result[index].push(converter(value));
  }
  return result;
};

export const IndexSignatureHelpers = {
  fromArray: indexSignatureFromArray,
  fromArrayValues: indexSignatureFromArrayValues,
  mapValues: indexSignatureMapValues,
  same: indexSignaturesAreSame,
  includes: indexSignatureIncludes,
  toString: indexSignatureToString,
  toArray: indexSignatureToArray,
  entriesToArray: indexSignatureEntriesToArray,
  keysToArray: indexSignatureKeysToArray,
  filter: indexSignatureFilter,
  groupBy: indexSignatureGroupBy,
  groupByAndMap: indexSignatureGroupByAndMap,
};

const IndexSignatures = {
  helper: IndexSignatureHelpers,
};

export default IndexSignatures;
