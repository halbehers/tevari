import Functions from "../functions";

/*
 * Helpers
 */

describe("#Functions.helper.identity", () => {
  it("should return the exact given value", () => {
    expect(Functions.helper.identity()("test")).toEqual("test");
    expect(Functions.helper.identity()(42)).toEqual(42);
  });
});

describe("#Functions.helper.attribute", () => {
  it("should return the given value as the given type", () => {
    expect(Functions.helper.attribute("name")({ name: "test" })).toEqual(
      "test"
    );
  });
});
