export const functionIdentity = <T>(value: T) => value;

export const functionIdentityAs = <T>(value: unknown) => value as T;

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

export const functionVoid = () => {
  // Nothing to do.
};

export const FunctionHelpers = {
  identity: functionIdentity,
  identityAs: functionIdentityAs,
  attribute: functionAttribute,
  void: functionVoid,
};

export type Procedure0 = () => void;
export type Procedure1<T> = (value: T) => void;
export type Procedure = Procedure0;
export type Consumer<T> = Procedure1<T>;
export type Procedure2<T, U> = (value1: T, value2: U) => void;
export type Procedure3<T, U, V> = (value1: T, value2: U, value3: V) => void;
export type Predicate0 = () => boolean;
export type Predicate<T> = (value: T) => boolean;
export type Supplier<T> = Function0<T>;
export type Function0<T> = () => T;
export type Function1<T, U> = (value: T) => U;
export type Function2<T, U, V> = (value1: T, value2: U) => V;
export type Function3<T, U, V, W> = (value1: T, value2: U, value3: V) => W;

const Functions = {
  helper: FunctionHelpers,
};

export default Functions;
