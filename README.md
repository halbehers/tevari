# Tévari 🪨

(NPM Package) Collection of various small helpers for javascript and typescript based projects, all tested and documented.

In Huichol, Tévari means small rocks. This library is just that, small rocks (helpers) designed to ease the development of javascript or typescript projects.

## Getting Started

**Npm:**

```bash
npm install tevari
```

**Yarn:**

```bash
yarn add tevari
```

Then import Tévari functions wherever needed 🤓

## Using Tévari 📖

For each sections (strings, arrays, numbers, ...), there is 2 ways to use tévari helpers:

- Import the helper object from the desired section:

  ```typescript
  import assert from "assert";
  import { StringHelpers } from "tevari";

  // ...

  assert(StringHelpers.plainify("Weìrd") === "Weird");
  ```

- Import the desired helper method directly:

  ```typescript
  import assert from "assert";
  import { stringPlainify } from "tevari";

  // ...

  assert(stringPlainify("Weìrd") === "Weird");
  ```

  Every direct helper method are prefixed by the name of the section in singular. (ie. `StringHelpers.plainify` <=> `stringPlainify`)

