export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export interface JSONObject {
  [k: string]: JSONValue;
}

export interface JSONArray extends Array<JSONValue> {}

export type JSON = JSONObject;

/**
 * Flattens the given JSON object.
 *
 * For example the following JSON structure:
 *
 * ```
 *  {
 *    "key1": {
 *      "key2": "value1"
 *    },
 *    "key3": [
 *      {
 *        "key4": "value2",
 *      },
 *      {
 *        "key5": "value3",
 *      }
 *    ]
 *  }
 * ```
 *
 * Will be transformed into:
 *
 * ```
 *  {
 *    "key1.key2": "value1",
 *    "key3[0].key4": "value2",
 *    "key3[1].key5": "value3"
 *  }
 * ```
 *
 * @param JsonObject The JSON object to flatten.
 * @returns the flattened version of the goven JSON object.
 */
export const jsonFlatten = (function (isArray, wrapped) {
  return function (table: any) {
    return reduce("", {}, table);
  };

  function reduce(path: any, accumulator: any, table: any) {
    if (isArray(table)) {
      const length = table.length;

      if (length) {
        let index = 0;

        while (index < length) {
          const property = path + "[" + index + "]",
            item = table[index++];
          if (wrapped(item) !== item) accumulator[property] = item;
          else reduce(property, accumulator, item);
        }
      } else accumulator[path] = table;
    } else {
      let empty = true;

      if (path) {
        for (let property in table) {
          const item = table[property];
          property = path + "." + property;
          empty = false;
          if (wrapped(item) !== item) accumulator[property] = item;
          else reduce(property, accumulator, item);
        }
      } else {
        for (const property in table) {
          const item = table[property];
          empty = false;
          if (wrapped(item) !== item) accumulator[property] = item;
          else reduce(property, accumulator, item);
        }
      }

      if (empty) accumulator[path] = table;
    }

    return accumulator;
  }
})(Array.isArray, Object);

export const JsonHelpers = {
  /**
   * Flattens the given JSON object.
   *
   * For example the following JSON structure:
   *
   * ```
   *  {
   *    "key1": {
   *      "key2": "value1"
   *    },
   *    "key3": [
   *      {
   *        "key4": "value2",
   *      },
   *      {
   *        "key5": "value3",
   *      }
   *    ]
   *  }
   * ```
   *
   * Will be transformed into:
   *
   * ```
   *  {
   *    "key1.key2": "value1",
   *    "key3[0].key4": "value2",
   *    "key3[1].key5": "value3"
   *  }
   * ```
   *
   * @param JsonObject The JSON object to flatten.
   * @returns the flattened version of the goven JSON object.
   */
  flatten: jsonFlatten,
};

export const Jsons = {
  /**
   * JSON helper methods.
   */
  helper: JsonHelpers,
};
