import { render, screen } from '@testing-library/react';
import Logo from '@/components/layout/Header/Logo';

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('Logo', () => {
  it('should render logo text', () => {
    render(<Logo />);
    expect(screen.getByText('Éducateur péi')).toBeInTheDocument();
  });

  it('should render as a link to home', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should have correct accessibility attributes', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Accueil Éducateur péi');
  });

  it('should have correct CSS classes', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass(
      'flex',
      'items-center',
      'font-bold',
      'whitespace-nowrap',
      'transition-colors',
      'duration-300',
      'hover:text-primary',
      'logo-text',
      'font-annie'
    );
  });

  it('should apply custom className', () => {
    render(<Logo className="custom-logo-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-logo-class');
  });

  it('should be wrapped in a container div', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    const container = link.parentElement;
    expect(container).toBeInTheDocument();
    // Test modifié pour vérifier la structure réelle
    expect(container?.tagName).toBe('DIV');
  });
});