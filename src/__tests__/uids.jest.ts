import { UIDs } from "../uids";

describe("#UIDs.helper.generate", () => {
  test("should generate a UID", () => {
    const uid = UIDs.helper.generate();

    expect(typeof uid).toBe("string");
    expect(uid).toHaveLength(6);
    expect(/^[a-z0-9]+$/.test(uid)).toBe(true);
  });

  test("should generate unique UIDs", () => {
    const uid1 = UIDs.helper.generate();
    const uid2 = UIDs.helper.generate();

    expect(uid1).not.toBe(uid2);
  });
});
