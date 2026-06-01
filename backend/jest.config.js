const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      diagnostics: {
        warnOnly: true
      }
    }
  },
  roots: ['<rootDir>/tests'], //Only search into tests folder on root directory
  testMatch: ['**/?(*.)+(test).ts'], //Only search for files with the following format: name.test.ts
  clearMocks: true
};