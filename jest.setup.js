/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(() => ({
    execute: jest.fn(() => ({ rows: { _array: [{ id: 1, total: 0 }] }, insertId: 1 })),
    executeAsync: jest.fn().mockResolvedValue({ rows: { _array: [{ id: 1, total: 0 }] }, insertId: 1 }),
    close: jest.fn(),
  })),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-worklets-core', () => ({
  Worklets: {
    createRunInContextFn: jest.fn(),
  },
}));
