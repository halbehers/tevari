const { TextEncoder, TextDecoder } = require("util");

Object.assign(global, { TextDecoder, TextEncoder });

module.exports = {
  transform: {
    "^.+\\.m?tsx?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
};
