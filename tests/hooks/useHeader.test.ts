/**
 * tests/hooks/useHeader.test.ts
 * Tests unitaires complets pour useHeader
 */

import { renderHook, act } from '@testing-library/react';

import { useHeader } from '@/hooks/useHeader';

// Mock de useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Mock de getElementById
const mockElement = {
  getBoundingClientRect: jest.fn(() => ({ top: 100 })),
  focus: jest.fn(),
  setAttribute: jest.fn(),
  removeAttribute: jest.fn(),
  tabIndex: -1,
};

Object.defineProperty(document, 'getElementById', {
  value: jest.fn().mockReturnValue(mockElement),
  writable: true,
});

describe('useHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollY', { 
      value: 0, 
      writable: true, 
      configurable: true 
    });
    Object.defineProperty(window, 'location', {
      value: { hash: '' },
      writable: true,
      configurable: true
    });
  });

  it('should return correct initial state', () => {
    const { result } = renderHook(() => useHeader());

    expect(result.current.isScrolled).toBe(false);
    expect(result.current.isMenuOpen).toBe(false);
    expect(result.current.currentSection).toBe('');
    expect(typeof result.current.scrollToSection).toBe('function');
  });

  it('should detect scroll state correctly', async () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      Object.defineProperty(window, 'scrollY', { 
        value: 50, 
        writable: true, 
        configurable: true 
      });
      window.dispatchEvent(new Event('scroll'));
    });

    // Attendre le throttling
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.isScrolled).toBe(true);
  });

  it('should toggle menu correctly', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isMenuOpen).toBe(false);
  });

  it('should handle section navigation', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.scrollToSection('services');
    });

    expect(document.getElementById).toHaveBeenCalledWith('services');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: expect.any(Number),
      behavior: 'smooth'
    });
    expect(mockPush).toHaveBeenCalledWith('#services', { scroll: false });
  });

  it('should close menu when navigating to section', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.toggleMenu();
    });

    expect(result.current.isMenuOpen).toBe(true);

    act(() => {
      result.current.scrollToSection('contact');
    });

    expect(result.current.isMenuOpen).toBe(false);
  });

  it('should handle hash changes', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      Object.defineProperty(window, 'location', {
        value: { hash: '#about' },
        writable: true,
        configurable: true
      });
      window.dispatchEvent(new Event('hashchange'));
    });

    expect(result.current.currentSection).toBe('about');
  });

  it('should apply scroll lock when menu is open', () => {
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.openMenu();
    });

    expect(document.body.style.position).toBe('fixed');

    act(() => {
      result.current.closeMenu();
    });

    expect(document.body.style.position).toBe('');
  });
});