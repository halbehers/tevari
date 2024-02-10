import { Strings, EMPTY } from "../strings";

/*
 * Helpers
 */

describe("#Strings.helper.plainify", () => {
  it("should return a plain string", () => {
    const weirdString =
      "ìčí ç'ést pàs lª cápîtãåælè, ć'êst mārsëįllē bębė! Tâvû sùsü, qúę lä fåmīlle, ôn est bïeñ!";
    const plainString =
      "ici c'est pas la capitaaale, c'est marseille bebe! Tavu susu, que la famille, on est bien!";
    expect(Strings.helper.plainify(weirdString)).toEqual(plainString);
  });
});

describe("#Strings.helper.isAlpha", () => {
  it("should return true", () => {
    const alphaString = "QLF";
    expect(Strings.helper.isAlpha(alphaString)).toBeTruthy();
  });
  it("should return false", () => {
    const notAnAlphaString = "#QLF";
    expect(Strings.helper.isAlpha(notAnAlphaString)).toBeFalsy();
  });
});

describe("#Strings.helper.isNumeric", () => {
  it("should return true", () => {
    const numericString = "14518926";
    expect(Strings.helper.isNumeric(numericString)).toBeTruthy();
  });
  it("should return false", () => {
    const notAnNumericString = "QL562F";
    expect(Strings.helper.isNumeric(notAnNumericString)).toBeFalsy();
  });
});

describe("#Strings.helper.isEmpty", () => {
  it("should return true", () => {
    expect(Strings.helper.isEmpty("")).toBeTruthy();
  });
  it("should return false", () => {
    expect(Strings.helper.isEmpty("yo mama")).toBeFalsy();
  });
});

describe("#Strings.helper.isBlank", () => {
  it("should return true", () => {
    expect(Strings.helper.isBlank("")).toBeTruthy();
  });
  it("should return true", () => {
    expect(Strings.helper.isBlank()).toBeTruthy();
  });
  it("should return false", () => {
    expect(Strings.helper.isBlank("yo mama")).toBeFalsy();
  });
});

const TEST_CASES_CC2SC = [
  ["", ""],
  ["helloWorld", "hello_world"],
  ["CapitalizedName", "capitalized_name"],
];

describe("#Strings.helper.camelCaseToSnakeCase", () => {
  test.each(TEST_CASES_CC2SC)(
    "given %s string, returns %s snake_cased",
    (inputStr, snakeCaseExpectedStr) =>
      expect(Strings.helper.camelCaseToSnakeCase(inputStr)).toEqual(
        snakeCaseExpectedStr
      )
  );
});

const TEST_CASES_SC2CC = [
  ["", ""],
  ["hello_world", "helloWorld"],
  ["capitalized_name", "capitalizedName"],
];

describe("#Strings.helper.snakeCaseToCamelCase", () => {
  test.each(TEST_CASES_SC2CC)(
    "given %s string, returns %s camelCased",
    (inputStr, camelCaseExpectedStr) =>
      expect(Strings.helper.snakeCaseToCamelCase(inputStr)).toEqual(
        camelCaseExpectedStr
      )
  );
});

const TEST_CASES_KC2CC = [
  ["", ""],
  ["hello-world", "helloWorld"],
  ["capitalized-name", "capitalizedName"],
];

describe("#Strings.helper.kebabCaseToCamelCase", () => {
  test.each(TEST_CASES_KC2CC)(
    "given %s string, returns %s camelCased",
    (inputStr, camelCaseExpectedStr) =>
      expect(Strings.helper.kebabCaseToCamelCase(inputStr)).toEqual(
        camelCaseExpectedStr
      )
  );
});

describe("#Strings.helper.isString", () => {
  it("should return true", () => {
    expect(Strings.helper.isString("")).toBeTruthy();
    expect(Strings.helper.isString("yo mama")).toBeTruthy();
    expect(Strings.helper.isString("Any weìrd String§")).toBeTruthy();
  });
  it("should return false", () => {
    expect(Strings.helper.isString(45)).toBeFalsy();
    expect(
      Strings.helper.isString(new Date("1993-01-02T15:20:00.000Z"))
    ).toBeFalsy();
    expect(Strings.helper.isString({ name: "Django" })).toBeFalsy();
  });
});

const TEST_CASES_CC2HM = [
  ["", ""],
  ["helloWorld", "hello world"],
  ["capitalized-name", "capitalized name"],
  ["capitalized_name", "capitalized name"],
];

