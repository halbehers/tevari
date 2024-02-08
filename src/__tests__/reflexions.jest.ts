import Reflexions from "../reflexions";

/*
 * Helpers
 */

describe("#Reflexions.helper.listStaticAttributesAs", () => {
  class StaticTest {
    static VALUE_1 = "value 1";
    static VALUE_2 = "value 2";
    static VALUE_3 = "value 3";
  }
  it("should list all attributes values", () => {
    expect(Reflexions.helper.listStaticAttributesAs(StaticTest)).toEqual([
      "value 1",
      "value 2",
      "value 3",
    ]);
  });
  it("should list only filtered attributes values", () => {
    expect(
      Reflexions.helper.listStaticAttributesAs(
        StaticTest,
        (name) => name !== "VALUE_2"
      )
    ).toEqual(["value 1", "value 3"]);
  });
});
