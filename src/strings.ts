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
export const THREE_DOTS = "…";

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
  ["…", "..."],
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
 * Replace all occurrences.
 *
 * @param value The string to compute.
 * @param pattern The pattern to look for.
 * @param replaceValue The replacer.
 * @returns the result.
 */
export const stringReplaceAll = (
  value: string,
  pattern: RegExp | string,
  replaceValue: (substring: string, ...args: any[]) => string | string,
) => {
  return value.replace(new RegExp(pattern, "g"), replaceValue);
};

export interface ICamelCaseConverterOptions {
  firstLetter?: "lower" | "upper";
}

/**
 * Converts the given camel case formatted string into a snake case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 * @deprecated use `stringSnakize` instead.
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
 * @deprecated use `stringKebabize` instead.
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
 * @param options The converter options.
 * @returns the converted string result.
 * @deprecated use `stringCamelize` instead.
 */
export const stringSnakeCaseToCamelCase = (text: string, options?: ICamelCaseConverterOptions): string => {
  const { firstLetter = "lower" } = options ?? {};
  const result = text.replace(/(?!^)_(.)/g, (_, char) => char.toUpperCase());

  return firstLetter === "lower" ? result : stringCapitalize(result);
};

/**
 * Converts the given kebab case formatted string into a camel case format.
 *
 * @param text The string to convert.
 * @param options The converter options.
 * @returns the converted string result.
 * @deprecated use `stringCamelize` instead.
 */
export const stringKebabCaseToCamelCase = (text: string, options?: ICamelCaseConverterOptions): string => {
  const { firstLetter = "lower" } = options ?? {};
  const result = text.replace(/-./g, (x) => x[1].toUpperCase());

  return firstLetter === "lower" ? result : stringCapitalize(result);
};

/**
 * Tests whether the given data parameter is a camel case formatted string.
 *
 * @param data The string to test.
 * @returns `true` if the given data is camel case, `false` otherwise.
 */
export const stringIsCamelCase = (value: string): boolean => {
  const lowerCamelCase = stringCamelize(value);

  if (value === lowerCamelCase) return true;

  return value === stringCapitalize(lowerCamelCase);
};

/**
 * Tests whether the given data parameter is a pascal case formatted string.
 *
 * @param data The string to test.
 * @returns `true` if the given data is camel case, `false` otherwise.
 */
export const stringIsPascalCase = (value: string): boolean => {
  const pascalized = stringPascalize(value);

  return value === pascalized;
};

/**
 * Tests whether the given data parameter is a kebab case formatted string.
 *
 * @param data The string to test.
 * @returns `true` if the given data is kebab case, `false` otherwise.
 */
export const stringIsKebabCase = (value: string): boolean => {
  const kebabized = stringKebabize(value);

  return value === kebabized;
};

/**
 * Tests whether the given data parameter is a snake case formatted string.
 *
 * @param data The string to test.
 * @returns `true` if the given data is snake case, `false` otherwise.
 */
