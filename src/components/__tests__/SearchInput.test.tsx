import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from '../SearchInput';
import { TestWrapper } from '@/test-utils/TestWrapper';
import { mockDeviceArrays } from '@/test-utils/mockDeviceData';

describe('Tests for SearchInput', () => {
  test('filters devices to exactly 2 results', async () => {
    const user = userEvent.setup();
    const mockDispatch = vi.fn();

    render(
      <TestWrapper
        mockGlobalState={{
          deviceList: mockDeviceArrays.mixed
        }}
        mockDispatch={mockDispatch}
      >
        <SearchInput />
      </TestWrapper>
    );

    await user.type(screen.getByPlaceholderText('Search'), 'UniFi');

    expect(screen.getAllByText(/UniFi/i)).toHaveLength(2);
  });
});
