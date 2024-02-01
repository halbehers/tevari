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
  listStaticAttributesAs: reflectionListStaticAttributesAs,
};

const Reflexions = {
  helper: ReflexionHelpers,
};

export default Reflexions;
