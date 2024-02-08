import IndexSignatures from "../indexSignatures";

/*
 * Helpers
 */

describe("#IndexSignatures.helper.fromArray", () => {
  it("should return an index signature", () => {
    expect(
      IndexSignatures.helper.fromArray(
        [
          { id: "key1", value: "value 1" },
          { id: "key2", value: "value 2" },
          { id: "key3", value: "value 3" },
        ],
        ({ id }) => id
      )
    ).toEqual({
      key1: { id: "key1", value: "value 1" },
      key2: { id: "key2", value: "value 2" },
      key3: { id: "key3", value: "value 3" },
    });
  });
});

describe("#IndexSignatures.helper.fromArrayValues", () => {
  it("should return an index signature", () => {
    expect(
      IndexSignatures.helper.fromArrayValues(
        [
          { id: "key1", value: "value 1" },
          { id: "key2", value: "value 2" },
          { id: "key3", value: "value 3" },
        ],
        ({ id }) => id,
        ({ value }) => value
      )
    ).toEqual({
      key1: "value 1",
      key2: "value 2",
      key3: "value 3",
    });
  });
});

describe("#IndexSignatures.helper.mapToArray", () => {
  it("should return an array", () => {
    expect(
      IndexSignatures.helper.mapToArray(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (id, value) => `${id}: ${value} - mapped`
      )
    ).toEqual([
      "key1: value 1 - mapped",
      "key2: value 2 - mapped",
      "key3: value 3 - mapped",
    ]);
  });
  it("should filter and return an array", () => {
    expect(
      IndexSignatures.helper.mapToArray(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (id, value) => `${id}: ${value} - mapped`,
        (id, _) => id !== "key2"
      )
    ).toEqual(["key1: value 1 - mapped", "key3: value 3 - mapped"]);
  });
});

describe("#IndexSignatures.helper.mapValues", () => {
  it("should return an array", () => {
    expect(
      IndexSignatures.helper.mapValues(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (value) => `${value} - mapped`
      )
    ).toEqual({
      key1: "value 1 - mapped",
      key2: "value 2 - mapped",
      key3: "value 3 - mapped",
    });
  });

  it("should filter and return an array", () => {
    expect(
      IndexSignatures.helper.mapValues(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (value) => `${value} - mapped`,
        (value) => value !== "value 2"
      )
    ).toEqual({
      key1: "value 1 - mapped",
      key3: "value 3 - mapped",
    });
  });
});

describe("#IndexSignatures.helper.same", () => {
  it("should return true", () => {
    expect(
      IndexSignatures.helper.same(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        }
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      IndexSignatures.helper.same(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        {
          key1: "value 1",
          key2: "value 3",
          key3: "value 3",
        }
      )
    ).toBeFalsy();
    expect(
      IndexSignatures.helper.same(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        {
          key1: "value 1",
          key4: "value 2",
          key3: "value 3",
        }
      )
    ).toBeFalsy();
  });
});

