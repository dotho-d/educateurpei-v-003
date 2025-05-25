import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/layout/Header';

// Mock du hook useHeader
const mockHeaderState = {
  isScrolled: false,
  isMenuOpen: false,
  currentSection: 'home',
  toggleMenu: jest.fn(),
  closeMenu: jest.fn(),
  scrollToSection: jest.fn(),
};

jest.mock('@/hooks/useHeader', () => ({
  useHeader: () => mockHeaderState,
}));

// Mock des composants enfants
jest.mock('@/components/layout/Header/Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Éducateur péi</div>;
  };
});

jest.mock('@/components/layout/Header/Navigation', () => {
  return function MockNavigation({ currentSection, onNavigate }) {
    return (
      <nav data-testid="navigation">
        <button onClick={() => onNavigate('services')}>Services</button>
        <button onClick={() => onNavigate('tarifs')}>Tarifs</button>
      </nav>
    );
  };
});

jest.mock('@/components/layout/Header/MobileMenu', () => {
  return function MockMobileMenu({ isOpen, onClose, onNavigate }) {
    if (!isOpen) return null;
    return (
      <div data-testid="mobile-menu">
        <button onClick={() => onNavigate('services')}>Services Mobile</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/components/layout/Header/Actions', () => {
  return function MockActions({ onMenuToggle, isMenuOpen }) {
    return (
      <div data-testid="actions">
        <button 
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    );
  };
});

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock state
    Object.assign(mockHeaderState, {
      isScrolled: false,
      isMenuOpen: false,
      currentSection: 'home',
      toggleMenu: jest.fn(),
      closeMenu: jest.fn(),
      scrollToSection: jest.fn(),
    });
  });

  it('should render all header components', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('actions')).toBeInTheDocument();
  });

  it('should have correct base classes', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('fixed', 'top-0', 'w-full', 'z-50');
  });

  it('should apply scrolled styles when scrolled', () => {
    mockHeaderState.isScrolled = true;
    
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-background/95', 'backdrop-blur-sm', 'shadow-sm');
  });

  it('should apply not-scrolled styles when not scrolled', () => {
    mockHeaderState.isScrolled = false;
    
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-background/50', 'backdrop-blur-sm');
    expect(header).not.toHaveClass('shadow-sm');
  });

  it('should render mobile menu when open', () => {
    mockHeaderState.isMenuOpen = true;
    
    render(<Header />);

    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
  });

  it('should not render mobile menu when closed', () => {
    mockHeaderState.isMenuOpen = false;
    
    render(<Header />);

    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('should call toggleMenu when menu button clicked', () => {
    render(<Header />);

    const menuButton = screen.getByLabelText('Ouvrir le menu');
    fireEvent.click(menuButton);

    expect(mockHeaderState.toggleMenu).toHaveBeenCalled();
  });

  it('should call scrollToSection when navigation item clicked', () => {
    render(<Header />);

    const servicesButton = screen.getByText('Services');
    fireEvent.click(servicesButton);

    expect(mockHeaderState.scrollToSection).toHaveBeenCalledWith('services');
  });

  it('should pass correct props to components', () => {
    mockHeaderState.currentSection = 'services';
    
    render(<Header />);

    // Vérifie que la navigation reçoit les bonnes props
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    
    // Vérifie que les actions reçoivent les bonnes props
    expect(screen.getByTestId('actions')).toBeInTheDocument();
  });

  it('should have semantic header role', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header.tagName).toBe('HEADER');
  });

  it('should apply custom className when provided', () => {
    render(<Header className="custom-class" />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-class');
  });

  it('should have correct container structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    const container = header.querySelector('div');
    
    expect(container).toHaveClass(
      'w-[90%]',
      'max-w-[1400px]',
      'mx-auto',
      'h-full',
      'flex',
      'justify-between',
      'items-center'
    );
  });
});