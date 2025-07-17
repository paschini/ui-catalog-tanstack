import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckBox from '../CheckBox';

describe('Tests for CheckBox', () => {
  test('CheckBox has the correct elements and attributes', () => {
    const mockOnChange = jest.fn();
    render(<CheckBox id={'id'} label={'Test checkbox'} onChange={mockOnChange} />);

    const checkbox = screen.getByLabelText('Test checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  test('CheckBox calls onChange when it clicked', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(<CheckBox id={'id'} label={'Test checkbox'} onChange={mockOnChange} />);
    const checkbox = screen.getByLabelText('Test checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBeFalsy();
    expect(mockOnChange).toHaveBeenCalledTimes(0);

    await user.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('CheckBox shows correct state when isChecked is true', async () => {
    const mockOnChange = jest.fn();

    render(<CheckBox id={'id'} label={'Test checkbox'} onChange={mockOnChange} isChecked={true} />);
    const checkbox1 = screen.getByLabelText('Test checkbox') as HTMLInputElement;
    expect(checkbox1.checked).toBeTruthy();
  });

  test('CheckBox shows correct state when isChecked is false', async () => {
    const mockOnChange = jest.fn();

    render(<CheckBox id={'id'} label={'Test checkbox'} onChange={mockOnChange} isChecked={false} />);
    const checkbox1 = screen.getByLabelText('Test checkbox') as HTMLInputElement;
    expect(checkbox1.checked).toBeFalsy();
  });
});
