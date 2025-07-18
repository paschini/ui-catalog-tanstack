import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Tests for Input', () => {
  test('Input renders input with placeholder text', () => {
    render(<Input />);

    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('Input changes when user types', async () => {
    const user = userEvent.setup();
    const mockOnchage = vi.fn();

    render(<Input onChange={mockOnchage} />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toHaveValue('');

    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');
    expect(mockOnchage).toHaveBeenCalledTimes(4); // 4 letters, we are not debouncing
  });
});
