import React from 'react';
import { render, screen } from '@testing-library/react';
import Overview from './Overview';
import '@testing-library/jest-dom/extend-expect';
 
describe('Overview', () => {
  test('renders Overview component', () => {
    render(<Overview />);
    expect(screen.getByText('Historical Data')).toBeInTheDocument();
  });
});