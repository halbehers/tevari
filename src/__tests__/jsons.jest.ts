import { Jsons } from "../jsons";

/*
 * Helpers
 */

describe("#JSONs.helper.flatten", () => {
  const jsonTestObj = {
    banana: {
      color: "yellow",
    },
    orange: {
      color: "orange",
    },
    peach: {
      color: ["red", "orange"],
    },
  };
  it("should return the exact given value", () => {
    expect(Jsons.helper.flatten(jsonTestObj)).toEqual({
      "banana.color": "yellow",
      "orange.color": "orange",
      "peach.color[0]": "red",
      "peach.color[1]": "orange",
    });
  });
});
