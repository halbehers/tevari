import unorm from "unorm";
import { Function1 } from "./functions";

export const EMPTY = "";
export const FORWARD_SLASH = "/";
export const HASHTAG = "#";
export const SPACE = " ";
export const UNDERSCORE = "_";
export const MINUS = "-";
export const PLUS = "+";
export const DOT = ".";
export const COLON = ":";
export const WILDCARD = "*";
export const PERCENTAGE = "%";
export const COMMA = ",";
export const UNIT_NORMAL_METRIC = "Nm";
export const UNIT_MASS = "g/m²";
export const UNIT_WEIGHT = "g";

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

export const stringPlainify = (value: string): string => {
  const result: string[] = [];
  for (let i = 0; i < value.length; i++) {
    const char = value.charAt(i);
    const plainChar = SPECIALS_TO_PLAIN_CHARS.get(char);
    result.push(plainChar ? plainChar : char);
  }
  return result.join(EMPTY);
};

export const STRING_ONLY_ALPHA_CHARS_REGEX = /^[a-z]+$/i;

export const stringIsAlpha = (char: string): boolean => {
  return char.match(STRING_ONLY_ALPHA_CHARS_REGEX) !== null;
};
export const STRING_ONLY_NUMERIC_CHARS_REGEX = /^[1-9]+$/i;

export const stringIsNumeric = (char: string): boolean => {
  return char.match(STRING_ONLY_NUMERIC_CHARS_REGEX) !== null;
};

export const stringCompareNatural = (a: string, b: string): number => {
  return stringPlainify(a.toLowerCase()).localeCompare(
    stringPlainify(b.toLowerCase())
  );
};

export const stringIsEmpty = (value: string): boolean => {
  return value === EMPTY;
};

export const stringIsBlank = (value?: string | null): boolean => {
  return value === undefined || value === null || stringIsEmpty(value);
};

