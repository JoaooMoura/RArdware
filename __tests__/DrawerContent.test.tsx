import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DrawerContent } from '../src/components/DrawerContent';

describe('DrawerContent', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const props: any = {
    navigation: mockNavigation,
    state: {
      routes: [
        { name: 'Home', key: 'Home-1' },
        { name: 'RealidadeAumentada', key: 'AR-1' },
        { name: 'Enciclopedia', key: 'Enciclopedia-1' },
        { name: 'Manual', key: 'Manual-1' },
      ],
      index: 0,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with user information', () => {
    const { getByText } = render(<DrawerContent {...props} />);
    
    // Verify user info is displayed
    expect(getByText('João Dev')).toBeTruthy();
    expect(getByText('Engenheiro React Native')).toBeTruthy();
  });

  it('navigates to Home when tapped', () => {
    const { getByText } = render(<DrawerContent {...props} />);
    
    fireEvent.press(getByText('Início'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });

  it('navigates to AR when tapped', () => {
    const { getByText } = render(<DrawerContent {...props} />);
    
    fireEvent.press(getByText('Realidade Aumentada'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('RealidadeAumentada');
  });
});
