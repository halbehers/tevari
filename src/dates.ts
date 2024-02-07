import moment from "moment";

import { FORWARD_SLASH } from "./strings";
import { Order } from "./misc";

export const DATE_DEFAULT_SEPARATOR = FORWARD_SLASH;

/**
 * Gets today's date as a string formated in french format.
 *
 * @param separator The separator between day, month and year.
 * @returns today's date as a string.
 */
export const dateToday = (separator = DATE_DEFAULT_SEPARATOR): string => {
  const now = new Date(Date.now());
  return dateFormat(now, { separator, format: "short-date-fr" });
};

/**
 * Type of handled date formats.
 */
export type DateFormat =
  | "short-date-fr"
  | "short-date-us"
  | "short-date-time-fr"
  | "short-date-time-us";

/**
 * Options for date fomatters.
 */
export interface DateFormatOptions {
  /**
   * The separator between day, month and year.
   */
  separator?: string;
  /**
   * The desired date format.
   */
  format?: DateFormat;
}

const DATE_TO_FORMATED: {
  [format: string]: (moment: moment.Moment, separator?: string) => string;
} = {
  ["short-date-fr"]: (moment, separator) =>
    moment.format(`DD${separator}MM${separator}YYYY`),
  ["short-date-us"]: (moment, separator) =>
    moment.format(`MM${separator}DD${separator}YYYY`),
  ["short-date-time-fr"]: (moment, separator) =>
    moment.format(`DD${separator}MM${separator}YYYY HH:mm`),
  ["short-date-time-us"]: (moment, separator) =>
    moment.format(`MM${separator}DD${separator}YYYY HH:mm`),
};

/**
 * Formats a date.
 * 
 * @param date The date to format.
 * @param options Options.
 * @returns The given date formated accordingly to the given options.
 */
export const dateFormat = (
  date?: Date,
  options?: DateFormatOptions
): string => {
  const { separator = DATE_DEFAULT_SEPARATOR, format = "short-date-fr" } =
    options ?? {};

  if (!date) {
    return "-";
  }
  return DATE_TO_FORMATED[format](moment(date), separator);
};

/**
 * Gets a date comparator function in the given order.
 * 
 * @param order The order of the result.
 * @returns a comparator function in the given order.
 */
export const dateGetComparator =
  (order: Order = "desc") =>
  (a: Date, b: Date) => {
    const aTime = a.getTime();
    const bTime = b.getTime();

    if (order === "asc") return aTime - bTime;

    return bTime - aTime;
  };

/**
 * An ascendent date comparator.
 */
export const DATE_COMPARATOR_ASC = dateGetComparator("asc");
/**
 * An descendent date comparator.
 */
export const DATE_COMPARATOR_DESC = dateGetComparator("desc");

/**
 * Gets a formated date comparator function in the given order.
 * 
 * @param order The order of the result.
 * @returns a comparator function in the given order.
 */
export const dateGetAsStringComparator =
  (dateFormat: string, order: Order = "desc") =>
  (a: string, b: string) => {
    const date1 = moment(a, dateFormat).toDate();
    const date2 = moment(b, dateFormat).toDate();

    return dateGetComparator(order)(date1, date2);
  };

/**
 * An ascendent formated date comparator.
 */
export const DATE_AS_STRING_COMPARATOR_ASC = dateGetAsStringComparator("asc");
/**
 * An descendent formated date comparator.
 */
export const DATE_AS_STRING_COMPARATOR_DESC = dateGetAsStringComparator("desc");

/**
 * Gets a Date corresponding to now.
 * 
 * @returns a `Date` object.
 */
export const dateNow = (): Date => moment(Date.now()).toDate();

/**
 * Gets a Date corresponding to the given number of days in the past.
 * 
 * @param nbOfDays The number of days in the past.
 * @returns a `Date` object.
 */
export const dateDaysAgo = (nbOfDays: number = 1): Date => {
  const today = dateNow();
  today.setDate(today.getDate() - nbOfDays);
  return today;
};

/**
 * Gets a Date corresponding to the given number of days in the future.
 * 
 * @param nbOfDays The number of days in the future.
 * @returns a `Date` object.
 */
export const dateInDays = (nbOfDays: number = 1): Date => {
  const today = dateNow();
  today.setDate(today.getDate() + nbOfDays);
  return today;
};

/**
 * Gets a Date corresponding to yesterday.
 * 
 * @returns a `Date` object.
 */
export const dateYesterday = (): Date => dateDaysAgo();

/**
 * Gets a Date corresponding to yesterday.
 * 
 * @returns a `Date` object.
 */
export const dateTomorrow = (): Date => dateInDays();

/**
 * Tests whether the first given date is before the second given date.
 * 
 * @param date The first date to compare.
 * @param date The second date to compare.
 * @returns `true` if the first given date is before the second given date, `false` otherwise.
 */
export const dateIsBefore = (date1: Date | number, date2: Date | number): boolean =>
  date1 < date2;

/**
 * Tests whether the first given date is after the second given date.
 * 
 * @param date The first date to compare.
 * @param date The second date to compare.
 * @returns `true` if the first given date is after the second given date, `false` otherwise.
 */
