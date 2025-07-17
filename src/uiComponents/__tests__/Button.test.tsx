import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe(' Tests for Button', () => {
  const mockOnClick = jest.fn();

  test('Button renders button with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  test('Button calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('Button is :active class while clicking', async () => {
    const user = userEvent.setup();

    render(<Button onClick={mockOnClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    const buttonStyle = window.getComputedStyle(button);

    expect(button).toHaveAttribute('aria-pressed', 'false');

    await user.pointer([{ target: button }, { keys: '[MouseLeft>]' }]);
    expect(button).toHaveAttribute('aria-pressed', 'true');

    await user.pointer([{ keys: '[/MouseLeft]' }]);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('Button is disabled when disabled prop is true', () => {
    render(
      <Button onClick={() => {}} disabled>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button).toBeDisabled();
  });

  test('Button is not disabled when disabled prop is false', () => {
    render(
      <Button onClick={() => {}} disabled={false}>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button).not.toBeDisabled();
  });

  test('Button is active when isActive prop is true', () => {
    render(
      <Button onClick={mockOnClick} isActive>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button).toHaveClass('active');
  });

  test('Button is not active when isActive prop is false', () => {
    render(
      <Button onClick={() => {}} isActive={false}>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button).not.toHaveClass('active');
  });
});
