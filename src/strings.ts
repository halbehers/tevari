import { Function1 } from "./functions";
import { Order } from "./misc";

export const EMPTY = "";
export const FORWARD_SLASH = "/";
export const BACKSLASH = "\\";
export const HASHTAG = "#";
export const SPACE = " ";
export const TAB = "\t";
export const NEW_LINE = "\n";
export const UNDERSCORE = "_";
export const MINUS = "-";
export const PLUS = "+";
export const DOT = ".";
export const COLON = ":";
export const WILDCARD = "*";
export const PERCENTAGE = "%";
export const COMMA = ",";
export const QUESTION_MARK = "?";
export const UNIT_NORMAL_METRIC = "Nm";
export const UNIT_MASS = "g/m²";
export const UNIT_WEIGHT = "g";

/**
 * Regex pattern that matches string containing only alpha characters.
 */
export const STRING_ONLY_ALPHA_CHARS_REGEX = /^[a-z]+$/i;
/**
 * Regex pattern that matches string containing only numeric characters.
 */
export const STRING_ONLY_NUMERIC_CHARS_REGEX = /^[1-9]+$/i;

/**
 * Regex pattern that matches an email addess.
 */
export const STRING_EMAIL_VALIDATION_REGEXP =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SPECIALS_TO_PLAIN_CHARS: Map<string, string> = new Map([
  ["á", "a"],
  ["à", "a"],
  ["â", "a"],
  ["æ", "a"],
  ["ª", "a"],
  ["ä", "a"],
  ["ã", "a"],
  ["å", "a"],
  ["ā", "a"],
  ["ç", "c"],
  ["ć", "c"],
  ["č", "c"],
  ["é", "e"],
  ["è", "e"],
  ["ê", "e"],
  ["ë", "e"],
  ["ę", "e"],
  ["ė", "e"],
  ["ē", "e"],
  ["î", "i"],
  ["ï", "i"],
  ["ì", "i"],
  ["í", "i"],
  ["į", "i"],
  ["ī", "i"],
  ["ñ", "n"],
  ["ń", "n"],
  ["ô", "o"],
  ["œ", "o"],
  ["º", "o"],
  ["ö", "o"],
  ["ò", "o"],
  ["ó", "o"],
  ["õ", "o"],
  ["ø", "o"],
  ["û", "u"],
  ["ù", "u"],
  ["ü", "u"],
  ["ú", "u"],
  ["ū", "u"],
  ["ÿ", "y"],
]);

/**
 * Plainify the given string, converting every special character into its plain brother.
 *
 * @param value The string to convert.
 * @returns a plainified string.
 */
export const stringPlainify = (value: string): string => {
  const result: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const char = value.charAt(i);
    const plainChar = SPECIALS_TO_PLAIN_CHARS.get(char);
    result.push(plainChar ? plainChar : char);
  }
  return result.join(EMPTY);
};

/**
 * Tests whether the given string contains only alpha characters.
 *
 * @param value The string to check.
 * @returns `true` if the given string only contains alpha characters, `false` otherwise.
 */
export const stringIsAlpha = (value: string): boolean => {
  return value.match(STRING_ONLY_ALPHA_CHARS_REGEX) !== null;
};

/**
 * Tests whether the given string contains only numeric characters.
 *
 * @param value The string to check.
 * @returns `true` if the given string only contains numeric characters, `false` otherwise.
 */
export const stringIsNumeric = (value: string): boolean => {
  return value.match(STRING_ONLY_NUMERIC_CHARS_REGEX) !== null;
};

/**
 * Gets a string natural comparator function in the given order.
 *
 * @param order The order of the result.
 * @returns a comparator function in the given order.
 */
export const stringGetNaturalComparator =
  (order: Order = "desc") =>
  (a: string, b: string): number => {
    if (order === "asc") {
      return stringPlainify(a.toLowerCase()).localeCompare(stringPlainify(b.toLowerCase()));
    }
    return stringPlainify(b.toLowerCase()).localeCompare(stringPlainify(a.toLowerCase()));
  };

