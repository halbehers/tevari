import { STRING_EMAIL_VALIDATION_REGEXP } from "./strings";

export type Pretify<T> = {
  [K in keyof T]: T[K];
} & {};

export const isEmailAddress = (email: string): email is EmailAddress => {
  return !!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP);
}

export const assertEmailAddress = (email: string): asserts email is EmailAddress => {
  if (!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP)) {
    throw new Error(`InvalidArgument: [${email}] is not an email address`);
  }
}

export type EmailAddress = string & { __brand: "EmailAddress" };