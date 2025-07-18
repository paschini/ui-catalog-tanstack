import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Tests for Button', () => {
  const mockOnClick = vi.fn();

  test('Button renders button with text', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const button = screen.getByText('Click me');

    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/button/);
    expect(button).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.447)'
    });
  });

  test('Button renders button with type', () => {
    render(
      <Button type={'danger'} onClick={() => {}}>
        Delete
      </Button>
    );
    const button = screen.getByText('Delete');

    expect(button).toBeInTheDocument();
    expect(button.className).toMatch(/danger/);
    expect(button).toHaveStyle({
      color: 'var(--color-red)'
    });
  });

  test('Button calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('Button is active when isActive prop is true', () => {
    render(
      <Button onClick={mockOnClick} isActive>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button.className).toMatch(/active/);
    expect(button).toHaveStyle({
      color: 'rgb(0, 111, 255)'
    });
  });

  test('Button is not active when isActive prop is false', () => {
    render(
      <Button onClick={() => {}} isActive={false}>
        Click me
      </Button>
    );
    const button = screen.getByText('Click me');

    expect(button.className).not.toMatch(/active/);
  });
});
