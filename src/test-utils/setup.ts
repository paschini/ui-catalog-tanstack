import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import { createElement } from 'react';
import type { ReactNode } from 'react';

afterEach(() => {
  cleanup();
});

const mockNavigate = vi.fn();
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useRouter: () => ({
    navigate: mockNavigate,
    state: { location: { pathname: '/' } }
  }),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  useSearch: () => ({}),
  Link: ({ children, to, ...props }) => createElement('a', { href: to, ...props }, children as ReactNode),
  createFileRoute: (path: string) => ({
    component: () => createElement('div', { id: path }, 'Mock Route')
  })
}));

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))
});

global.mockNavigate = mockNavigate;
