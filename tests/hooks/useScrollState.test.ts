import { renderHook, act } from '@testing-library/react';
import { useScrollState } from '@/hooks/useScrollState';

// Mock window.scrollY et window.addEventListener
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

// Mock des méthodes d'événements
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

describe('useScrollState', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
    mockAddEventListener.mockClear();
    mockRemoveEventListener.mockClear();
  });

  it('should return initial scroll state', () => {
    const { result } = renderHook(() => useScrollState());
    expect(result.current.isScrolled).toBe(false);
  });

  it('should detect when scrolled past threshold', async () => {
    const { result } = renderHook(() => useScrollState({ threshold: 50 }));

    act(() => {
      // Simuler le scroll
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
      
      // Trouver et exécuter le handler de scroll
      const scrollHandler = mockAddEventListener.mock.calls.find(
        call => call[0] === 'scroll'
      )?.[1];
      
      if (scrollHandler) {
        scrollHandler();
      }
    });

    // Attendre que l'état soit mis à jour
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150)); // Attendre le throttle
    });

    expect(result.current.isScrolled).toBe(true);
  });

  it('should use default threshold of 10', async () => {
    const { result } = renderHook(() => useScrollState());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 15, writable: true });
      
      const scrollHandler = mockAddEventListener.mock.calls.find(
        call => call[0] === 'scroll'
      )?.[1];
      
      if (scrollHandler) {
        scrollHandler();
      }
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(result.current.isScrolled).toBe(true);
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useScrollState());
    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});