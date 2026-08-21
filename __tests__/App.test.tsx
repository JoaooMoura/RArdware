import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import * as dbModule from '../src/db/client';

describe('App Component Render & Lifecycle Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly and initializes database (happy path)', async () => {
    jest.spyOn(dbModule, 'initDatabase').mockResolvedValueOnce();

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<App />);
      await Promise.resolve();
    });

    const root = renderer!.root;
    expect(root).toBeDefined();
    const textNodes = root.findAllByType('Text' as never);
    const textContents = textNodes.map(node => node.props.children);
    expect(textContents).toContain('Conectado (rardware.db)');
  });

  test('handles database initialization error gracefully (error edge case)', async () => {
    jest.spyOn(dbModule, 'initDatabase').mockRejectedValueOnce(new Error('Connection failed'));

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<App />);
      await Promise.resolve();
    });

    const root = renderer!.root;
    const textNodes = root.findAllByType('Text' as never);
    const textContents = textNodes.map(node => node.props.children);
    expect(textContents).toContain('Erro: Connection failed');
  });
});
