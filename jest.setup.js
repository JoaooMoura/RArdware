/* eslint-disable no-undef */
jest.mock('@op-engineering/op-sqlite', () => ({
  open: jest.fn(() => ({
    execute: jest.fn(),
    executeAsync: jest.fn(),
    close: jest.fn(),
  })),
}));
