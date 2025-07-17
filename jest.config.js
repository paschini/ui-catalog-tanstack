// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.json';

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths ?? {})
    // '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
    // '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy'
    // '\\.(css|less)$': '<rootDir>/src/assets/__mocks__/styleMock.js'
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(js|jsx|ts|tsx)', '<rootDir>/src/**/?(*.)(spec|test).(js|jsx|ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'css', 'json'],
  extensionsToTreatAsEsm: ['.ts', '.tsx', '.json', '.css'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }],
    // '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-stub'
    // '^.+\\\\.module\\\\.(css|sass|scss)$': ['jest-css-modules-transform', { injectIntoDOM: true }]
    '^.+\\\\.module\\\\.(css|sass|scss)$': 'jest-css-modules-transform'
  },
  transformIgnorePatterns: ['node_modules/(?!(.*\\\\.mjs$))']
  // testEnvironmentOptions: {
  //   customExportConditions: ['node', 'node-addons']
  // }
};
