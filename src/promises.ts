import { Predicate0 } from "./functions";

export const promiseExecuteAndWaitArray = <T>(
  values: Promise<T[]>[]
): Promise<T[][] | T[]> => {
  return Promise.allSettled(values).then((results) =>
    results.map((result) => {
      if (result.status === "rejected") {
        throw new Error(result.reason);
      }
      return result.value;
    })
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const promiseExecuteAndWaitAny = (
  values: Promise<any>[]
): Promise<any> => {
  return Promise.allSettled(values).then((results) =>
    results.map((result) => {
      if (result.status === "rejected") {
        throw new Error(result.reason);
      }
      return result.value;
    })
  );
};

export const promiseExecuteAndWaitSingle = <T>(
  values: Promise<T>[]
): Promise<T[]> => {
  return Promise.allSettled(values).then((results) =>
    results.map((result) => {
      if (result.status === "rejected") {
        throw new Error(result.reason);
      }
      return result.value;
    })
  );
};

export const promiseExecuteArray = <T>(
  values: Promise<T[]>[],
  fastFail: boolean
): Promise<T[][] | T[]> => {
  if (!fastFail) return promiseExecuteAndWaitArray(values);

  return Promise.all(values);
};

interface IWaitForConditionOptions {
  timeoutInMs?: number;
  intervalInMs?: number;
}

export function promiseWaitForCondition(
  predicate: Predicate0,
  options?: IWaitForConditionOptions
) {
  const { timeoutInMs = 3000, intervalInMs = 500 } = options ?? {};
  return new Promise<void>((resolve) => {
    const startTime = Date.now();
    function checkFlag() {
      if (predicate()) {
        resolve();
      } else if (Date.now() > startTime + timeoutInMs) {
        resolve();
      } else {
        window.setTimeout(checkFlag, intervalInMs);
      }
    }
    checkFlag();
  });
}

export const PromiseHelpers = {
  executeAndWaitArray: promiseExecuteAndWaitArray,
  executeAndWaitAny: promiseExecuteAndWaitAny,
  executeAndWaitSingle: promiseExecuteAndWaitSingle,
  executeArray: promiseExecuteArray,
  waitForCondition: promiseWaitForCondition,
};

const Promises = {
  helper: PromiseHelpers,
};

export default Promises;
