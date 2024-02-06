import {
  stringCompareNatural,
  stringIsAlpha,
  stringPlainify,
  stringCamelCaseToSnakeCase,
  stringIsEmpty,
  stringIsBlank,
  stringSnakeCaseToCamelCase,
} from "../strings";
import "@testing-library/jest-dom";

describe("#stringPlainify", () => {
  it("should return a plain string", () => {
    const weirdString =
      "ìčí ç'ést pàs lª cápîtãåælè, ć'êst mārsëįllē bębė! Tâvû sùsü, qúę lä fåmīlle, ôn est bïeñ!";
    const plainString =
      "ici c'est pas la capitaaale, c'est marseille bebe! Tavu susu, que la famille, on est bien!";
    expect(stringPlainify(weirdString)).toEqual(plainString);
  });
});

describe("#stringCompareNatural", () => {
  it("should be sorted", () => {
    const unorderedStringArray = ["íam", "Vald", "åkhenaton", "Asterix"];
    const sortedStringArray = ["åkhenaton", "Asterix", "íam", "Vald"];
    expect(
      unorderedStringArray.sort((a, b) => stringCompareNatural(a, b))
    ).toEqual(sortedStringArray);
  });
});

describe("#stringIsAlpha", () => {
  it("should return true", () => {
    const alphaString = "QLF";
    expect(stringIsAlpha(alphaString)).toBeTruthy();
  });
  it("should return false", () => {
    const notAnAlphaString = "#QLF";
    expect(stringIsAlpha(notAnAlphaString)).toBeFalsy();
  });
});

const TEST_CASES_CC2SC = [
  ["", ""],
  ["helloWorld", "hello_world"],
  ["CapitalizedName", "capitalized_name"],
];

describe("#stringCamelCaseToSnakeCase", () => {
  test.each(TEST_CASES_CC2SC)(
    "given %s string, returns %s snake_cased",
    (inputStr, snakeCaseExpectedStr) =>
      expect(stringCamelCaseToSnakeCase(inputStr)).toEqual(snakeCaseExpectedStr)
  );
});

const TEST_CASES_SC2CC = [
  ["", ""],
  ["hello_world", "helloWorld"],
  ["capitalized_name", "capitalizedName"],
];

describe("#stringSnakeCaseToCamelCase", () => {
  test.each(TEST_CASES_SC2CC)(
    "given %s string, returns %s camelCased",
    (inputStr, camelCaseExpectedStr) =>
      expect(stringSnakeCaseToCamelCase(inputStr)).toEqual(camelCaseExpectedStr)
  );
});

describe("#stringIsEmpty", () => {
  it("should return true", () => {
    expect(stringIsEmpty("")).toBeTruthy();
  });
  it("should return false", () => {
    expect(stringIsEmpty("yo mama")).toBeFalsy();
  });
});

describe("#stringIsBlank", () => {
  it("should return true", () => {
    expect(stringIsBlank("")).toBeTruthy();
  });
  it("should return true", () => {
    expect(stringIsBlank()).toBeTruthy();
  });
  it("should return false", () => {
    expect(stringIsBlank("yo mama")).toBeFalsy();
  });
});
