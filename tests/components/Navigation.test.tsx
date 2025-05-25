import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '@/components/layout/Header/Navigation';

const mockOnNavigate = jest.fn();

const defaultProps = {
  currentSection: 'home',
  onNavigate: mockOnNavigate,
};

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all navigation links', () => {
    render(<Navigation {...defaultProps} />);

    expect(screen.getByText('Expertise')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Tarifs')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('should have correct semantic structure', () => {
    render(<Navigation {...defaultProps} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigation principale');
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
  });

  it('should call onNavigate when link is clicked', () => {
    render(<Navigation {...defaultProps} />);

    const servicesLink = screen.getByText('Services');
    fireEvent.click(servicesLink);

    expect(mockOnNavigate).toHaveBeenCalledWith('services');
  });

  it('should mark current section as active', () => {
    render(<Navigation {...defaultProps} currentSection="services" />);

    const servicesButton = screen.getByText('Services');
    expect(servicesButton).toHaveAttribute('aria-current', 'page');
    expect(servicesButton).toHaveClass('text-primary', 'font-semibold');
  });

  it('should not mark non-current sections as active', () => {
    render(<Navigation {...defaultProps} currentSection="services" />);

    const expertiseButton = screen.getByText('Expertise');
    expect(expertiseButton).not.toHaveAttribute('aria-current');
    expect(expertiseButton).not.toHaveClass('text-primary', 'font-semibold');
  });

  it('should have correct CSS classes for desktop navigation', () => {
    render(<Navigation {...defaultProps} />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(
      'hidden',
      'lg:flex',
      'absolute',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'gap-8'
    );
  });

  it('should have proper button styling for nav links', () => {
    render(<Navigation {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass(
        'nav-text',
        'text-foreground/80',
        'transition-colors',
        'duration-150',
        'hover:text-primary'
      );
    });
  });

  it('should handle all navigation sections correctly', () => {
    const sections = ['domaines-intervention', 'services', 'tarifs', 'contact'];
    
    sections.forEach(section => {
      render(<Navigation {...defaultProps} currentSection={section} />);
      
      // Find the button that should be active
      const buttons = screen.getAllByRole('button');
      const activeButton = buttons.find(button => 
        button.getAttribute('aria-current') === 'page'
      );
      
      expect(activeButton).toBeInTheDocument();
    });
  });

  it('should have accessible button labels', () => {
    render(<Navigation {...defaultProps} />);

    expect(screen.getByLabelText('Voir nos domaines d\'expertise')).toBeInTheDocument();
    expect(screen.getByLabelText('Découvrir nos services')).toBeInTheDocument();
    expect(screen.getByLabelText('Consulter nos tarifs')).toBeInTheDocument();
    expect(screen.getByLabelText('Nous contacter')).toBeInTheDocument();
  });
});