import { createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

export default {
  ...defaultPreset,
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    ...defaultPreset.transform,
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
      useESM: true
    }
  },
  moduleNameMapper: {
    '^(\\.\\.?\\/.*)\\.js$': '$1'
  }
};
