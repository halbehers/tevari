/**
 * Converts the given number of pixel into Em values and format it into a string.
 *
 * @param valueInPx The value in pixel to convert.
 * @returns the string representation of the equivalent in Em of the given pixel amount.
 */
export const styleEm = (valueInPx: number): string => {
  return `${valueInPx / 16}em`;
};

/**
 * Converts the given number of pixel into Rem values and format it into a string.
 *
 * @param valueInPx The value in pixel to convert.
 * @returns the string representation of the equivalent in Rem of the given pixel amount.
 */
export const styleRem = (valueInPx: number): string => {
  return `${valueInPx / 16}rem`;
};

export const StyleHelpers = {
  /**
   * Converts the given number of pixel into Em values and format it into a string.
   *
   * @param valueInPx The value in pixel to convert.
   * @returns the string representation of the equivalent in Em of the given pixel amount.
   */
  em: styleEm,
  /**
   * Converts the given number of pixel into Rem values and format it into a string.
   *
   * @param valueInPx The value in pixel to convert.
   * @returns the string representation of the equivalent in Rem of the given pixel amount.
   */
  rem: styleRem,
};

export const Styles = {
  /**
   * Style helper methods.
   */
  helper: StyleHelpers,
};
