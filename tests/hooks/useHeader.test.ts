import { renderHook, act } from '@testing-library/react';
import { useHeader } from '@/hooks/useHeader';

// Mock des dépendances
jest.mock('@/hooks/useScrollState', () => ({
  useScrollState: jest.fn(() => ({ isScrolled: false })),
}));

jest.mock('@/hooks/useDisclosure', () => ({
  useDisclosure: jest.fn(() => ({
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
    toggle: jest.fn(),
  })),
}));

jest.mock('@/hooks/useCurrentSection', () => ({
  useCurrentSection: jest.fn(() => 'home'),
}));

jest.mock('@/hooks/useScrollLock', () => ({
  useScrollLock: jest.fn(() => ({
    lockScroll: jest.fn(),
    unlockScroll: jest.fn(),
  })),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('useHeader', () => {
  const mockScrollState = require('@/hooks/useScrollState');
  const mockDisclosure = require('@/hooks/useDisclosure');
  const mockCurrentSection = require('@/hooks/useCurrentSection');
  const mockScrollLock = require('@/hooks/useScrollLock');

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mocks to default values
    mockScrollState.useScrollState.mockReturnValue({ isScrolled: false });
    mockDisclosure.useDisclosure.mockReturnValue({
      isOpen: false,
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
    });
    mockCurrentSection.useCurrentSection.mockReturnValue('home');
    mockScrollLock.useScrollLock.mockReturnValue({
      lockScroll: jest.fn(),
      unlockScroll: jest.fn(),
    });

    // Mock DOM methods
    global.document.getElementById = jest.fn();
    Object.defineProperty(window, 'pageYOffset', {
      value: 0,
      writable: true,
    });
  });

  it('should return correct initial state', () => {
    const { result } = renderHook(() => useHeader());

    expect(result.current).toHaveProperty('isScrolled', false);
    expect(result.current).toHaveProperty('isMenuOpen', false);
    expect(result.current).toHaveProperty('currentSection', 'home');
    expect(result.current).toHaveProperty('scrollToSection');
    expect(typeof result.current.scrollToSection).toBe('function');
  });

  it('should reflect scrolled state', () => {
    mockScrollState.useScrollState.mockReturnValue({ isScrolled: true });
    
    const { result } = renderHook(() => useHeader());

    expect(result.current.isScrolled).toBe(true);
  });

  it('should reflect menu open state', () => {
    mockDisclosure.useDisclosure.mockReturnValue({
      isOpen: true,
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
    });
    
    const { result } = renderHook(() => useHeader());

    expect(result.current.isMenuOpen).toBe(true);
  });

  it('should scroll to section when element exists', () => {
    const mockElement = {
      getBoundingClientRect: jest.fn(() => ({ top: 100 })),
      focus: jest.fn(),
      setAttribute: jest.fn(),
      removeAttribute: jest.fn(),
      tabIndex: -1,
    };
    
    global.document.getElementById = jest.fn().mockReturnValue(mockElement);
    Object.defineProperty(window, 'pageYOffset', { value: 500 });
    
    const mockClose = jest.fn();
    mockDisclosure.useDisclosure.mockReturnValue({
      isOpen: false,
      open: jest.fn(),
      close: mockClose,
      toggle: jest.fn(),
    });

    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.scrollToSection('services');
    });

    expect(global.document.getElementById).toHaveBeenCalledWith('services');
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 520, // 100 + 500 - 80
      behavior: 'smooth',
    });
    expect(mockPush).toHaveBeenCalledWith('#services', { scroll: false });
    expect(mockClose).toHaveBeenCalled();
    expect(mockElement.focus).toHaveBeenCalledWith({ preventScroll: true });
  });

  it('should not scroll when element does not exist', () => {
    global.document.getElementById = jest.fn().mockReturnValue(null);
    
    const { result } = renderHook(() => useHeader());

    act(() => {
      result.current.scrollToSection('nonexistent');
    });

    expect(window.scrollTo).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should call lockScroll when menu opens', () => {
    const mockLockScroll = jest.fn();
    const mockUnlockScroll = jest.fn();
    
    mockScrollLock.useScrollLock.mockReturnValue({
      lockScroll: mockLockScroll,
      unlockScroll: mockUnlockScroll,
    });

    // First render with menu closed
    mockDisclosure.useDisclosure.mockReturnValue({
      isOpen: false,
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
    });

    const { rerender } = renderHook(() => useHeader());

    // Second render with menu open
    mockDisclosure.useDisclosure.mockReturnValue({
      isOpen: true,
      open: jest.fn(),
      close: jest.fn(),
      toggle: jest.fn(),
    });

    rerender();

    expect(mockLockScroll).toHaveBeenCalled();
  });
});