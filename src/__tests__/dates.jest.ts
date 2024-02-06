import "@testing-library/jest-dom";
import moment from "moment";

import { dateFormat, dateToday } from "../dates";

const NOW = Date.now;

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("1992-12-30T15:15:00Z").getTime());
});

afterAll(() => {
  global.Date.now = NOW;
});

describe("#getTodaysDate", () => {
  it("should return today's date well formated", () => {
    expect(dateToday()).toEqual("30/12/1992");
    expect(dateToday("-")).toEqual("30-12-1992");
  });
});

describe("#formatDate", () => {
  const date = moment(Date.parse("1992-12-30T15:15:00")).toDate();

  it("should format short fr", () => {
    const format = "short-date-fr";
    const expectedString = "30/12/1992";
    const separator = "-";
    const expectedStringWithSeparator = "30-12-1992";
    expect(dateFormat(date, { format })).toEqual(expectedString);
    expect(dateFormat(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short us", () => {
    const format = "short-date-us";
    const expectedString = "12/30/1992";
    const separator = "-";
    const expectedStringWithSeparator = "12-30-1992";
    expect(dateFormat(date, { format })).toEqual(expectedString);
    expect(dateFormat(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short fr with time", () => {
    const format = "short-date-time-fr";
    const expectedString = "30/12/1992 15:15";
    const separator = "-";
    const expectedStringWithSeparator = "30-12-1992 15:15";
    expect(dateFormat(date, { format })).toEqual(expectedString);
    expect(dateFormat(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short us with time", () => {
    const format = "short-date-time-us";
    const expectedString = "12/30/1992 15:15";
    const separator = "-";
    const expectedStringWithSeparator = "12-30-1992 15:15";
    expect(dateFormat(date, { format })).toEqual(expectedString);
    expect(dateFormat(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
});
