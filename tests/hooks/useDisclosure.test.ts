import { renderHook, act } from '@testing-library/react';
import { useDisclosure } from '@/hooks/useDisclosure';

describe('useDisclosure', () => {
  it('should have initial state closed by default', () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it('should accept custom initial state', () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);
  });

  it('should open when open is called', () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close when close is called', () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should toggle state when toggle is called', () => {
    const { result } = renderHook(() => useDisclosure());

    // Initially closed, should open
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    // Now open, should close
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should maintain function identity between renders', () => {
    const { result, rerender } = renderHook(() => useDisclosure());

    const initialOpen = result.current.open;
    const initialClose = result.current.close;
    const initialToggle = result.current.toggle;

    rerender();

    expect(result.current.open).toBe(initialOpen);
    expect(result.current.close).toBe(initialClose);
    expect(result.current.toggle).toBe(initialToggle);
  });
});