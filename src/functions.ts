/**
 * A function that returns the exact given value.
 *
 * @param value The value parameter of the function.
 * @returns a function that returns the exact given value.
 */
export const functionIdentity =
  () =>
  <T>(value: T) =>
    value;

/**
 * A function that returns the given value casted to the given type.
 *
 * @param value The value parameter of the function.
 * @returns a function that returns the given value casted to the given type.
 */
export const functionIdentityAs =
  () =>
  <T>(value: unknown) =>
    value as T;

/**
 * A function that extracts an attribute from the given value.
 *
 * @param attributeName The name of the attribute to extract.
 * @returns a function that extract the attrobute from the given object.
 */
export const functionAttribute = <T, U>(attributeName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: T) => {
    const propertyDescriptor = Object.getOwnPropertyDescriptor(
      value,
      attributeName
    );
    if (propertyDescriptor !== undefined && propertyDescriptor.value !== null) {
      return propertyDescriptor.value as U;
    }
  };
};

/**
 * A void function.
 *
 * @returns a void function.
 */
export const functionVoid = () => () => {
  // Nothing to do.
};

export const FunctionHelpers = {
  /**
   * A function that returns the exact given value.
   *
   * @param value The value parameter of the function.
   * @returns a function that returns the exact given value.
   */
  identity: functionIdentity,
  /**
   * A function that returns the given value casted to the given type.
   *
   * @param value The value parameter of the function.
   * @returns a function that returns the given value casted to the given type.
   */
  identityAs: functionIdentityAs,
  /**
   * A function that extracts an attribute from the given value.
   *
   * @param attributeName The name of the attribute to extract.
   * @returns a function that extract the attrobute from the given object.
   */
  attribute: functionAttribute,
  /**
   * A void function.
   *
   * @returns a void function.
   */
  void: functionVoid,
};

/**
 * A void function that takes no parameter.
 */
export type Procedure = () => void;
/**
 * A void function that takes one parameter.
 */
export type Consumer1<T> = (value: T) => void;
/**
 * A void function that takes one parameter. Alias to `Consumer1`.
 */
export type Consumer<T> = Consumer1<T>;
/**
 * A void function that takes two parameters.
 */
export type Consumer2<T, U> = (value1: T, value2: U) => void;
/**
 * A void function that takes three parameters.
 */
export type Consumer3<T, U, V> = (value1: T, value2: U, value3: V) => void;
/**
 * A function that takes one parameter and returns a value.
 */
export type Function1<T, U> = (value: T) => U;
/**
 * A function that takes one parameter and returns a value. Alias to `Function1`.
 */
export type Function<T, U> = Function1<T, U>;
/**
 * A function that takes two parameters and returns a value.
 */
export type Function2<T, U, V> = (value1: T, value2: U) => V;
/**
 * A function that takes three parameters and returns a value.
 */
export type Function3<T, U, V, W> = (value1: T, value2: U, value3: V) => W;
/**
 * A function that takes no parameter and returns a value.
 */
export type Supplier<T> = () => T;
/**
 * A boolean function that takes no parameter. Alias to `Supplier<boolean>`;
 */
export type Predicate0 = Supplier<boolean>;
/**
 * A boolean function that takes one parameter.
 */
export type Predicate<T> = (value: T) => boolean;

export const Functions = {
  /**
   * Function helper methods.
   */
  helper: FunctionHelpers,
};
