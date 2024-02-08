import { Order } from "./misc";
import { DOT, SPACE } from "./strings";

/**
 * Calculates the average of all numbers given in the array.
 *
 * @param numbers The numbers to be averaged.
 * @param rounded whether the result average should be rounded.
 * @returns the average result.
 */
export const numberAverage = (numbers: number[], rounded = false): number => {
  if (numbers.length === 0) return 0;
  const total = numbers
    .filter((v) => v !== null)
    .reduce((total, current) => total + current, 0);
  const average = total / numbers.length;
  const finalAverage = rounded ? Math.round(average) : average;
  return finalAverage >= 0 ? finalAverage : 0;
};

/**
 * Gets a number comparator function in the given order.
 *
 * @param order The order of the result.
 * @returns a comparator function in the given order.
 */
export const numberGetComparator =
  (order: Order = "desc") =>
  (a: number, b: number) => {
    if (order === "asc") return a - b;

    return b - a;
  };

/**
 * An ascendent number comparator.
 */
export const NUMBER_COMPARATOR_ASC = numberGetComparator("asc");
/**
 * An descendent number comparator.
 */
export const NUMBER_COMPARATOR_DESC = numberGetComparator("desc");

/**
 * Returns a random number contained between the given mion and max values inclusively.
 *
 * @param min The min value.
 * @param max The max value.
 * @returns the result random number.
 */
export const numberRandom = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Number seperator accepted types.
 */
export type NumberSeparator = "." | ",";
/**
 * Number thousand seperator accepted types.
 */
export type NumberThousandSeparator = " " | ",";

/**
 * Number formatters options.
 */
export interface INumberFormatOptions {
  /**
   * The desired number of decimals to be displayed.
   */
  nbOfDecimals?: number;
  /**
   * The desired float number separator.
   */
  separator?: NumberSeparator;
  /**
   * The desired thousand number separator.
   */
  thousandSeparator?: NumberThousandSeparator;
  /**
   * Minimun number of digit to display on the integer side (before the decimals).
   */
  minDigits?: number;
}

/**
 * Formats the given number into a percentage string representation.
 *
 * @param percentage The number to format.
 * @param options The formatter options.
 * @returns a percentage string representation of the given number.
 */
export const numberFormatPercentage = (
  percentage: number,
  options?: INumberFormatOptions
) => {
  const { nbOfDecimals = 1, separator = DOT } = options ?? {};

  const fixedPercentage = Number(percentage.toFixed(nbOfDecimals));

  if (Number.isNaN(fixedPercentage) || fixedPercentage <= 0) return "0%";
  if (fixedPercentage >= 100) return "100%";
  if (Number.isInteger(fixedPercentage))
    return `${numberFormatInteger(Math.round(percentage), options)}%`;

  return `${`${fixedPercentage}`.replace(DOT, separator)}%`;
};

/**
 * Formats the given number into a float string representation with forced decimal.
 *
 * @param percentage The number to format.
 * @param options The formatter options.
 * @returns a float string representation of the given number.
 */
export const numberFormatFloatWithDecimals = (
  float?: number,
  options?: INumberFormatOptions
) => {
  const { separator = DOT, nbOfDecimals = 1 } = options ?? {};
  if (!float || Number.isNaN(float)) return `0${separator}0`;
  return numberFormatLarge(float, { ...options, nbOfDecimals });
};

/**
 * Formats the given number into a float string representation. No decimal will be displayed of not needed.
 *
 * @param percentage The number to format.
 * @param options The formatter options.
 * @returns either a float or integer string representation of the given number.
 */
export const numberFormatFloat = (
  float?: number,
  options?: INumberFormatOptions
): string => {
  const { nbOfDecimals = 1 } = options ?? {};
  if (!float || Number.isNaN(float)) return "0";
  const fixed = Number(float.toFixed(nbOfDecimals));

  if (Number.isNaN(fixed)) return "0";
  if (Number.isInteger(fixed)) return `${numberFormatInteger(float, options)}`;

  return `${numberFormatLarge(fixed, { ...options, nbOfDecimals })}`;
};

/**
 * Formats the given number into a integer string representation.
 *
 * @param percentage The number to format.
 * @param options The formatter options.
 * @returns either a float or integer string representation of the given number.
 */
export const numberFormatInteger = (
  integer: number,
  options?: INumberFormatOptions
): string => {
  const { minDigits = 1 } = options ?? {};

  const rounded = Math.round(integer);
  if (minDigits > 1) return String(rounded).padStart(minDigits, "0");

  return `${numberFormatLarge(rounded, options)}`;
};

/**
 * Formats the given number into a string representation handling thousand separators.
 *
 * @param value The number to format.
 * @param options The formatter options.
 * @returns the string representation of the given number.
 */
export const numberFormatLarge = (
  value: number,
  options?: INumberFormatOptions
) => {
  const {
    nbOfDecimals = Number.isInteger(value) ? 0 : 1,
    separator = DOT,
    thousandSeparator = SPACE,
  } = options ?? {};

  return value
    .toFixed(nbOfDecimals)
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousandSeparator)
    .replace(DOT, separator);
};

export const NumberHelpers = {
  /**
   * Calculates the average of all numbers given in the array.
   *
   * @param numbers The numbers to be averaged.
   * @param rounded whether the result average should be rounded.
   * @returns the average result.
   */
  average: numberAverage,
  /**
   * Returns a random number contained between the given mion and max values inclusively.
   *
   * @param min The min value.
   * @param max The max value.
   * @returns the result random number.
   */
  random: numberRandom,
};

export const NumberComparators = {
  /**
   * An ascendent number comparator.
   */
  asc: NUMBER_COMPARATOR_ASC,
  /**
   * An descendent number comparator.
   */
  desc: NUMBER_COMPARATOR_DESC,
};

export const NumberFormatters = {
  /**
   * Formats the given number into a percentage string representation.
   *
   * @param percentage The number to format.
   * @param options The formatter options.
   * @returns a percentage string representation of the given number.
   */
  percentage: numberFormatPercentage,
  /**
   * Formats the given number into a float string representation with forced decimal.
   *
   * @param percentage The number to format.
   * @param options The formatter options.
   * @returns a float string representation of the given number.
   */
  floatWithDecimal: numberFormatFloatWithDecimals,
  /**
   * Formats the given number into a float string representation. No decimal will be displayed of not needed.
   *
   * @param percentage The number to format.
   * @param options The formatter options.
   * @returns either a float or integer string representation of the given number.
   */
  float: numberFormatFloat,
  /**
   * Formats the given number into a integer string representation.
   *
   * @param percentage The number to format.
   * @param options The formatter options.
   * @returns either a float or integer string representation of the given number.
   */
  integer: numberFormatInteger,
  /**
   * Formats the given number into a string representation handling thousand separators.
   *
   * @param value The number to format.
   * @param options The formatter options.
   * @returns the string representation of the given number.
   */
  large: numberFormatLarge,
};

const Numbers = {
  /**
   * Number helper methods.
   */
  helper: NumberHelpers,
  /**
   * Number comparators.
   */
  comparator: NumberComparators,
  /**
   * Number formatters.
   */
  formatter: NumberFormatters,
};

export default Numbers;
