import { Order } from "./dates";
import { SPACE } from "./strings";

export const numberAverage = (array: number[], rounded = false): number => {
  if (array.length === 0) return 0;
  const total = array
    .filter((v) => v !== null)
    .reduce((total, current) => total + current, 0);
  const average = total / array.length;
  const finalAverage = rounded ? Math.round(average) : average;
  return finalAverage >= 0 ? finalAverage : 0;
};

export const numberGetComparator =
  (order: Order = "desc") =>
  (a: number, b: number) => {
    if (order === "asc") return a - b;

    return b - a;
  };

export const NUMBER_COMPARATOR_ASC = numberGetComparator("asc");
export const NUMBER_COMPARATOR_DESC = numberGetComparator("desc");

export const numberGetRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const numberFormatPercentage = (
  percentage: number,
  nbOfDecimals: number = 1
) => {
  const fixedPercentage = Number(percentage.toFixed(nbOfDecimals));

  if (Number.isNaN(fixedPercentage)) return "0%";
  if (Number.isInteger(fixedPercentage)) return `${Math.round(percentage)}%`;

  return `${fixedPercentage}%`;
};

export const numberFormatFloatWithDecimals = (
  float?: number,
  nbOfDecimals: number = 1
) => {
  if (!float || Number.isNaN(float)) return "0.0";
  return numberFormatLarge(float.toFixed(nbOfDecimals));
};

export const numberFormatFloat = (
  float?: number,
  nbOfDecimals: number = 1
): string => {
  if (!float || Number.isNaN(float)) return "0";
  const fixed = Number(float.toFixed(nbOfDecimals));

  if (Number.isNaN(fixed)) return "0";
  if (Number.isInteger(fixed)) return `${numberFormatLarge(Math.round(float))}`;

  return `${numberFormatLarge(fixed)}`;
};

export const numberFormatInteger = (integer: number, minDigits = 1): string => {
  const rounded = Math.round(integer);
  if (minDigits > 1) return String(rounded).padStart(minDigits, "0");

  return `${numberFormatLarge(rounded)}`;
};

export const numberFormatLarge = (
  value: number | string,
  thousandSeparator = SPACE
) => {
  return value
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousandSeparator);
};

export const NumberHelpers = {
  average: numberAverage,
  getRandom: numberGetRandom,
};

export const NumberComparators = {
  asc: NUMBER_COMPARATOR_ASC,
  desc: NUMBER_COMPARATOR_DESC,
};

export const NumberFormatters = {
  percentage: numberFormatPercentage,
  floatWithDecimal: numberFormatFloatWithDecimals,
  float: numberFormatFloat,
  integer: numberFormatInteger,
  large: numberFormatLarge,
};

const Numbers = {
  helper: NumberHelpers,
  comparator: NumberComparators,
  formatter: NumberFormatters,
};

export default Numbers;