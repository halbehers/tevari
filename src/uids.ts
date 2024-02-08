/**
 * Generates a UID.
 * 
 * @returns the generated UID.
 */
export const uidGenerate = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const stringFirstPart = ("000" + firstPart.toString(36)).slice(-3);
  const stringSecondPart = ("000" + secondPart.toString(36)).slice(-3);
  return stringFirstPart + stringSecondPart;
};

export const UIDHelpers = {
  generate: uidGenerate,
};

const UIDs = {
  helper: UIDHelpers,
};

export default UIDs;
