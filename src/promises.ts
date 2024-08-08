import { Predicate0 } from "./functions";

/**
 * Waits for the given predicate to return true.
 * 
 * Usage: `await until(() => documentLoaded);` 
 *
 * @param conditionFunction The condition to wait for.
 * @returns the promise.
 */
export const promisesUntil = async (conditionFunction: Predicate0) => {
  const poll = (resolve: (value?: unknown) => void) => {
    if (conditionFunction()) resolve();
    else setTimeout(() => poll(resolve), 400);
  };

  return new Promise(poll);
};

/**
 * Waits for the given predicate to return true.
 *
 * @param conditionFunction The condition to wait for.
 * @returns the promise.
 */
export const until = promisesUntil;

export const PromisesHelpers = {
  /**
   * Waits for the given predicate to return true.
   *
   * @param conditionFunction The condition to wait for.
   * @returns the promise.
   */
  until: promisesUntil,
};

export const Promises = {
  /**
   * Promises helper methods.
   */
  helper: PromisesHelpers,
};
