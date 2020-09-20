import React from 'react';
import { render, screen } from '@testing-library/react';
import OHLCChart from './OHLCChart';
import '@testing-library/jest-dom/extend-expect';
 
describe('OHLCChart', () => {
  test('renders OHLCChart component', () => {
    render(<OHLCChart />);
    expect(screen.queryByRole('progressbar')).toBeInTheDocument();
  });
});