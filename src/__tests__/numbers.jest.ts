import { Numbers } from "../numbers";
import { COMMA } from "../strings";

/*
 * Helpers
 */

describe("#Numbers.helper.average", () => {
  it("should calculate the correct average", () => {
    expect(Numbers.helper.average([0, 42, 420, 56.3])).toEqual(129.575);
    expect(Numbers.helper.average([0, 42])).toEqual(21);
    expect(Numbers.helper.average([0, 21, 42])).toEqual(21);
    expect(Numbers.helper.average([0, 21, 42, 42])).toEqual(26.25);
  });

  it("should calculate the correct rounded average", () => {
    expect(Numbers.helper.average([0, 42, 420, 56.3], true)).toEqual(130);
    expect(Numbers.helper.average([0, 21, 42], true)).toEqual(21);
    expect(Numbers.helper.average([0, 21, 42, 42], true)).toEqual(26);
  });
});

describe("#Numbers.helper.random", () => {
  it("should render a correct random number", () => {
    expect(Numbers.helper.random(0, 10)).toBeGreaterThanOrEqual(0);
    expect(Numbers.helper.random(0, 10)).toBeLessThanOrEqual(10);
    expect(Numbers.helper.random(34, 78)).toBeGreaterThanOrEqual(34);
    expect(Numbers.helper.random(34, 78)).toBeLessThanOrEqual(78);
  });
});

/*
 * Comparators
 */

describe("#Numbers.comparator.asc", () => {
  const randomArray = [420, 65, 42, 22, 1312];

  it("should sort correctly", () => {
    expect(randomArray.sort(Numbers.comparator.asc)).toEqual([
      22, 42, 65, 420, 1312,
    ]);
  });
});

describe("#Numbers.comparator.desc", () => {
  const randomArray = [420, 65, 42, 22, 1312];

  it("should sort correctly", () => {
    expect(randomArray.sort(Numbers.comparator.desc)).toEqual([
      1312, 420, 65, 42, 22,
    ]);
  });
});

describe("#Numbers.comparator.valueAsc", () => {
  const randomArray = [
    { value: 420 },
    { value: 65 },
    { value: 42 },
    { value: 22 },
    { value: 1312 },
  ];

  it("should sort correctly", () => {
    expect(
      randomArray.sort(Numbers.comparator.valueAsc(({ value }) => value))
    ).toEqual([
      { value: 22 },
      { value: 42 },
      { value: 65 },
      { value: 420 },
      { value: 1312 },
    ]);
  });
});

describe("#Numbers.comparator.valueDesc", () => {
  const randomArray = [
    { value: 420 },
    { value: 65 },
    { value: 42 },
    { value: 22 },
    { value: 1312 },
  ];

  it("should sort correctly", () => {
    expect(
      randomArray.sort(Numbers.comparator.valueDesc(({ value }) => value))
    ).toEqual([
      { value: 1312 },
      { value: 420 },
      { value: 65 },
      { value: 42 },
      { value: 22 },
    ]);
  });
});

/*
 * Formatters
 */

describe("#Numbers.formatter.percentage", () => {
  it("should format correctly", () => {
    expect(Numbers.formatter.percentage(-56)).toEqual("0%");
    expect(Numbers.formatter.percentage(-56, { withNegativeValues: true })).toEqual("-56%");
    expect(Numbers.formatter.percentage(-56.5, { nbOfDecimals: 1, withNegativeValues: true })).toEqual("-56.5%");
    expect(Numbers.formatter.percentage(4514)).toEqual("100%");
    expect(Numbers.formatter.percentage(45)).toEqual("45%");
    expect(Numbers.formatter.percentage(45, { minDigits: 3 })).toEqual("045%");
    expect(Numbers.formatter.percentage(45.678)).toEqual("45.7%");
    expect(Numbers.formatter.percentage(45.678, { nbOfDecimals: 3 })).toEqual(
      "45.678%"
    );
    expect(
      Numbers.formatter.percentage(45.678, {
        nbOfDecimals: 3,
        separator: COMMA,
      })
    ).toEqual("45,678%");
  });
});

describe("#Numbers.formatter.floatWithDecimal", () => {
  it("should format correctly", () => {
    expect(Numbers.formatter.floatWithDecimal()).toEqual("0.0");
    expect(
      Numbers.formatter.floatWithDecimal(undefined, { separator: COMMA })
    ).toEqual("0,0");
    expect(Numbers.formatter.floatWithDecimal(4514)).toEqual("4 514.0");
    expect(Numbers.formatter.floatWithDecimal(4514.42)).toEqual("4 514.4");
    expect(
      Numbers.formatter.floatWithDecimal(4514.42, { nbOfDecimals: 3 })
    ).toEqual("4 514.420");
    expect(
      Numbers.formatter.floatWithDecimal(4514, {
        separator: COMMA,
        nbOfDecimals: 3,
      })
    ).toEqual("4 514,000");
  });
});

describe("#Numbers.formatter.float", () => {
  it("should format correctly", () => {
    expect(Numbers.formatter.float()).toEqual("0");
    expect(Numbers.formatter.float(undefined, { separator: COMMA })).toEqual(
      "0"
    );
    expect(Numbers.formatter.float(4514)).toEqual("4 514");
    expect(Numbers.formatter.float(4514.42)).toEqual("4 514.4");
    expect(Numbers.formatter.float(4514.42, { nbOfDecimals: 3 })).toEqual(
      "4 514.420"
    );
    expect(
      Numbers.formatter.float(4514, { separator: COMMA, nbOfDecimals: 3 })
    ).toEqual("4 514,000");
  });
});

describe("#Numbers.formatter.integer", () => {
  it("should format correctly", () => {
    expect(Numbers.formatter.integer(0, { minDigits: 2 })).toEqual("00");
    expect(Numbers.formatter.integer(2, { minDigits: 2 })).toEqual("02");
    expect(Numbers.formatter.integer(42, { minDigits: 2 })).toEqual("42");
    expect(Numbers.formatter.integer(420, { minDigits: 2 })).toEqual("420");
    expect(Numbers.formatter.integer(420, { minDigits: 5 })).toEqual("00420");
  });
});

describe("#Numbers.formatter.large", () => {
  it("should format correctly", () => {
    expect(Numbers.formatter.large(0)).toEqual("0");
    expect(Numbers.formatter.large(42)).toEqual("42");
    expect(Numbers.formatter.large(4206763)).toEqual("4 206 763");
    expect(
      Numbers.formatter.large(4206763, { thousandSeparator: COMMA })
    ).toEqual("4,206,763");
    expect(
      Numbers.formatter.large(4206763.67, { thousandSeparator: COMMA })
    ).toEqual("4,206,763.7");
    expect(
      Numbers.formatter.large(4206763.67, {
        thousandSeparator: COMMA,
        nbOfDecimals: 3,
      })
    ).toEqual("4,206,763.670");
    expect(
      Numbers.formatter.large(4206763.67, {
        thousandSeparator: COMMA,
        nbOfDecimals: 2,
      })
    ).toEqual("4,206,763.67");
    expect(
      Numbers.formatter.large(4206763.67, { separator: COMMA, nbOfDecimals: 2 })
    ).toEqual("4 206 763,67");
  });
});
