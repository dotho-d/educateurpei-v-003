import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from '@/components/layout/Header/MobileMenu';

// Mock du hook useFontSizes
jest.mock('@/hooks/useFontSizes', () => ({
  useFontSizes: () => ({
    navLink: '21px',
    button: '21px',
  }),
}));

const mockProps = {
  isOpen: false,
  onClose: jest.fn(),
  currentSection: 'home',
  onNavigate: jest.fn(),
};

describe('MobileMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when closed', () => {
    render(<MobileMenu {...mockProps} isOpen={false} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should render all navigation links when open', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should render action buttons when open', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    expect(screen.getByText('Prendre RDV')).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  it('should call onNavigate when navigation link clicked', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const servicesLink = screen.getByText('Services');
    fireEvent.click(servicesLink);

    expect(mockProps.onNavigate).toHaveBeenCalledWith('services');
  });

  it('should call onClose when navigation link clicked', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const servicesLink = screen.getByText('Services');
    fireEvent.click(servicesLink);

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should call onNavigate for contact when Prendre RDV clicked', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const rdvButton = screen.getByText('Prendre RDV');
    fireEvent.click(rdvButton);

    expect(mockProps.onNavigate).toHaveBeenCalledWith('contact');
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should call onClose when Connexion link clicked', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const connexionLink = screen.getByText('Connexion');
    fireEvent.click(connexionLink);

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should mark current section as active', () => {
    render(<MobileMenu {...mockProps} isOpen={true} currentSection="services" />);

    const servicesButton = screen.getByText('Services');
    expect(servicesButton).toHaveAttribute('aria-current', 'page');
    expect(servicesButton).toHaveClass('text-primary', 'font-semibold');
  });

  it('should handle keyboard navigation - Escape key', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const navigation = screen.getByRole('navigation');
    fireEvent.keyDown(navigation, { key: 'Escape' });

    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it('should have correct accessibility attributes', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Menu principal mobile');
    expect(navigation).toHaveAttribute('aria-hidden', 'false');
    expect(navigation).toHaveAttribute('id', 'mobile-menu');
  });

  it('should have correct semantic structure', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const navigation = screen.getByRole('navigation');
    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(navigation).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(4); // 4 navigation items
  });

  it('should apply correct CSS classes for mobile positioning', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveClass(
      'absolute',
      'top-16',
      'left-0',
      'right-0',
      'z-40',
      'w-full',
      'bg-background',
      'shadow-lg',
      'border-b',
      'border-border',
      'rounded-b-2xl',
      'animate-fadeIn'
    );
  });

  it('should use font sizes from hook', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const navLinks = screen.getAllByRole('button').slice(0, 4); // First 4 are nav links
    navLinks.forEach(link => {
      expect(link).toHaveStyle({ fontSize: '21px' });
    });
  });

  it('should handle Tab key navigation correctly', () => {
    render(<MobileMenu {...mockProps} isOpen={true} />);

    const firstNavItem = screen.getByText('Expertise');
    const lastButton = screen.getByText('Connexion');

    // Test forward Tab from last element
    fireEvent.keyDown(lastButton, { key: 'Tab', shiftKey: false });

    // Test backward Tab from first element
    fireEvent.keyDown(firstNavItem, { key: 'Tab', shiftKey: true });

    // Ces événements ne devraient pas causer d'erreur
    expect(mockProps.onClose).not.toHaveBeenCalled();
  });
});