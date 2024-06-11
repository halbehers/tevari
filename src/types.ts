import { STRING_EMAIL_VALIDATION_REGEXP } from "./strings";

export type Pretify<Type> = {
  [K in keyof Type]: Type[K];
} & {};

export type Spread<Type> = {
  [K in keyof Type]: Type[K];
};

export type Branded<Type, Brand extends string> = Type & { __brand: Brand };

export const isEmailAddress = (email: string): email is EmailAddress => {
  return !!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP);
}

export const assertEmailAddress = (email: string): asserts email is EmailAddress => {
  if (!email.toLowerCase().match(STRING_EMAIL_VALIDATION_REGEXP)) {
    throw new Error(`InvalidArgument: [${email}] is not an email address`);
  }
}

export type EmailAddress = Branded<string, "EmailAddress">;