export const stringCamelCaseToSnakeCase = (text: string): string => {
  return text
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

export const stringSnakeCaseToCamelCase = (text: string): string => {
  return text.replace(/(?!^)_(.)/g, (_, char) => char.toUpperCase());
};

export const stringKebabCaseToCamelCase = (text: string): string => {
  return text.replace(/-./g, (x) => x[1].toUpperCase());
};

export const stringFormatExtension = (extension: string) =>
  `${DOT}${extension}`;

export const stringFormatExtensions = (extensions: string[]) =>
  extensions.map(stringFormatExtension).join(", ");

export const stringIsString = <T>(data: T | string): data is string => {
  return typeof data === "string";
};

export const stringHumanize = (value: string) => {
  const words = value.match(/[A-Za-z][a-z]*|[0-9]+/g) || [];

  return words.map((word) => word.toLowerCase()).join(" ");
};

export const stringParseBoolean = (
  input?: string | null
): boolean | undefined => {
  if (!input) return;
  try {
    return JSON.parse(input.toLowerCase());
  } catch (e) {
    return;
  }
};

export const stringPad = (
  value: string,
  nbOfCharacters: number,
  paddingCharacter = EMPTY
) => {
  const val = value;
  if (Math.abs(nbOfCharacters) <= val.length) {
    return val;
  }
  const m = Math.max(Math.abs(nbOfCharacters) - value.length || 0, 0);
  const pad = Array(m + 1).join(String(paddingCharacter).charAt(0));
  return nbOfCharacters < 0 ? pad + val : val + pad;
};

export const stringEquals = (value1: string, value2?: string) => {
  return value1.trim() === value2?.trim();
};

export const stringValueOrEmpty = (value?: string | false): string => {
  if (value === false || stringIsBlank(value)) return EMPTY;

  return value as string;
};

export const stringExtractEmailDomain = (email: string): string | undefined => {
  const results = email.toLowerCase().match(/.*@(.*)\..*/);
  if (results?.length === 2) return results[1];
};

const regExpReplace = /[\u0300-\u036f]/g;

export const stringValueComparator = <T>(
  valueExtractor: Function1<T, string>,
  firstElem?: string
) => {
  return (a: T, b: T): number => {
    const nameA = stringTrimAndLower(valueExtractor(a));
    const nameB = stringTrimAndLower(valueExtractor(b));

    if (firstElem) {
      if (nameA.startsWith(firstElem) && !nameB.startsWith(firstElem)) {
        return -1;
      }
      if (!nameA.startsWith(firstElem) && nameB.startsWith(firstElem)) {
        return 1;
      }
    }
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  };
};

export const stringTrimLowerAndSplitText = (text: string): Array<string> => {
  return unorm
    .nfd(text.toLowerCase().replace(/\s+/g, " ").trim())
    .replace(regExpReplace, "")
    .split(" ");
};

export const stringTrimAndLower = (text: string): string => {
  return unorm
    .nfd(text.toLowerCase().replace(/\s+/g, " ").trim())
    .replace(regExpReplace, "");
};

export const stringGetDelimiterParts = (delimiter: string): string[] => {
  let delimiterParts: string[] = stringTrimLowerAndSplitText(delimiter);
  if (
    delimiterParts.some((text) => ["et", "and"].includes(text.toLowerCase()))
  ) {
    delimiterParts.push("&");
  }
  delimiterParts = delimiterParts.filter(
    (text) => !["et", "and"].includes(text.toLowerCase())
  );

  return delimiterParts;
};

export const stringFilterBy = <T>(
  searchedText: string,
  entities: T[],
  valueExtractor: Function1<T, string>
): T[] => {
  let filteredEntities: T[] = [];
  const filteredSearchedText = searchedText.trim().replace("’", "'");
  if (filteredSearchedText) {
    const listText = stringGetDelimiterParts(filteredSearchedText);
    filteredEntities = entities
      .filter((entity) => {
        const value = valueExtractor(entity);
        return listText.every(
          (text) =>
            unorm
              .nfd(value.toLowerCase())
              .replace(regExpReplace, "")
              .includes(text) ||
            unorm
              .nfd(value.toLowerCase())
              .replace(/[^\w\s]/gi, "")
              .includes(text)
        );
      })
      .sort(
        stringValueComparator(
          valueExtractor,
          stringTrimAndLower(filteredSearchedText)
        )
      );
  }

  return filteredEntities;
};

export const StringHelpers = {
  plainify: stringPlainify,
  isString: stringIsString,
  snakeCaseToCamelCase: stringSnakeCaseToCamelCase,
  kebabCaseToCamelCase: stringKebabCaseToCamelCase,
  camelCaseToSnakeCase: stringCamelCaseToSnakeCase,
  humanize: stringHumanize,
  isAlpha: stringIsAlpha,
  isNumeric: stringIsNumeric,
  equals: stringEquals,
  valueOrEmpty: stringValueOrEmpty,
  pad: stringPad,
  isEmpty: stringIsEmpty,
  isBlank: stringIsBlank,
  extractEmailDomain: stringExtractEmailDomain,
  trimLowerAndSplitText: stringTrimLowerAndSplitText,
  trimAndLower: stringTrimAndLower,
  getDelimiterParts: stringGetDelimiterParts,
  filterBy: stringFilterBy,
};

export const StringComparators = {
  natural: stringCompareNatural,
  stringValue: stringValueComparator,
};

export const StringFormaters = {
  formatExtension: stringFormatExtension,
  formatExtensions: stringFormatExtensions,
};

export const StringParsers = {
  parseBoolean: stringParseBoolean,
};

export const StringRegexs = {
  alpha: STRING_ONLY_ALPHA_CHARS_REGEX,
  numeric: STRING_ONLY_NUMERIC_CHARS_REGEX,
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
  UNIT_NORMAL_METRIC,
  UNIT_MASS,
  UNIT_WEIGHT,
};

const Strings = {
  symbol: StringSymbols,
  helper: StringHelpers,
  comparator: StringComparators,
  formater: StringFormaters,
  parser: StringParsers,
  regex: StringRegexs,
};

export default Strings;