describe("#IndexSignatures.helper.includes", () => {
  it("should return true", () => {
    expect(
      IndexSignatures.helper.includes(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        [
          {
            key67: "value 5rfnbejks",
            key69: "value 62ZYT78",
          },
          {
            key1: "value 1",
            key2: "value 2",
            key3: "value 3",
          },
          {
            key5: "value 5",
            key6: "value 6",
          },
        ]
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      IndexSignatures.helper.includes(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        [
          {
            key67: "value 5rfnbejks",
            key69: "value 62ZYT78",
          },
          {
            key1: "value 1",
            key2: "value 3",
            key3: "value 3",
          },
          {
            key5: "value 5",
            key6: "value 6",
          },
        ]
      )
    ).toBeFalsy();
    expect(
      IndexSignatures.helper.includes(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        [
          {
            key67: "value 5rfnbejks",
            key69: "value 62ZYT78",
          },
          {
            key1: "value 1",
            key4: "value 2",
            key3: "value 3",
          },
          {
            key5: "value 5",
            key6: "value 6",
          },
        ]
      )
    ).toBeFalsy();
    expect(
      IndexSignatures.helper.includes(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        [
          {
            key67: "value 5rfnbejks",
            key69: "value 62ZYT78",
          },
          {
            key5: "value 5",
            key6: "value 6",
          },
        ]
      )
    ).toBeFalsy();
  });
});

describe("#IndexSignatures.helper.toString", () => {
  it("should display the correct string with string values", () => {
    expect(
      IndexSignatures.helper.toString({
        key1: "value 1",
        key2: "value 2",
        key3: "value 3",
      })
    ).toEqual("{ key1: 'value 1', key2: 'value 2', key3: 'value 3' }");
  });

  it("should display the correct string with integer values", () => {
    expect(
      IndexSignatures.helper.toString({
        key1: 43,
        key2: 42,
        key3: 41,
      })
    ).toEqual("{ key1: 43, key2: 42, key3: 41 }");
  });
  it("should display the correct string with float values", () => {
    expect(
      IndexSignatures.helper.toString({
        key1: 43.4,
        key2: 42.42,
        key3: 41.4321,
      })
    ).toEqual("{ key1: 43.4, key2: 42.42, key3: 41.4321 }");
  });
  it("should display the correct string with boolean values", () => {
    expect(
      IndexSignatures.helper.toString({
        key1: true,
        key2: false,
        key3: false,
      })
    ).toEqual("{ key1: true, key2: false, key3: false }");
  });
});

describe("#IndexSignatures.helper.toArray", () => {
  it("should return an array of strings", () => {
    expect(
      IndexSignatures.helper.toArray({
        key1: "value 1",
        key2: "value 2",
        key3: "value 3",
      })
    ).toEqual(["value 1", "value 2", "value 3"]);
  });
  it("should return an array of numbers", () => {
    expect(
      IndexSignatures.helper.toArray({
        key1: 42,
        key2: 41,
        key3: 43,
      })
    ).toEqual([42, 41, 43]);
  });
  it("should return an array of objects", () => {
    expect(
      IndexSignatures.helper.toArray({
        key1: { name: "name 1" },
        key2: { name: "name 2" },
        key3: { name: "name 3" },
      })
    ).toEqual([{ name: "name 1" }, { name: "name 2" }, { name: "name 3" }]);
  });
});

describe("#IndexSignatures.helper.entriestoArray", () => {
  it("should return an array of strings", () => {
    expect(
      IndexSignatures.helper.entriesToArray(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (key, value) => `${key}: ${value}`
      )
    ).toEqual(["key1: value 1", "key2: value 2", "key3: value 3"]);
  });
  it("should return an array of objects", () => {
    expect(
      IndexSignatures.helper.entriesToArray(
        {
          key1: { name: "name 1" },
          key2: { name: "name 2" },
          key3: { name: "name 3" },
        },
        (key, { name }) => `${key}: ${name}`
      )
    ).toEqual(["key1: name 1", "key2: name 2", "key3: name 3"]);
  });
});

describe("#IndexSignatures.helper.keysToArray", () => {
  it("should return an array of keys", () => {
    expect(
      IndexSignatures.helper.keysToArray({
        key1: "value 1",
        key2: "value 2",
        key3: "value 3",
      })
    ).toEqual(["key1", "key2", "key3"]);
  });
});

describe("#IndexSignatures.helper.filter", () => {
  it("should return an empty index signature", () => {
    expect(
      IndexSignatures.helper.filter(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (key, value) => key === "key2" && value === "value 3"
      )
    ).toEqual({});
  });
  it("should return an filtered index signature", () => {
    expect(
      IndexSignatures.helper.filter(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (key) => key !== "key2"
      )
    ).toEqual({
      key1: "value 1",
      key3: "value 3",
    });
  });
  it("should return an filtered index signature", () => {
    expect(
      IndexSignatures.helper.filter(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (_, value) => value === "value 2"
      )
    ).toEqual({
      key2: "value 2",
    });
  });
  it("should return the same index signature", () => {
    expect(
      IndexSignatures.helper.filter(
        {
          key1: "value 1",
          key2: "value 2",
          key3: "value 3",
        },
        (key, value) => key === "key1" || value !== "value 1"
      )
    ).toEqual({
      key1: "value 1",
      key2: "value 2",
      key3: "value 3",
    });
  });
});

describe("#IndexSignatures.helper.groupBy", () => {
  it("should return an index signature grouped by codes", () => {
    expect(
      IndexSignatures.helper.groupBy(
        [
          { code: "bazinga", value: "Sheldon" },
          { code: "cagwama", value: "Mexicano" },
          { code: "bazinga", value: "Cooper" },
          { code: "bazinga", value: "Big Bang" },
          { code: "cagwama", value: "Tequila" },
          { code: "dog", value: "Snoop" },
        ],
        ({ code }) => code
      )
    ).toEqual({
      bazinga: [
        { code: "bazinga", value: "Sheldon" },
        { code: "bazinga", value: "Cooper" },
        { code: "bazinga", value: "Big Bang" },
      ],
      cagwama: [
        { code: "cagwama", value: "Mexicano" },
        { code: "cagwama", value: "Tequila" },
      ],
      dog: [{ code: "dog", value: "Snoop" }],
    });
  });
});

describe("#IndexSignatures.helper.groupByAndMap", () => {
  it("should return an index signature grouped by codes", () => {
    expect(
      IndexSignatures.helper.groupByAndMap(
        [
          { code: "bazinga", value: "Sheldon" },
          { code: "cagwama", value: "Mexicano" },
          { code: "bazinga", value: "Cooper" },
          { code: "bazinga", value: "Big Bang" },
          { code: "cagwama", value: "Tequila" },
          { code: "dog", value: "Snoop" },
        ],
        ({ code }) => code,
        ({ value }) => value
      )
    ).toEqual({
      bazinga: [ "Sheldon", "Cooper", "Big Bang" ],
      cagwama: [ "Mexicano", "Tequila" ],
      dog: ["Snoop"],
    });
  });
});
