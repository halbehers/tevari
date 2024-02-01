/* eslint-disable @typescript-eslint/no-explicit-any */
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
  flatten: jsonFlatten,
};

const Jsons = {
  helper: JsonHelpers,
};

export default Jsons;
