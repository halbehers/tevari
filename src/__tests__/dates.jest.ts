import "@testing-library/jest-dom";
import moment from "moment";

import Dates from "../dates";

const NOW = Date.now;

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("1992-12-30T15:15:00Z").getTime());
});

afterAll(() => {
  global.Date.now = NOW;
});

describe("#Dates.helper.today", () => {
  it("should return today's date well formated", () => {
    expect(Dates.helper.today()).toEqual("30/12/1992");
    expect(Dates.helper.today("-")).toEqual("30-12-1992");
  });
});

describe("#Dates.helper.format", () => {
  const date = moment(Date.parse("1992-12-30T15:15:00")).toDate();

  it("should format short fr", () => {
    const format = "short-date-fr";
    const expectedString = "30/12/1992";
    const separator = "-";
    const expectedStringWithSeparator = "30-12-1992";
    expect(Dates.helper.format(date, { format })).toEqual(expectedString);
    expect(Dates.helper.format(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short us", () => {
    const format = "short-date-us";
    const expectedString = "12/30/1992";
    const separator = "-";
    const expectedStringWithSeparator = "12-30-1992";
    expect(Dates.helper.format(date, { format })).toEqual(expectedString);
    expect(Dates.helper.format(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short fr with time", () => {
    const format = "short-date-time-fr";
    const expectedString = "30/12/1992 15:15";
    const separator = "-";
    const expectedStringWithSeparator = "30-12-1992 15:15";
    expect(Dates.helper.format(date, { format })).toEqual(expectedString);
    expect(Dates.helper.format(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
  it("should format short us with time", () => {
    const format = "short-date-time-us";
    const expectedString = "12/30/1992 15:15";
    const separator = "-";
    const expectedStringWithSeparator = "12-30-1992 15:15";
    expect(Dates.helper.format(date, { format })).toEqual(expectedString);
    expect(Dates.helper.format(date, { format, separator })).toEqual(
      expectedStringWithSeparator
    );
  });
});

describe("#Dates.comparator.asc", () => {
  const randomArray = [
    new Date("1992-12-29T15:15:00.000Z"),
    new Date("1992-12-30T15:15:00.000Z"),
    new Date("1992-12-28T15:15:00.000Z"),
  ];

  it("should sort correctly", () => {
    expect(randomArray.sort(Dates.comparator.asc)).toEqual([
      new Date("1992-12-28T15:15:00.000Z"),
      new Date("1992-12-29T15:15:00.000Z"),
      new Date("1992-12-30T15:15:00.000Z"),
    ]);
  });
});

describe("#Dates.comparator.desc", () => {
  const randomArray = [
    new Date("1992-12-29T15:15:00.000Z"),
    new Date("1992-12-30T15:15:00.000Z"),
    new Date("1992-12-28T15:15:00.000Z"),
  ];

  it("should sort correctly", () => {
    expect(randomArray.sort(Dates.comparator.desc)).toEqual([
      new Date("1992-12-30T15:15:00.000Z"),
      new Date("1992-12-29T15:15:00.000Z"),
      new Date("1992-12-28T15:15:00.000Z"),
    ]);
  });
});

describe("#Dates.helper.now", () => {
  it("should return today's date", () => {
    expect(Dates.helper.now()).toEqual(new Date("1992-12-30T15:15:00.000Z"));
  });
});

describe("#Dates.helper.daysAgo", () => {
  it("should return a date from 3 days ago", () => {
    expect(Dates.helper.daysAgo(3)).toEqual(
      new Date("1992-12-27T15:15:00.000Z")
    );
  });
  it("should return today's date", () => {
    expect(Dates.helper.daysAgo(0)).toEqual(
      new Date("1992-12-30T15:15:00.000Z")
    );
  });
  it("should return tomorrow's date", () => {
    expect(Dates.helper.daysAgo(-1)).toEqual(
      new Date("1992-12-31T15:15:00.000Z")
    );
  });
});

describe("#Dates.helper.inDays", () => {
  it("should return a date 3 days from now", () => {
    expect(Dates.helper.inDays(3)).toEqual(
      new Date("1993-01-02T15:15:00.000Z")
    );
  });
  it("should return today's date", () => {
    expect(Dates.helper.inDays(0)).toEqual(
      new Date("1992-12-30T15:15:00.000Z")
    );
  });
  it("should return yesterday's date", () => {
    expect(Dates.helper.inDays(-1)).toEqual(
      new Date("1992-12-29T15:15:00.000Z")
    );
  });
});

describe("#Dates.helper.yesterday", () => {
  it("should return yesterday's date", () => {
    expect(Dates.helper.yesterday()).toEqual(
      new Date("1992-12-29T15:15:00.000Z")
    );
  });
});

describe("#Dates.helper.tomorrow", () => {
  it("should return tomorrow's date", () => {
    expect(Dates.helper.tomorrow()).toEqual(
      new Date("1992-12-31T15:15:00.000Z")
    );
  });
});

describe("#Dates.helper.isBefore", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isBefore(
        new Date("1992-12-31T15:15:00.000Z"),
        new Date("1993-01-01T15:15:00.000Z")
      )
    ).toBeTruthy();
    expect(
      Dates.helper.isBefore(
        new Date("1992-12-31T15:15:00.000Z"),
        new Date("1992-12-31T15:20:00.000Z")
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isBefore(
        new Date("1992-12-31T15:15:00.000Z"),
        new Date("1992-28-01T15:15:00.000Z")
      )
    ).toBeFalsy();
    expect(
      Dates.helper.isBefore(
        new Date("1992-12-31T15:15:00.000Z"),
        new Date("1992-12-31T15:10:00.000Z")
      )
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isAfter", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isAfter(
        new Date("1993-01-01T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeTruthy();
    expect(
      Dates.helper.isAfter(
        new Date("1992-12-31T15:20:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isAfter(
        new Date("1992-28-01T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
    expect(
      Dates.helper.isAfter(
        new Date("1992-12-31T15:10:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isSameDay", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isSameDay(
        new Date("1992-12-31T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeTruthy();
    expect(
      Dates.helper.isSameDay(
        new Date("1992-12-31T15:20:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isSameDay(
        new Date("1993-12-31T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
    expect(
      Dates.helper.isSameDay(
        new Date("1993-11-31T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
    expect(
      Dates.helper.isSameDay(
        new Date("1992-28-01T15:15:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
    expect(
      Dates.helper.isSameDay(
        new Date("1992-12-30T15:10:00.000Z"),
        new Date("1992-12-31T15:15:00.000Z")
      )
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isBeforeInDays", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isBeforeInDays(new Date("1993-01-01T15:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isBeforeInDays(new Date("1992-12-31T15:20:00.000Z"), 2)
    ).toBeTruthy();
    expect(
      Dates.helper.isBeforeInDays(new Date("1992-12-31T15:14:00.000Z"), 1)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isBeforeInDays(new Date("1992-28-01T15:15:00.000Z"), 2)
    ).toBeFalsy();
    expect(
      Dates.helper.isBeforeInDays(new Date("1992-12-31T15:10:00.000Z"), 0)
    ).toBeFalsy();
    expect(
      Dates.helper.isBeforeInDays(new Date("1992-12-31T15:20:00.000Z"), 1)
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isAfterInDays", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isAfterInDays(new Date("1993-01-01T15:16:00.000Z"), 2)
    ).toBeTruthy();
    expect(
      Dates.helper.isAfterInDays(new Date("1992-12-31T15:10:00.000Z"), 0)
    ).toBeTruthy();
    expect(
      Dates.helper.isAfterInDays(new Date("1992-12-31T15:16:00.000Z"), 1)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isAfterInDays(new Date("1992-11-30T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isAfterInDays(new Date("1992-12-31T15:20:00.000Z"), 2)
    ).toBeFalsy();
    expect(
      Dates.helper.isAfterInDays(new Date("1992-12-31T15:14:00.000Z"), 1)
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isBeforeDaysAgo", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1992-11-01T15:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1992-12-28T15:14:00.000Z"), 2)
    ).toBeTruthy();
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1992-12-27T15:20:00.000Z"), 1)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1992-28-01T15:15:00.000Z"), 2)
    ).toBeFalsy();
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1992-12-31T15:10:00.000Z"), 0)
    ).toBeFalsy();
    expect(
      Dates.helper.isBeforeDaysAgo(new Date("1993-01-03T15:20:00.000Z"), 1)
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isAfterDaysAgo", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1993-01-01T15:15:00.000Z"), 2)
    ).toBeTruthy();
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1992-12-30T15:16:00.000Z"), 0)
    ).toBeTruthy();
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1992-12-29T15:16:00.000Z"), 1)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1992-11-27T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1992-12-27T15:14:00.000Z"), 2)
    ).toBeFalsy();
    expect(
      Dates.helper.isAfterDaysAgo(new Date("1992-12-28T15:14:00.000Z"), 1)
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isToday", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isToday(new Date("1992-12-30T10:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isToday(new Date("1992-12-30T15:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isToday(new Date("1992-12-30T15:20:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isToday(new Date("1992-12-30T00:20:01.000Z"))
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isToday(new Date("1992-12-29T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isToday(new Date("1992-11-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isToday(new Date("1993-11-30T15:15:00.000Z"))
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isPast", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isPast(new Date("1992-12-29T15:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isPast(new Date("1992-11-30T15:20:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isPast(new Date("1991-12-30T15:20:01.000Z"))
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isPast(new Date("1992-12-30T10:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isPast(new Date("1992-12-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isPast(new Date("1992-12-30T15:20:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isPast(new Date("1993-01-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isPast(new Date("1993-11-30T15:15:00.000Z"))
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isFuture", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isFuture(new Date("1992-12-31T15:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isFuture(new Date("1993-01-30T15:20:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isFuture(new Date("1993-12-30T15:20:01.000Z"))
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isFuture(new Date("1992-12-30T16:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isFuture(new Date("1992-12-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isFuture(new Date("1992-12-29T15:20:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isFuture(new Date("1991-01-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isFuture(new Date("1991-11-30T15:15:00.000Z"))
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isTomorrow", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isTomorrow(new Date("1992-12-31T10:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isTomorrow(new Date("1992-12-31T15:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isTomorrow(new Date("1992-12-31T15:20:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isTomorrow(new Date("1992-12-31T00:20:01.000Z"))
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isTomorrow(new Date("1992-12-29T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isTomorrow(new Date("1992-11-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isTomorrow(new Date("1993-11-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isTomorrow(new Date("1993-01-01T15:15:00.000Z"))
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isYesterday", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isYesterday(new Date("1992-12-29T10:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isYesterday(new Date("1992-12-29T15:15:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isYesterday(new Date("1992-12-29T15:20:00.000Z"))
    ).toBeTruthy();
    expect(
      Dates.helper.isYesterday(new Date("1992-12-29T00:20:01.000Z"))
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isYesterday(new Date("1992-12-31T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isYesterday(new Date("1992-11-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isYesterday(new Date("1993-11-30T15:15:00.000Z"))
    ).toBeFalsy();
    expect(
      Dates.helper.isYesterday(new Date("1993-01-01T15:15:00.000Z"))
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isDaysAgo", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isDaysAgo(new Date("1992-12-27T10:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isDaysAgo(new Date("1992-12-27T15:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isDaysAgo(new Date("1992-12-27T15:20:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isDaysAgo(new Date("1992-12-28T00:20:01.000Z"), 2)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isDaysAgo(new Date("1992-12-28T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isDaysAgo(new Date("1992-11-27T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isDaysAgo(new Date("1993-11-27T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isDaysAgo(new Date("1993-01-01T15:15:00.000Z"), 2)
    ).toBeFalsy();
  });
});

describe("#Dates.helper.isInDays", () => {
  it("should return true", () => {
    expect(
      Dates.helper.isInDays(new Date("1993-01-02T10:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isInDays(new Date("1993-01-02T15:15:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isInDays(new Date("1993-01-02T15:20:00.000Z"), 3)
    ).toBeTruthy();
    expect(
      Dates.helper.isInDays(new Date("1993-01-01T00:20:01.000Z"), 2)
    ).toBeTruthy();
  });
  it("should return false", () => {
    expect(
      Dates.helper.isInDays(new Date("1993-01-01T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isInDays(new Date("1992-11-27T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isInDays(new Date("1993-11-27T15:15:00.000Z"), 3)
    ).toBeFalsy();
    expect(
      Dates.helper.isInDays(new Date("1995-01-02T15:15:00.000Z"), 2)
    ).toBeFalsy();
  });
});
