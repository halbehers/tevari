import { STRING_EMAIL_VALIDATION_REGEXP } from "./strings";

export type Pretify<Type> = {
  [K in keyof Type]: Type[K];
} & {};

export type Spread<Type> = {
  [K in keyof Type]: Type[K];
};

export type Equal<X, Y> = X extends Y ? (Y extends X ? true : false) : false;

declare const __brand: unique symbol
type Brand<B> = { [__brand]: B }
export type Branded<T, B extends string> = T & Brand<B>;

export class TypeError extends Error {}

/**
 * Checks whether the given value corresponds to the given brand name.
 * 
 * @param value The value to test.
 * @param brand The name of the expected branded type.
 * @returns `true` if the given value corresponds to the given brand name, `false` otherwise.
 */
export const typeIsBrand = <T, B extends Branded<T, string>> (value: T, brand: string): value is B => {
  return (value as unknown as B)[__brand] === brand;
}

export type ValidatorCreateBrandOptions = {
  validator: <T, B extends Branded<T, string>> (v: T) => v is B;
}

/**
 * Creates a `Branded` type from the given value.
 * 
 * @param value The value from which to create the `Branded` type.
 * @param validator (optional) A custom validator to validate the given type.
 * @returns The `Branded` type.
 */
export const typeCreateBranded = <B extends Branded<T, string>, T> (value: T, validator?: (v: T) => v is B): B => {
  if (validator && !validator(value)) {
    throw new TypeError(`TypeError: [${value}] doesn't match the desired brand.`)
  }
  return value as unknown as B;
}

export type EmailAddress = Branded<string, "EmailAddress">;

/**
 * Check whether the given string is an email address.
 * 
 * @param email the potential email string.
 * @returns `true` if the given string is an email address, `false` otherwise.
 */
export const typeIsEmailAddress = (email: string): email is EmailAddress => {
  return !!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP);
}

/**
 * Asserts that the given string is an email address.
 * 
 * @param email the potential email string.
 * @throws `TypeError` if the gievn string is not a valid email address.
 */
export const typeAssertEmailAddress = (email: string): asserts email is EmailAddress => {
  if (!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP)) {
    throw new Error(`TypeError: [${email}] is not an email address`);
  }
}

export const TypeHelpers = {
  /**
   * Checks whether the given value corresponds to the given brand name.
   * 
   * @param value The value to test.
   * @param brand The name of the expected branded type.
   * @returns `true` if the given value corresponds to the given brand name, `false` otherwise.
   */
  isBrand: typeIsBrand,
  /**
   * Creates a `Branded` type from the given value.
   * 
   * @param value The value from which to create the `Branded` type.
   * @param validator (optional) A custom validator to validate the given type.
   * @returns The `Branded` type.
   */
  createBranded: typeCreateBranded,
  /**
   * Check whether the given string is an email address.
   * 
   * @param email the potential email string.
   * @returns `true` if the given string is an email address, `false` otherwise.
   */
  isEmailAddress: typeIsEmailAddress,
  /**
   * Asserts that the given string is an email address.
   * 
   * @param email the potential email string.
   * @throws `TypeError` if the gievn string is not a valid email address.
   */
  assertEmailAddress: typeAssertEmailAddress,
};

export const Types = {
  /**
   * Type helper methods.
   */
  helper: TypeHelpers,
};
