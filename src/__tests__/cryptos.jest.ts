import { Cryptos } from "../crypto";

describe("#Cryptos.helper.generate", () => {
  test("should generate a UID", () => {
    const uid = Cryptos.helper.generateUID();

    expect(typeof uid).toBe("string");
    expect(uid).toHaveLength(6);
    expect(/^[a-z0-9]+$/.test(uid)).toBe(true);
  });

  test("should generate unique UIDs", () => {
    const uid1 = Cryptos.helper.generateUID();
    const uid2 = Cryptos.helper.generateUID();

    expect(uid1).not.toBe(uid2);
  });
});
