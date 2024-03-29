/**
 * Lists all static attributes of a given class.
 *
 * @param classType The type of the class.
 * @param filter A predicate used to filter out unwanted methods or attributes.
 * @returns an array of result values.
 */
export const reflectionListStaticAttributesAs = <T>(
  classType: unknown | T,
  filter?: (name: string) => boolean
): T[] => {
  const objectPropertyNames = Object.getOwnPropertyNames(class {});
  const names = Object.getOwnPropertyNames(classType).filter((name) => {
    if (objectPropertyNames.includes(name)) return false;
    return filter ? filter(name) : true;
  });
  return names
    .map((name) => Object.getOwnPropertyDescriptor(classType, name))
    .filter((descriptor) => descriptor !== undefined)
    .map((descriptor) =>
      descriptor !== undefined ? descriptor.value : undefined
    );
};

export const ReflexionHelpers = {
  /**
   * Lists all static attributes of a given class.
   *
   * @param classType The type of the class.
   * @param filter A predicate used to filter out unwanted methods or attributes.
   * @returns an array of result values.
   */
  listStaticAttributesAs: reflectionListStaticAttributesAs,
};

export const Reflexions = {
  /**
   * Reflexion helper methods.
   */
  helper: ReflexionHelpers,
};
