import moment from "moment";

import { FORWARD_SLASH } from "./strings";

export const to2digits = (num: number): string =>
  num.toLocaleString("fr-FR", {
    minimumIntegerDigits: 2,
  });

export const DATE_DEFAULT_SEPARATOR = FORWARD_SLASH;

export const dateToday = (separator = DATE_DEFAULT_SEPARATOR): string => {
  const now = new Date(Date.now());
  return dateFormat(now, { separator, format: "short-date-fr" });
};

export type DateFormat =
  | "short-date-fr"
  | "short-date-us"
  | "short-date-time-fr"
  | "short-date-time-us";

export interface DateFormatOptions {
  separator?: string;
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

export type Order = "asc" | "desc";

export const dateGetComparator =
  (order: Order = "desc") =>
  (a: Date, b: Date) => {
    const aTime = a.getTime();
    const bTime = b.getTime();

    if (order === "asc") return aTime - bTime;

    return bTime - aTime;
  };

export const DATE_COMPARATOR_ASC = dateGetComparator("asc");
export const DATE_COMPARATOR_DESC = dateGetComparator("desc");

export const dateGetAsStringComparator =
  (dateFormat: string, order: Order = "desc") =>
  (a: string, b: string) => {
    const date1 = moment(a, dateFormat).toDate();
    const date2 = moment(b, dateFormat).toDate();

    return dateGetComparator(order)(date1, date2);
  };

export const DATE_AS_STRING_COMPARATOR_ASC = dateGetAsStringComparator("asc");
export const DATE_AS_STRING_COMPARATOR_DESC = dateGetAsStringComparator("desc");

export const dateNow = () => moment(Date.now()).toDate();

export const dateDaysAgo = (nbOfDays: number = 1) => {
  const today = dateNow();
  today.setDate(today.getDate() - nbOfDays);
  return today;
};

export const dateInDays = (nbOfDays: number = 1) => {
  const today = dateNow();
  today.setDate(today.getDate() + nbOfDays);
  return today;
};

export const dateYesterday = () => dateDaysAgo();

export const dateTomorrow = () => dateInDays();

export const dateIsBefore = (date1: Date | number, date2: Date | number) =>
  date1 < date2;

export const dateIsAfter = (date1: Date | number, date2: Date | number) =>
  date1 > date2;

export const dateIsSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDay() === date2.getDay() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

export const dateIsBeforeInDays = (date: Date, nbOfDays: number = 1) =>
  dateIsBefore(date, dateInDays(nbOfDays));

export const dateIsAfterInDays = (date: Date, nbOfDays: number = 1) =>
  dateIsAfter(date, dateInDays(nbOfDays));

export const dateIsBeforeDaysAgo = (date: Date, nbOfDays: number = 1) =>
  dateIsBefore(date, dateDaysAgo(nbOfDays));

export const dateIsAfterDaysAgo = (date: Date, nbOfDays: number = 1) =>
  dateIsAfter(date, dateDaysAgo(nbOfDays));

export const dateIsToday = (date: Date) => dateIsSameDay(date, dateNow());

export const dateIsPast = (date: Date) =>
  !dateIsToday(date) && dateIsBefore(date, dateNow());

export const dateIsFuture = (date: Date) =>
  !dateIsToday(date) && dateIsAfter(date, dateNow());

export const dateIsTomorrow = (date: Date) =>
  dateIsSameDay(date, dateTomorrow());

export const dateIsYesterday = (date: Date) =>
  dateIsSameDay(date, dateYesterday());

export const dateIsDaysAgo = (date: Date, nbOfDays: number = 1) =>
  dateIsSameDay(date, dateDaysAgo(nbOfDays));

export const dateIsInDays = (date: Date, nbOfDays: number = 1) =>
  dateIsSameDay(date, dateInDays(nbOfDays));

export const DateHelpers = {
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
