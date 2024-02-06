import { arrayCreateSuite } from "../arrays";
import "@testing-library/jest-dom";

describe("#arrayCreateSuite", () => {
  it("should return an array of the correct length", () => {
    expect(arrayCreateSuite(2)).toEqual([1, 2]);
    expect(arrayCreateSuite(5)).toEqual([1, 2, 3, 4, 5]);
  });
});
