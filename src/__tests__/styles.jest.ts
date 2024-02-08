import "@testing-library/jest-dom";
import { styleEm, styleRem } from "../styles";

/*
 * Helpers
 */

describe("#styleEm", () => {
  it("should return the correct em value", () => {
    expect(styleEm(16)).toEqual("1em");
    expect(styleEm(24)).toEqual("1.5em");
  });
});

describe("#styleRem", () => {
  it("should return the correct rem value", () => {
    expect(styleRem(16)).toEqual("1rem");
    expect(styleRem(24)).toEqual("1.5rem");
  });
});
