import { renderHook, act } from '@testing-library/react';
import { useCurrentSection } from '@/hooks/useCurrentSection';

// Mock window.location
const mockLocation = {
  hash: '',
  pathname: '/',
  search: '',
  hostname: 'localhost',
  port: '3000',
  protocol: 'http:',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock addEventListener et removeEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

describe('useCurrentSection', () => {
  beforeEach(() => {
    mockLocation.hash = '';
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  it('should return empty string when no hash', () => {
    const { result } = renderHook(() => useCurrentSection());
    expect(result.current).toBe('');
  });

  it('should return section from initial hash', () => {
    mockLocation.hash = '#services';
    
    const { result } = renderHook(() => useCurrentSection());
    expect(result.current).toBe('services');
  });

  it('should update when hash changes', () => {
    const { result, rerender } = renderHook(() => useCurrentSection());
    expect(result.current).toBe('');

    // Simuler un changement de hash avec act()
    act(() => {
      mockLocation.hash = '#about';
      // Simuler l'événement hashchange
      const hashChangeHandler = mockAddEventListener.mock.calls.find(
        call => call[0] === 'hashchange'
      )?.[1];
      
      if (hashChangeHandler) {
        hashChangeHandler();
      }
    });

    expect(result.current).toBe('about');
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useCurrentSection());
    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'hashchange',
      expect.any(Function)
    );
  });

  it('should handle hash with multiple # characters', () => {
    mockLocation.hash = '#section#subsection';
    
    const { result } = renderHook(() => useCurrentSection());
    expect(result.current).toBe('section#subsection');
  });
});