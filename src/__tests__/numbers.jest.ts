import { numberTo2digits } from "../numbers";

describe("#numberTo2digits", () => {
  it("should format number to 2 digit", () => {
    expect(numberTo2digits(0)).toEqual("00");
    expect(numberTo2digits(2)).toEqual("02");
    expect(numberTo2digits(42)).toEqual("42");
    expect(numberTo2digits(420)).toEqual("420");
  });
});
