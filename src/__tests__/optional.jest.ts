import Optional from "../optional";

describe("#Optional::empty", () => {
  it("should return an empty optional", () => {
    expect(Optional.empty().isPresent()).toBeFalsy();
  });
});

describe("#Optional::filled", () => {
  it("should return an filled optional", () => {
    expect(Optional.filled(42).isPresent()).toBeTruthy();
  });
});

describe("#Optional::of", () => {
  it("should return an empty optional", () => {
    expect(Optional.of().isPresent()).toBeFalsy();
    expect(Optional.of(null).isPresent()).toBeFalsy();
    expect(Optional.of(undefined).isPresent()).toBeFalsy();
  });
  it("should return an filled optional", () => {
    expect(Optional.of(42).isPresent()).toBeTruthy();
    expect(Optional.of("").isPresent()).toBeTruthy();
  });
});

describe("#Optional::equals", () => {
  it("should return true", () => {
    expect(Optional.of(42).equals(42)).toBeTruthy();
    expect(Optional.of("").equals("")).toBeTruthy();
    expect(Optional.of("Test").equals("Test")).toBeTruthy();
    expect(Optional.of(false).equals(false)).toBeTruthy();
    expect(Optional.of(true).equals(true)).toBeTruthy();
    expect(
      Optional.of({ name: "test", value: 42 }).equals(
        { name: "other test", value: 42 },
        (a, b) => a.value === b.value
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(Optional.of(42).equals(41)).toBeFalsy();
    expect(Optional.of("").equals(" ")).toBeFalsy();
    expect(Optional.of("Test").equals("Test 2")).toBeFalsy();
    expect(Optional.of(false).equals(true)).toBeFalsy();
    expect(Optional.of(true).equals(false)).toBeFalsy();
    expect(
      Optional.of({ name: "test", value: 42 }).equals(
        { name: "other test", value: 42 },
        (a, b) => a.name === b.name
      )
    ).toBeFalsy();
  });
});

describe("#Optional::set", () => {
  it("should return the right value", () => {
    const optional = Optional.filled(42);
    optional.set(41);
    expect(optional.get()).toEqual(41);
    expect(Optional.filled("test").set("aaah").get()).toEqual("aaah");
  });
});

describe("#Optional::get", () => {
  it("should return the right value", () => {
    const optional = Optional.filled(42);
    expect(optional.get()).toEqual(42);
    expect(Optional.filled("test").get()).toEqual("test");
  });
});

describe("#Optional::filter", () => {
  it("should return an empty optional", () => {
    expect(
      Optional.empty()
        .filter((value) => value !== "test")
        .isEmpty()
    ).toBeTruthy();
    expect(
      Optional.filled("test")
        .filter((value) => value !== "test")
        .isEmpty()
    ).toBeTruthy();
  });
  it("should return an filled optional", () => {
    expect(
      Optional.filled("test")
        .filter((value) => value === "test")
        .get()
    ).toEqual("test");
  });
});

describe("#Optional::map", () => {
  it("should return the mapped value", () => {
    expect(
      Optional.filled("test")
        .map((value) => `${value} - mapped`)
        .get()
    ).toEqual("test - mapped");
  });
  it("should return an empty optional", () => {
    expect(
      Optional.empty()
        .map((value) => `${value} - mapped`)
        .isEmpty()
    ).toBeTruthy();
  });
});

describe("#Optional::flatMap", () => {
  it("should return the mapped value", () => {
    expect(
      Optional.filled("test")
        .flatMap((value) => Optional.of(`${value} - mapped`))
        .get()
    ).toEqual("test - mapped");
  });
  it("should return an empty optional", () => {
    expect(
      Optional.filled("test")
        .flatMap(() => Optional.empty())
        .isEmpty()
    ).toBeTruthy();
    expect(
      Optional.empty()
        .flatMap(() => Optional.empty())
        .isEmpty()
    ).toBeTruthy();
    expect(
      Optional.empty()
        .flatMap((value) => Optional.of(`${value} - mapped`))
        .isEmpty()
    ).toBeTruthy();
  });
});

describe("#Optional::isPresent", () => {
  it("should return true", () => {
    expect(Optional.filled(42).isPresent()).toBeTruthy();
  });
  it("should return false", () => {
    expect(Optional.empty().isPresent()).toBeFalsy();
  });
});

describe("#Optional::isEmpty", () => {
  it("should return true", () => {
    expect(Optional.empty().isEmpty()).toBeTruthy();
  });
  it("should return false", () => {
    expect(Optional.filled(42).isEmpty()).toBeFalsy();
  });
});

describe("#Optional::ifPresent", () => {
  it("should execute the callback", () => {
    let testValue = "test";
    Optional.filled("value").ifPresent((value) => {
      testValue = value;
    });
    expect(testValue).toEqual("value");
  });
  it("should not execute the callback", () => {
    let testValue = "test";
    Optional.empty<string>().ifPresent((value) => {
      testValue = value;
    });
    expect(testValue).toEqual("test");
  });
});

describe("#Optional::orElse", () => {
  it("should return the optional value", () => {
    expect(Optional.filled(42).orElse(44)).toEqual(42);
  });
  it("should return the other value", () => {
    expect(Optional.empty().orElse(44)).toEqual(44);
  });
});

describe("#Optional::orUndefined", () => {
  it("should return the optional value", () => {
    expect(Optional.filled(42).orUndefined()).toEqual(42);
  });
  it("should return undefined", () => {
    expect(Optional.empty().orUndefined()).toEqual(undefined);
  });
});

describe("#Optional::orNull", () => {
  it("should return the optional value", () => {
    expect(Optional.filled(42).orNull()).toEqual(42);
  });
  it("should return undefined", () => {
    expect(Optional.empty().orNull()).toEqual(null);
  });
});

describe("#Optional::orElseGet", () => {
  it("should return the optional value", () => {
    expect(Optional.filled(42).orElseGet(() => 44)).toEqual(42);
  });
  it("should return the supplier value", () => {
    expect(Optional.empty().orElseGet(() => 44)).toEqual(44);
  });
});

describe("#Optional::orElseThrow", () => {
  it("should return the optional value", () => {
    expect(Optional.filled(42).orElseThrow(() => new Error("nope"))).toEqual(
      42
    );
  });
  it("should return throw the error", async () => {
    expect(() => Optional.empty().orElseThrow(() => new Error("nope"))).toThrow(
      "nope"
    );
  });
});

describe("#Optional::resolve", () => {
  it("should return the right value", () => {
    expect(Optional.filled(42).resolve((value) => value + 2, 21)).toEqual(44);
  });
  it("should return the other value", () => {
    expect(Optional.empty<number>().resolve((value) => value + 2, 21)).toEqual(
      21
    );
  });
});
