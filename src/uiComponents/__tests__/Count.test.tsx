import { render, screen } from '@testing-library/react';
import Count from '../Count';

describe('Tests for Count', () => {
  test('Count renders count', () => {
    render(<Count total={500} />);

    expect(screen.getByText('500 items')).toBeInTheDocument();
  });

  test('Count renders 1 item', () => {
    render(<Count total={1} />);

    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  test('Count renders 0 items', () => {
    render(<Count total={0} />);

    expect(screen.getByText('0 items')).toBeInTheDocument();
  });
});
