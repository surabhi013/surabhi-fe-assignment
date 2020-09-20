import React from 'react';
import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';
import '@testing-library/jest-dom/extend-expect';
 
describe('Tabs', () => {
  test('renders Tabs component', () => {
    render(<Tabs />);
    expect(screen.getByText('Upstox')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Live View')).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeInTheDocument;
  });
});