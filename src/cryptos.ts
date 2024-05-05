/**
 * Generates a UID.
 *
 * @returns the generated UID.
 */
export const cryptoUIDGenerate = () => {
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const stringFirstPart = ("000" + firstPart.toString(36)).slice(-3);
  const stringSecondPart = ("000" + secondPart.toString(36)).slice(-3);
  return stringFirstPart + stringSecondPart;
};


export type HashAlgorythm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

/**
 * Hashes the given string using the given algorythm.
 * @param value The string to hash.
 * @param algorythm The hash algorythm to use.
 * @returns the result.
 */
export const cryptoHashString = async (value: string, algorythm: HashAlgorythm = "SHA-256") => {
  const uint8Array = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest(algorythm, uint8Array);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hash;
};

export const CryptoHelpers = {
  /**
   * Generates a UID.
   *
   * @returns the generated UID.
   */
  generateUID: cryptoUIDGenerate,
  hashString: cryptoHashString,
};

export const Cryptos = {
  /**
   * UID helper methods.
   */
  helper: CryptoHelpers,
};