/**
 * Gets a string comparator function in the given order from the values extracted using the given supplier function.
 *
 * @param order The order of the result.
 * @returns a comparator function in the given order.
 */
export const stringGetNaturalValueComparator =
  <T>(order: Order = "desc", extractor: Function1<T, string>) =>
  (a: T, b: T): number => {
    const stringA = extractor(a);
    const stringB = extractor(b);
    if (order === "asc") {
      return stringPlainify(stringA.toLowerCase()).localeCompare(stringPlainify(stringB.toLowerCase()));
    }
    return stringPlainify(stringB.toLowerCase()).localeCompare(stringPlainify(stringA.toLowerCase()));
  };

/**
 * An ascendent natural string comparator.
 */
export const STRING_NATURAL_COMPARATOR_ASC = stringGetNaturalComparator("asc");
/**
 * An descendent natural string comparator.
 */
export const STRING_NATURAL_COMPARATOR_DESC = stringGetNaturalComparator("desc");

/**
 * An ascendent natural string comparator from extracted values.
 */
export const STRING_NATURAL_VALUE_COMPARATOR_ASC = <T>(extractor: Function1<T, string>) =>
  stringGetNaturalValueComparator("asc", extractor);
/**
 * An descendent natural string comparator from extracted values.
 */
export const STRING_NATURAL_VALUE_COMPARATOR_DESC = <T>(extractor: Function1<T, string>) =>
  stringGetNaturalValueComparator("desc", extractor);

/**
 * Test whether the given string is strictly equal to an empty string.
 *
 * @param value The string to test.
 * @returns `true` if the given string is empty, `false` otherwise.
 */
export const stringIsEmpty = (value: string): boolean => {
  return value === EMPTY;
};

/**
 * Test whether the given string is either `undefined`, `null` or equal to an empty string.
 *
 * @param value The string to test.
 * @returns `true` if the given string is blank, `false` otherwise.
 */
export const stringIsBlank = (value?: string | null): boolean => {
  return value === undefined || value === null || stringIsEmpty(value);
};

/**
 * Test whether the given string is neither `undefined`, `null` nor equal to an empty string.
 *
 * @param value The string to test.
 * @returns `true` if the given string is filled, `false` otherwise.
 */
export const stringIsFilled = (value?: string | null): boolean => {
  return !stringIsBlank(value);
};

/**
 * Converts the given camel case formatted string into a snake case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringCamelCaseToSnakeCase = (text: string): string => {
  return text
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

/**
 * Converts the given camel case formatted string into a kebab case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringCamelCaseToKebabCase = (text: string): string => {
  return text
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

/**
 * Converts the given snake case formatted string into a camel case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringSnakeCaseToCamelCase = (text: string): string => {
  return text.replace(/(?!^)_(.)/g, (_, char) => char.toUpperCase());
};

/**
 * Converts the given kebab case formatted string into a camel case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringKebabCaseToCamelCase = (text: string): string => {
  return text.replace(/-./g, (x) => x[1].toUpperCase());
};

/**
 * Tests whether the given data parameter is a string.
 *
 * @param data The data to test.
 * @returns `true` if the given data is a string, `false` otherwise.
 */
export const stringIsString = <T>(data: T | string): data is string => {
  return typeof data === "string";
};

/**
 * Humanize the given string.
 *
 * @param value the string to humanize.
 * @returns the formatted result.
 */
export const stringHumanize = (value: string) => {
  const words = value.match(/[A-Za-z][a-z]*|[0-9]+/g) || [];

  return words.map((word) => word.toLowerCase()).join(" ");
};

/**
 * Camelize the given string.
 *
 * @param value the string to camelize.
 * @returns the formatted result.
 */