describe("#Strings.helper.humanize", () => {
  test.each(TEST_CASES_CC2HM)(
    "given %s string, returns %s camelCased",
    (inputStr, camelCaseExpectedStr) =>
      expect(Strings.helper.humanize(inputStr)).toEqual(camelCaseExpectedStr)
  );
});

describe("#Strings.helper.pad", () => {
  it("should pad correctly", () => {
    expect(Strings.helper.pad("Dog", 5, " ")).toEqual("Dog  ");
    expect(Strings.helper.pad("Doggy", 5, " ")).toEqual("Doggy");
    expect(Strings.helper.pad("Doggy dog", 5, " ")).toEqual("Doggy dog");
    expect(Strings.helper.pad("", 5, " ")).toEqual("     ");
  });
});

describe("#Strings.helper.equals", () => {
  it("should return true", () => {
    expect(Strings.helper.equals("", "")).toBeTruthy();
    expect(Strings.helper.equals("", "    ")).toBeTruthy();
    expect(
      Strings.helper.equals("yo mama", "yo mama             ")
    ).toBeTruthy();
    expect(
      Strings.helper.equals("   Any weìrd String§    ", "  Any weìrd String§")
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Strings.helper.equals("yo   mama", "yo mama             ")
    ).toBeFalsy();
    expect(
      Strings.helper.equals("   Any   weìrd String§    ", "  Any weìrd String§")
    ).toBeFalsy();
  });
});

describe("#Strings.helper.valueOrEmpty", () => {
  it("should return the correct value", () => {
    expect(Strings.helper.valueOrEmpty("Dog")).toEqual("Dog");
    expect(Strings.helper.valueOrEmpty("Doggy dog")).toEqual("Doggy dog");
    expect(Strings.helper.valueOrEmpty()).toEqual(EMPTY);
    expect(Strings.helper.valueOrEmpty("")).toEqual(EMPTY);
    expect(Strings.helper.valueOrEmpty(false)).toEqual(EMPTY);
  });
});

describe("#Strings.helper.capitalize", () => {
  it("should return the correct value", () => {
    expect(Strings.helper.capitalize("dog")).toEqual("Dog");
    expect(Strings.helper.capitalize("doggy dog")).toEqual("Doggy dog");
    expect(Strings.helper.capitalize("")).toEqual(EMPTY);
  });
});

describe("#Strings.helper.capitalizeEachWord", () => {
  it("should return the correct value", () => {
    expect(Strings.helper.capitalizeEachWord("dog")).toEqual("Dog");
    expect(Strings.helper.capitalizeEachWord("doggy dog")).toEqual("Doggy Dog");
    expect(Strings.helper.capitalizeEachWord("")).toEqual(EMPTY);
  });
});

/*
 * Parsers
 */

describe("#Strings.parser.parseBoolean", () => {
  it("should return true", () => {
    expect(Strings.parser.parseBoolean("true")).toBeTruthy();
    expect(Strings.parser.parseBoolean("TRUE")).toBeTruthy();
    expect(Strings.parser.parseBoolean(" True  ")).toBeTruthy();
  });
  it("should return false", () => {
    expect(Strings.parser.parseBoolean("false")).toBeFalsy();
    expect(Strings.parser.parseBoolean("FALSE")).toBeFalsy();
    expect(Strings.parser.parseBoolean(" False  ")).toBeFalsy();
    expect(Strings.parser.parseBoolean(" Carotte  ")).toBeFalsy();
  });
  it("should return undefined", () => {
    expect(Strings.parser.parseBoolean(null)).toEqual(undefined);
  });
});

/*
 * Comparators
 */

describe("#Strings.comparator.naturalAsc", () => {
  it("should be sorted", () => {
    const unorderedStringArray = ["íam", "Vald", "åkhenaton", "Asterix"];
    const sortedStringArray = ["åkhenaton", "Asterix", "íam", "Vald"];
    expect(
      unorderedStringArray.sort((a, b) => Strings.comparator.naturalAsc(a, b))
    ).toEqual(sortedStringArray);
  });
});

describe("#Strings.comparator.naturalDesc", () => {
  it("should be sorted", () => {
    const unorderedStringArray = ["íam", "Vald", "åkhenaton", "Asterix"];
    const sortedStringArray = ["Vald", "íam", "Asterix", "åkhenaton"];
    expect(
      unorderedStringArray.sort((a, b) => Strings.comparator.naturalDesc(a, b))
    ).toEqual(sortedStringArray);
  });
});
