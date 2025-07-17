import '@testing-library/jest-dom';
import React from 'react';

// Mock TanStack Router
const mockNavigate = jest.fn();

jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useRouter: () => ({
    navigate: mockNavigate,
    state: { location: { pathname: '/' } }
  }),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  useSearch: () => ({}),
  Link: ({ children, to, ...props }: any) => React.createElement('a', { href: to, ...props }, children),
  createFileRoute: (path: string) => ({
    component: () => React.createElement('div', null, 'Mock Route')
  })
}));

// Mock IntersectionObserver med rätt interface
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation((callback, options) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '0px',
    thresholds: [],
    takeRecords: jest.fn(() => [])
  }))
});

// Mock CSS modules
// jest.mock('*.module.css', () => ({}));

// Mock Image för att undvika nätverksanrop
Object.defineProperty(window, 'Image', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    onload: null,
    onerror: null,
    src: '',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
});

// Exportera för att använda i tester
(global as any).mockNavigate = mockNavigate;