export const stringCamelize = (value: string) => {
  return value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

/**
 * Extract a boolean value from the given string.
 *
 * @param input The boolean-string to parse.
 * @returns the boolean value corresponding to the given string. If the given input is `null`, this methid resturns `undefined`.
 */
export const stringParseBoolean = (input?: string | null): boolean | undefined => {
  if (!input) return;
  try {
    return JSON.parse(input.toLowerCase());
  } catch (e) {
    return;
  }
};

/**
 * Formats the given string value to contain at least the given number of characters,
 * adding the given padding character at the end of the value if needed.
 *
 * @param value the value to format.
 * @param nbOfCharacters The desired minimum number of characters.
 * @param paddingCharacter The padding character.
 * @returns the formatted result.
 */
export const stringPad = (value: string, nbOfCharacters: number, paddingCharacter = EMPTY) => {
  const val = value;
  if (Math.abs(nbOfCharacters) <= val.length) {
    return val;
  }
  const m = Math.max(Math.abs(nbOfCharacters) - value.length || 0, 0);
  const pad = Array(m + 1).join(String(paddingCharacter).charAt(0));
  return nbOfCharacters < 0 ? pad + val : val + pad;
};

/**
 * Test whether the two given string trimed value are equal.
 * @param value1 The first value to compare.
 * @param value2 The second value to compare.
 * @returns `true` if the two values are equal once trimed, `false` otherwise.
 */
export const stringEquals = (value1: string, value2?: string) => {
  return value1.trim() === value2?.trim();
};

/**
 * Converted any given blank values to an empty string (""). If the given value contains a string, the method will return it unarmed.
 *
 * @param value The value to convert.
 * @returns the exact given string if not blank, an empty string otherwise.
 */
export const stringValueOrEmpty = (value?: string | false): string => {
  if (value === false || stringIsBlank(value)) return EMPTY;

  return value as string;
};

/**
 * Extract the domain name from the given email address.
 *
 * @param email The email address.
 * @returns the corresponding domain name.
 */
export const stringExtractEmailDomain = (email: string): string | undefined => {
  const results = email.toLowerCase().match(/.*@(.*)\..*/);
  if (results?.length === 2) return results[1];
};

/**
 * Capitalizes the first letter of the given string.
 *
 * @param string the string to compute.
 * @returns the result string.
 */
export const stringCapitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of each word of the given string.
 *
 * @param string the string to compute.
 * @returns the result string.
 */
export const stringCapitalizeEachWord = (string: string): string => {
  const eachWord = string.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

  return eachWord.join(" ");
};

export const StringHelpers = {
  /**
   * Plainify the given string, converting every special character into its plain brother.
   *
   * @param value The string to convert.
   * @returns a plainified string.
   */
  plainify: stringPlainify,
  /**
   * Tests whether the given data parameter is a string.
   *
   * @param data The data to test.
   * @returns `true` if the given data is a string, `false` otherwise.
   */
  isString: stringIsString,
  /**
   * Converts the given snake case formatted string into a camel case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  snakeCaseToCamelCase: stringSnakeCaseToCamelCase,
  /**
   * Converts the given camel case formatted string into a kebab case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  camelCaseToKebabCase: stringCamelCaseToKebabCase,
  /**
   * Converts the given kebab case formatted string into a camel case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  kebabCaseToCamelCase: stringKebabCaseToCamelCase,
  /**
   * Converts the given camel case formatted string into a snake case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  camelCaseToSnakeCase: stringCamelCaseToSnakeCase,
  /**
   * Humanize the given string.
   *
   * @param value the string to humanize.
   * @returns the formatted result.
   */
  humanize: stringHumanize,
  /**
   * Camelize the given string.
   *
   * @param value the string to camelize.
   * @returns the formatted result.
   */
  camelize: stringCamelize,
  /**
   * Tests whether the given string contains only alpha characters.
   *
   * @param value The string to check.
   * @returns `true` if the given string only contains alpha characters, `false` otherwise.
   */
  isAlpha: stringIsAlpha,
  /**
   * Tests whether the given string contains only numeric characters.
   *
   * @param value The string to check.
   * @returns `true` if the given string only contains numeric characters, `false` otherwise.
   */
  isNumeric: stringIsNumeric,
  /**
   * Test whether the two given string trimed value are equal.
   * @param value1 The first value to compare.
   * @param value2 The second value to compare.
   * @returns `true` if the two values are equal once trimed, `false` otherwise.
   */
  equals: stringEquals,
  /**
   * Converted any given blank values to an empty string (""). If the given value contains a string, the method will return it unarmed.
   *
   * @param value The value to convert.
   * @returns the exact given string if not blank, an empty string otherwise.
   */
  valueOrEmpty: stringValueOrEmpty,
  /**
   * Formats the given string value to contain at least the given number of characters,
   * adding the given padding character at the end of the value if needed.
   *
   * @param value the value to format.
   * @param nbOfCharacters The desired minimum number of characters.
   * @param paddingCharacter The padding character.
   * @returns the formatted result.
   */
  pad: stringPad,
  /**
   * Test whether the given string is strictly equal to an empty string.
   *
   * @param value The string to test.
   * @returns `true` if the given string is empty, `false` otherwise.
   */
  isEmpty: stringIsEmpty,
  /**
   * Test whether the given string is either `undefined`, `null` or equal to an empty string.
   *
   * @param value The string to test.
   * @returns `true` if the given string is blank, `false` otherwise.
   */
  isBlank: stringIsBlank,
  /**
   * Test whether the given string is neither `undefined`, `null` nor equal to an empty string.
   *
   * @param value The string to test.
   * @returns `true` if the given string is filled, `false` otherwise.
   */
  isFilled: stringIsFilled,
  /**
   * Extract the domain name from the given email address.
   *
   * @param email The email address.
   * @returns the corresponding domain name.
   */
  extractEmailDomain: stringExtractEmailDomain,
  /**
   * Capitalizes the first letter of the given string.
   *
   * @param string the string to compute.
   * @returns the result string.
   */
  capitalize: stringCapitalize,
  /**
   * Capitalizes the first letter of each word of the given string.
   *
   * @param string the string to compute.
   * @returns the result string.
   */
  capitalizeEachWord: stringCapitalizeEachWord,
};

export const StringComparators = {
  /**
   * An ascendent natural string comparator.
   */
  naturalAsc: STRING_NATURAL_COMPARATOR_ASC,
  /**
   * An descendent natural string comparator.
   */
  naturalDesc: STRING_NATURAL_COMPARATOR_DESC,
  /**
   * An ascendent natural string comparator from extracted values.
   */
  naturalValueAsc: STRING_NATURAL_VALUE_COMPARATOR_ASC,
  /**
   * An descendent natural string comparator from extracted values.
   */
  naturalValueDesc: STRING_NATURAL_VALUE_COMPARATOR_DESC,
};

export const StringParsers = {
  /**
   * Extract a boolean value from the given string.
   *
   * @param input The boolean-string to parse.
   * @returns the boolean value corresponding to the given string. If the given input is `null`, this methid resturns `undefined`.
   */
  parseBoolean: stringParseBoolean,
};

export const StringRegexs = {
  /**
   * Regex pattern that matches string containing only alpha characters.
   */
  alpha: STRING_ONLY_ALPHA_CHARS_REGEX,
  /**
   * Regex pattern that matches string containing only numeric characters.
   */
  numeric: STRING_ONLY_NUMERIC_CHARS_REGEX,
  /**
   * Regex pattern that matches an email addess.
   */
  email: STRING_EMAIL_VALIDATION_REGEXP,
};

export const StringSymbols = {
  EMPTY,
  FORWARD_SLASH,
  HASHTAG,
  SPACE,
  UNDERSCORE,
  MINUS,
  PLUS,
  DOT,
  COLON,
  WILDCARD,
  PERCENTAGE,
  COMMA,
  QUESTION_MARK,
  UNIT_NORMAL_METRIC,
  UNIT_MASS,
  UNIT_WEIGHT,
};

export const Strings = {
  /**
   * String symbols.
   */
  symbol: StringSymbols,
  /**
   * String helper methods.
   */
  helper: StringHelpers,
  /**
   * String comparators.
   */
  comparator: StringComparators,
  /**
   * String parsers.
   */
  parser: StringParsers,
  /**
   * String regexs.
   */
  regex: StringRegexs,
};
