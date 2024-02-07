import type { Config } from 'jest';
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

const customJestConfig: Config = {
  transform: {
    "^.+\\.m?tsx?$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
};

export default customJestConfig;