export const stringIsSnakeCase = (value: string): boolean => {
  const snakized = stringSnakize(value);

  return value === snakized;
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
 * @param value the string to convert to camelCaqse format.
 * @param options The converter options.
 * @returns the formatted result.
 */
export const stringCamelize = (value: string, options?: ICamelCaseConverterOptions) => {
  const { firstLetter = "lower" } = options ?? {};
  const result = value
    .replace(/[_-]+/g, " ")
    .replace(/\s./g, (x) => x[1].toUpperCase())
    .replace(/\s+/g, "");

  return firstLetter === "lower" ? result : stringCapitalize(result);
};

/**
 * Pascalize the given string.
 *
 * @param value the string to convert to PascalCase format.
 * @returns the formatted result.
 */
export const stringPascalize = (value: string) => {
  return stringCamelize(value, { firstLetter: "upper" });
};

/**
 * Converts the given string into a kebab-case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringKebabize = (text: string): string => {
  return text
    .replace(/[\s_]+/g, "-")
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

/**
 * Converts the given string into a snake_case format.
 *
 * @param text The string to convert.
 * @returns the converted string result.
 */
export const stringSnakize = (text: string): string => {
  return text
    .replace(/[\s-]+/g, "_")
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
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
 * Capitalizes the first letter of the given string and lower everything else.
 *
 * @param string the string to compute.
 * @returns the result string.
 */
export const stringCapitalizeAll = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

/**
 * Capitalizes the first letter of the given string.
 *
 * @param string the string to compute.
 * @returns the result string.
 */
export const stringCapitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
   * Replace all occurrences.
   *
   * @param value The string to compute.
   * @param pattern The pattern to look for.
   * @param replaceValue The replacer.
   * @returns the result.
   */
  replaceAll: stringReplaceAll,
  /**
   * Converts the given snake case formatted string into a camel case format.
   *
   * @param text The string to convert.
   * @param options The converter options.
   * @returns the converted string result.
   * @deprecated use `camelize` instead.
   */
  snakeCaseToCamelCase: stringSnakeCaseToCamelCase,
  /**
   * Converts the given camel case formatted string into a kebab case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   * @deprecated use `kebabize` instead.
   */
  camelCaseToKebabCase: stringCamelCaseToKebabCase,
  /**
   * Converts the given kebab case formatted string into a camel case format.
   *
   * @param text The string to convert.
   * @param options The converter options.
   * @returns the converted string result.
   * @deprecated use `camelize` instead.
   */
  kebabCaseToCamelCase: stringKebabCaseToCamelCase,
  /**
   * Converts the given camel case formatted string into a snake case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   * @deprecated use `snakize` instead.
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
   * @param options The converter options.
   * @returns the formatted result.
   */
  camelize: stringCamelize,
  /**
   * Pascalize the given string.
   *
   * @param value the string to convert to PascalCase format.
   * @returns the formatted result.
   */
  pascalize: stringPascalize,
  /**
   * Converts the given string into a kebab-case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  kebabize: stringKebabize,
  /**
   * Converts the given string into a snake_case format.
   *
   * @param text The string to convert.
   * @returns the converted string result.
   */
  snakize: stringSnakize,
  /**
   * Tests whether the given data parameter is a camel case formatted string.
   *
   * @param data The string to test.
   * @returns `true` if the given data is camel case, `false` otherwise.
   */
  isCamelCase: stringIsCamelCase,
  /**
   * Tests whether the given data parameter is a pascal case formatted string.
   *
   * @param data The string to test.
   * @returns `true` if the given data is camel case, `false` otherwise.
   */
  isPascalCase: stringIsPascalCase,
  /**
   * Tests whether the given data parameter is a kebab case formatted string.
   *
   * @param data The string to test.
   * @returns `true` if the given data is kebab case, `false` otherwise.
   */
  isKebabCase: stringIsKebabCase,
  /**
   * Tests whether the given data parameter is a snake case formatted string.
   *
   * @param data The string to test.
   * @returns `true` if the given data is snake case, `false` otherwise.
   */
  isSnakeCase: stringIsSnakeCase,
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
   * Capitalizes the first letter of the given string and lower everything else.
   *
   * @param string the string to compute.
   * @returns the result string.
   */
  capitalizeAll: stringCapitalizeAll,
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
  THREE_DOTS,
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

export class TString<T> {
  public constructor(private readonly value: string | T) {}

  /**
   * Tests whether the given data parameter is a string.
   *
   * @returns `true` if the given data is a string, `false` otherwise.
   */
  public isString() {
    return stringIsString(this.value);
  }

  /**
   * Gets the value as plain string.
   *
   * @returns the string value.
   */
  public get(): string {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return this.value as string;
  }

  /**
   * Plainify the given string, converting every special character into its plain brother.
   *
   * @returns a plainified string.
   */
  public plainify() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringPlainify(this.value as string));
  }

  /**
   * Replace all occurrences.
   *
   * @param pattern The pattern to look for.
   * @param replaceValue The replacer.
   * @returns the result.
   */
  public replaceAll(pattern: RegExp | string, replaceValue: (substring: string, ...args: any[]) => string | string) {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringReplaceAll(this.value as string, pattern, replaceValue));
  }

  /**
   * Humanize the given string.
   *
   * @returns the formatted result.
   */
  public humanize() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringHumanize(this.value as string));
  }

  /**
   * Camelize the given string.
   *
   * @param options The converter options.
   * @returns the formatted result.
   */
  public camelize(options?: ICamelCaseConverterOptions) {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringCamelize(this.value as string, options));
  }

  /**
   * Pascalize the given string.
   *
   * @returns the formatted result.
   */
  public pascalize() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringPascalize(this.value as string));
  }

  /**
   * Converts the given string into a kebab-case format.
   *
   * @returns the formatted result.
   */
  public kebabize() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringKebabize(this.value as string));
  }

  /**
   * Converts the given string into a snake_case format.
   *
   * @returns the formatted result.
   */
  public snakize() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringSnakize(this.value as string));
  }

  /**
   * Tests whether the given data parameter is a camel case formatted string.
   *
   * @returns `true` if the given data is camel case, `false` otherwise.
   */
  public isCamelCase() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsCamelCase(this.value as string);
  }

  /**
   * Tests whether the given data parameter is a pascal case formatted string.
   *
   * @returns `true` if the given data is spacal case, `false` otherwise.
   */
  public isPascalCase() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsPascalCase(this.value as string);
  }

  /**
   * Tests whether the given data parameter is a kebab case formatted string.
   *
   * @returns `true` if the given data is kebab case, `false` otherwise.
   */
  public isKebabCase() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsKebabCase(this.value as string);
  }

  /**
   * Tests whether the given data parameter is a snake case formatted string.
   *
   * @returns `true` if the given data is snake case, `false` otherwise.
   */
  public isSnakeCase() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsSnakeCase(this.value as string);
  }

  /**
   * Tests whether the given string contains only alpha characters.
   *
   * @returns `true` if the given string only contains alpha characters, `false` otherwise.
   */
  public isAlpha() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsAlpha(this.value as string);
  }

  /**
   * Tests whether the given string contains only numeric characters.
   *
   * @returns `true` if the given string only contains numeric characters, `false` otherwise.
   */
  public isNumeric() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsNumeric(this.value as string);
  }

  /**
   * Test whether the given string is strictly equal to an empty string.
   *
   * @returns `true` if the given string is empty, `false` otherwise.
   */
  public isEmpty() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsEmpty(this.value as string);
  }

  /**
   * Test whether the given string is either `undefined`, `null` or equal to an empty string.
   *
   * @returns `true` if the given string is blank, `false` otherwise.
   */
  public isBlank() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsBlank(this.value as string);
  }

  /**
   * Test whether the given string is neither `undefined`, `null` nor equal to an empty string.
   *
   * @returns `true` if the given string is filled, `false` otherwise.
   */
  public isFilled() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringIsFilled(this.value as string);
  }

  /**
   * Test whether the two given string trimed value are equal.
   *
   * @param value The value to compare with.
   * @returns `true` if the two values are equal once trimed, `false` otherwise.
   */
  public equals(value: string) {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringEquals(this.value as string, value);
  }

  /**
   * Converted any given blank values to an empty string (""). If the given value contains a string, the method will return it unarmed.
   *
   * @returns the exact given string if not blank, an empty string otherwise.
   */
  public valueOrEmpty() {
    return new TString(stringValueOrEmpty(this.value as string | false));
  }

  /**
   * Formats the given string value to contain at least the given number of characters,
   * adding the given padding character at the end of the value if needed.
   *
   * @param nbOfCharacters The desired minimum number of characters.
   * @param paddingCharacter The padding character.
   * @returns the formatted result.
   */
  public pad(nbOfCharacters: number, paddingCharacter = EMPTY) {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringPad(this.value as string, nbOfCharacters, paddingCharacter));
  }

  /**
   * Extract the domain name from the given email address.
   *
   * @returns the corresponding domain name.
   */
  public extractEmailDomain() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringExtractEmailDomain(this.value as string));
  }

  /**
   * Capitalizes the first letter of the given string and lower everything else.
   *
   * @returns the result string.
   */
  public capitalizeAll() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringCapitalizeAll(this.value as string));
  }

  /**
   * Capitalizes the first letter of the given string.
   *
   * @returns the result string.
   */
  public capitalize() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringCapitalize(this.value as string));
  }

  /**
   * Capitalizes the first letter of each word of the given string.
   *
   * @returns the result string.
   */
  public capitalizeEachWord() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return new TString(stringCapitalizeEachWord(this.value as string));
  }

  /**
   * Extract a boolean value from the given string.
   *
   * @returns the boolean value corresponding to the given string. If the given input is `null`, this methid resturns `undefined`.
   */
  public parseBoolean() {
    if (!this.isString()) throw Error("[TString] value is not a string.");

    return stringParseBoolean(this.value as string);
  }
}
