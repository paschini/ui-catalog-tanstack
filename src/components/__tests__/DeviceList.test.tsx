import { render, screen, fireEvent } from '@testing-library/react';
import { TestWrapper } from '@/test-utils/TestWrapper';
import DeviceList from '../DeviceList';
import { mockDeviceArrays } from '@/test-utils/mockDeviceData';

describe('Tests for DeviceList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders device list correctly', () => {
    render(
      <TestWrapper>
        <DeviceList data={mockDeviceArrays.mixed} />
      </TestWrapper>
    );

    expect(screen.getByText('UniFi Dream Machine')).toBeInTheDocument();
    expect(screen.getByText('UniFi 6 Lite')).toBeInTheDocument();
    expect(screen.getByText('EdgeRouter X')).toBeInTheDocument();

    expect(screen.getByText('UISP')).toBeInTheDocument();
    expect(screen.queryAllByText('UniFi').length).toBe(2);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Product Line')).toBeInTheDocument();
  });

  test('calls navigate when device is clicked', () => {
    const mockNavigate = (global as any).mockNavigate;

    render(
      <TestWrapper>
        <DeviceList data={mockDeviceArrays.mixed} />
      </TestWrapper>
    );

    const deviceRow = screen.getByText('UniFi Dream Machine').closest('div');
    fireEvent.click(deviceRow!);

    expect(mockNavigate).toHaveBeenCalledWith({
      to: '/details/UDM'
    });
  });

  test('shows filtered devices when available', () => {
    render(
      <TestWrapper
        mockGlobalState={{
          filteredDeviceList: mockDeviceArrays.unifiOnly
        }}
      >
        <DeviceList data={mockDeviceArrays.mixed} />
      </TestWrapper>
    );

    expect(screen.getByText('UniFi Dream Machine')).toBeInTheDocument();
    expect(screen.getByText('UniFi 6 Lite')).toBeInTheDocument();
    expect(screen.queryByText('EdgeRouter X')).not.toBeInTheDocument();
  });
});
