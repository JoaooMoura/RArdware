import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(/Aprenda Hardware/i)).toBeTruthy(); 
  });
});
