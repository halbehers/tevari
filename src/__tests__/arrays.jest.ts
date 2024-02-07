import Arrays from "../arrays";
import "@testing-library/jest-dom";

describe("#Array.helper.matchOneOrMore", () => {
  const stringPredicate = (value: string) => value === "win";
  const numberPredicate = (value: number) => value === 4;

  it("should match", () => {
    expect(
      Arrays.helper.matchOneOrMore(
        ["test", "win", "win", "blah"],
        stringPredicate
      )
    ).toBeTruthy();
    expect(Arrays.helper.matchOneOrMore(["win"], stringPredicate)).toBeTruthy();
    expect(
      Arrays.helper.matchOneOrMore(["Snooopy", "win"], stringPredicate)
    ).toBeTruthy();
    expect(
      Arrays.helper.matchOneOrMore([0, 4, 23, 56, 4, 89], numberPredicate)
    ).toBeTruthy();
    expect(Arrays.helper.matchOneOrMore([4], numberPredicate)).toBeTruthy();
    expect(
      Arrays.helper.matchOneOrMore([245, 444, 4], numberPredicate)
    ).toBeTruthy();
  });

  it("should not match", () => {
    expect(
      Arrays.helper.matchOneOrMore(["test", "won", "blah"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneOrMore(["winnie"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneOrMore(["Snooopy", "wiener"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneOrMore([0, 23, 56, 44, 89], numberPredicate)
    ).toBeFalsy();
    expect(Arrays.helper.matchOneOrMore([42], numberPredicate)).toBeFalsy();
    expect(
      Arrays.helper.matchOneOrMore([245, 444], numberPredicate)
    ).toBeFalsy();
    expect(Arrays.helper.matchOneOrMore([], numberPredicate)).toBeFalsy();
    expect(Arrays.helper.matchOneOrMore([], stringPredicate)).toBeFalsy();
  });
});

describe("#Array.helper.matchOneExactly", () => {
  const stringPredicate = (value: string) => value === "win";
  const numberPredicate = (value: number) => value === 4;

  it("should match", () => {
    expect(
      Arrays.helper.matchOneExactly(["test", "win", "blah"], stringPredicate)
    ).toBeTruthy();
    expect(
      Arrays.helper.matchOneExactly(["win"], stringPredicate)
    ).toBeTruthy();
    expect(
      Arrays.helper.matchOneExactly(
        ["Snooopy", "win", "winnie"],
        stringPredicate
      )
    ).toBeTruthy();
    expect(
      Arrays.helper.matchOneExactly([0, 23, 56, 4, 89], numberPredicate)
    ).toBeTruthy();
    expect(Arrays.helper.matchOneExactly([4], numberPredicate)).toBeTruthy();
    expect(
      Arrays.helper.matchOneExactly([245, 444, 4], numberPredicate)
    ).toBeTruthy();
  });

  it("should not match", () => {
    expect(
      Arrays.helper.matchOneExactly(["test", "won", "blah"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneExactly(
        ["carotte", "win", "winnie", "win"],
        stringPredicate
      )
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneExactly(["Snooopy", "wiener"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchOneExactly(
        [0, 23, 4, 56, 4, 44, 89, 4],
        numberPredicate
      )
    ).toBeFalsy();
    expect(Arrays.helper.matchOneExactly([42], numberPredicate)).toBeFalsy();
    expect(
      Arrays.helper.matchOneExactly([245, 444], numberPredicate)
    ).toBeFalsy();
    expect(Arrays.helper.matchOneExactly([], numberPredicate)).toBeFalsy();
    expect(Arrays.helper.matchOneExactly([], stringPredicate)).toBeFalsy();
  });
});

describe("#Array.helper.matchAll", () => {
  const stringPredicate = (value: string) => value === "win";
  const numberPredicate = (value: number) => value === 4;

  it("should match", () => {
    expect(Arrays.helper.matchAll(["win"], stringPredicate)).toBeTruthy();
    expect(
      Arrays.helper.matchAll(["win", "win"], stringPredicate)
    ).toBeTruthy();
    expect(Arrays.helper.matchAll([4, 4, 4], numberPredicate)).toBeTruthy();
    expect(Arrays.helper.matchAll([4], numberPredicate)).toBeTruthy();
  });

  it("should not match", () => {
    expect(
      Arrays.helper.matchAll(["win", "win", "blah"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchAll(["win", "winnie", "win"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchAll(["Snooopy", "wiener"], stringPredicate)
    ).toBeFalsy();
    expect(
      Arrays.helper.matchAll([4, 444, 4, 4, 44, 4], numberPredicate)
    ).toBeFalsy();
    expect(Arrays.helper.matchAll([42], numberPredicate)).toBeFalsy();
    expect(Arrays.helper.matchAll([245, 444], numberPredicate)).toBeFalsy();
    expect(Arrays.helper.matchAll([], numberPredicate)).toBeFalsy();
    expect(Arrays.helper.matchAll([], stringPredicate)).toBeFalsy();
  });
});

describe("#Array.helper.createSuite", () => {
  it("should return the correct suite array", () => {
    expect(Arrays.helper.createSuite(2)).toEqual([1, 2]);
    expect(Arrays.helper.createSuite(5)).toEqual([1, 2, 3, 4, 5]);
    expect(Arrays.helper.createSuite(2, 2)).toEqual([2, 3]);
    expect(Arrays.helper.createSuite(5, 3)).toEqual([3, 4, 5, 6, 7]);
    expect(Arrays.helper.createSuite(5, 3, 0.1)).toEqual([
      3, 3.1, 3.2, 3.3, 3.4,
    ]);
  });
});

describe("#Array.helper.cleanStringArray", () => {
  it("should return a cleaned up array", () => {
    expect(Arrays.helper.cleanStringArray([])).toEqual([]);
    expect(Arrays.helper.cleanStringArray([, null, ""])).toEqual([]);
    expect(
      Arrays.helper.cleanStringArray(["tata", "toto", "", "titi"])
    ).toEqual(["tata", "toto", "titi"]);
    expect(
      Arrays.helper.cleanStringArray([
        "tata",
        "toto",
        "titi",
        "tutti",
        "frutti",
      ])
    ).toEqual(["tata", "toto", "titi", "tutti", "frutti"]);
    expect(
      Arrays.helper.cleanStringArray([
        ,
        null,
        "",
        "tata",
        "toto",
        undefined,
        "titi",
      ])
    ).toEqual(["tata", "toto", "titi"]);
  });
});

describe("#Array.helper.shuffle", () => {
  it("should return shuffled array", () => {
    const numberArray = [1, 2, 3, 4];
    const stringArray = ["toto", "titi", "tutti", "frutti"];

    expect(Arrays.helper.shuffle(numberArray).length).toEqual(
      numberArray.length
    );
    expect(Arrays.helper.shuffle(stringArray).length).toEqual(
      stringArray.length
    );
  });
});

describe("#Array.helper.uniq", () => {
  it("should return the array without any duplicates", () => {
    expect(Arrays.helper.uniq([0, 3, 3, 5, 6, 3, 8, 9, 7, 6])).toEqual([
      0, 3, 5, 6, 8, 9, 7,
    ]);
    expect(Arrays.helper.uniq([0, 4, 42, 6, 3, 8, 9, 7])).toEqual([
      0, 4, 42, 6, 3, 8, 9, 7,
    ]);
    expect(Arrays.helper.uniq([])).toEqual([]);
  });
});

describe("#Array.helper.uniqObjectsByProperty", () => {
  it("should return the array without any duplicates", () => {
    expect(
      Arrays.helper.uniqObjectsByProperty(
        [{ n: 1 }, { n: 3 }, { n: 33 }, { n: 3 }, { n: 5 }],
        "n"
      )
    ).toEqual([{ n: 1 }, { n: 3 }, { n: 33 }, { n: 5 }]);
    expect(
      Arrays.helper.uniqObjectsByProperty(
        [{ n: 1 }, { n: 33 }, { n: 3 }, { n: 5 }],
        "n"
      )
    ).toEqual([{ n: 1 }, { n: 33 }, { n: 3 }, { n: 5 }]);
    expect(Arrays.helper.uniqObjectsByProperty([], "n")).toEqual([]);
  });
});
