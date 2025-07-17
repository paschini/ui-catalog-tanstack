import { render, screen, waitFor } from '@testing-library/react';
import ImageLoader from '../ImageLoader';
import { TestWrapper } from '../../test-utils/TestWrapper';

describe('ImageLoader behavior', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
  });

  test('shows SVG fallback when lazy loading enabled', () => {
    render(
      <TestWrapper mockDispatch={mockDispatch}>
        <ImageLoader src="test-image.jpg" alt="Test image" lazy={true} />
      </TestWrapper>
    );

    const svg = screen.getByRole('img');
    expect(svg.tagName).toBe('svg');

    expect(screen.queryByAltText('Test image')).not.toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'SET_ERROR' }));
  });

  test('shows real image when lazy loading disabled and image loads successfully', async () => {
    // Mock successful image loading
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = '';

      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
    } as never;

    render(
      <TestWrapper mockDispatch={mockDispatch}>
        <ImageLoader src="test-image.jpg" alt="Test image" lazy={false} />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });

    expect(screen.queryByRole('img')).not.toHaveAttribute('viewBox');
    expect(mockDispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'SET_ERROR' }));
  });
});
