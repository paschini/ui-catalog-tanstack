import { render, screen } from '@testing-library/react';
import { TestWrapper } from '../../test-utils/TestWrapper';
import Main from '../Main';

describe('Tests for Main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows errors when they exist', () => {
    render(
      <TestWrapper
        mockGlobalState={{
          errors: [{ code: 13, message: 'Something went wrong!' }]
        }}
      >
        <Main version={'1.2.3'}>
          <div>I'm in main</div>
        </Main>
      </TestWrapper>
    );

    expect(screen.getByText('Error: -13- Something went wrong!')).toBeInTheDocument();
  });

  test('hides notification when no errors', () => {
    const { container } = render(
      <TestWrapper
        mockGlobalState={{
          errors: []
        }}
      >
        <Main version={'1.2.3'}>
          <div>I'm in main</div>
        </Main>
      </TestWrapper>
    );

    const notificationArea = container.querySelector('.notificationArea');
    expect(notificationArea).not.toBeInTheDocument();
  });
});