export const dateIsAfter = (date1: Date | number, date2: Date | number): boolean =>
  date1 > date2;

/**
 * Tests whether the first given date is the same as the second given date.
 * 
 * @param date The first date to compare.
 * @param date The second date to compare.
 * @returns `true` if the first given date is the same as the second given date, `false` otherwise.
 */
export const dateIsSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDay() === date2.getDay() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

/**
 * Tests whether the given date happened before the given number of days in the future relatively to today.
 * 
 * @param date The date to compare.
 * @param nbOfDays The number of days in the future.
 * @returns `true` if the given date happened before `today + nbOfDays`, `false` otherwise.
 */
export const dateIsBeforeInDays = (date: Date, nbOfDays: number = 1): boolean =>
  dateIsBefore(date, dateInDays(nbOfDays));

/**
 * Tests whether the given date happens after the given number of days in the future relatively to today.
 * 
 * @param date The date to compare.
 * @param nbOfDays The number of days in the future.
 * @returns `true` if the given date happens after `today + nbOfDays`, `false` otherwise.
 */
export const dateIsAfterInDays = (date: Date, nbOfDays: number = 1): boolean =>
  dateIsAfter(date, dateInDays(nbOfDays));

/**
 * Tests whether the given date happened before the given number of days in the past relatively to today.
 * 
 * @param date The date to compare.
 * @param nbOfDays The number of days in the future.
 * @returns `true` if the given date happened before `today - nbOfDays`, `false` otherwise.
 */
export const dateIsBeforeDaysAgo = (date: Date, nbOfDays: number = 1): boolean =>
  dateIsBefore(date, dateDaysAgo(nbOfDays));

/**
 * Tests whether the given date happens after the given number of days in the past relatively to today.
 * 
 * @param date The date to compare.
 * @param nbOfDays The number of days in the future.
 * @returns `true` if the given date happens after `today - nbOfDays`, `false` otherwise.
 */
export const dateIsAfterDaysAgo = (date: Date, nbOfDays: number = 1): boolean =>
  dateIsAfter(date, dateDaysAgo(nbOfDays));

/**
 * Tests whether the given date happens today.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happens today, `false` otherwise.
 */
export const dateIsToday = (date: Date): boolean => dateIsSameDay(date, dateNow());

/**
 * Tests whether the given date happened before today.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happened before today, `false` otherwise.
 */
export const dateIsPast = (date: Date): boolean =>
  !dateIsToday(date) && dateIsBefore(date, dateNow());

/**
 * Tests whether the given date happens after today.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happens after today, `false` otherwise.
 */
export const dateIsFuture = (date: Date): boolean =>
  !dateIsToday(date) && dateIsAfter(date, dateNow());

/**
 * Tests whether the given date happens tomorrow.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happens tomorrow, `false` otherwise.
 */
export const dateIsTomorrow = (date: Date) =>
  dateIsSameDay(date, dateTomorrow());

/**
 * Tests whether the given date happened yesterday.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happened yesterday, `false` otherwise.
 */
export const dateIsYesterday = (date: Date) =>
  dateIsSameDay(date, dateYesterday());

/**
 * Tests whether the given date happened the given number of days in the past.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happened `today - nbOfDays`, `false` otherwise.
 */
export const dateIsDaysAgo = (date: Date, nbOfDays: number = 1) =>
  dateIsSameDay(date, dateDaysAgo(nbOfDays));

/**
 * Tests whether the given date happens the given number of days in the future.
 * 
 * @param date The date to compare.
 * @returns `true` if the given date happens `today + nbOfDays`, `false` otherwise.
 */
export const dateIsInDays = (date: Date, nbOfDays: number = 1) =>
  dateIsSameDay(date, dateInDays(nbOfDays));

export const DateHelpers = {
  format: dateFormat,
  today: dateToday,
  now: dateNow,
  daysAgo: dateDaysAgo,
  inDays: dateInDays,
  yesterday: dateYesterday,
  tomorrow: dateTomorrow,
  isBefore: dateIsBefore,
  isAfter: dateIsAfter,
  isSameDay: dateIsSameDay,
  isBeforeInDays: dateIsBeforeInDays,
  isAfterInDays: dateIsAfterInDays,
  isBeforeDaysAgo: dateIsBeforeDaysAgo,
  isAfterDaysAgo: dateIsAfterDaysAgo,
  isToday: dateIsToday,
  isPast: dateIsPast,
  isFuture: dateIsFuture,
  isTomorrow: dateIsTomorrow,
  isYesterday: dateIsYesterday,
  isDaysAgo: dateIsDaysAgo,
  isInDays: dateIsInDays,
};

export const DateComparators = {
  asc: DATE_COMPARATOR_ASC,
  desc: DATE_COMPARATOR_DESC,
  asStringAsc: DATE_AS_STRING_COMPARATOR_ASC,
  asStringDesc: DATE_AS_STRING_COMPARATOR_DESC,
};

const Dates = {
  helper: DateHelpers,
  comparator: DateComparators,
};

export default Dates;
