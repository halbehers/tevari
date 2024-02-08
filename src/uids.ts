/**
 * Generates a UID.
 *
 * @returns the generated UID.
 */
export const uidGenerate = () => {
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const stringFirstPart = ("000" + firstPart.toString(36)).slice(-3);
  const stringSecondPart = ("000" + secondPart.toString(36)).slice(-3);
  return stringFirstPart + stringSecondPart;
};

export const UIDHelpers = {
  /**
   * Generates a UID.
   *
   * @returns the generated UID.
   */
  generate: uidGenerate,
};

const UIDs = {
  /**
   * UID helper methods.
   */
  helper: UIDHelpers,
};

export default UIDs;
