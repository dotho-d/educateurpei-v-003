/**
 * tests/components/ServiceCard.test.tsx
 * Tests unitaires pour ServiceCard
 */
import { render, screen } from '@testing-library/react';
import { MessageSquare } from 'lucide-react';
import ServiceCard from '@/components/home/service-card';

describe('ServiceCard', () => {
  const defaultProps = {
    icon: <MessageSquare data-testid="service-icon" />,
    title: 'Test Service',
    description: 'Description du service de test',
  };

  it('should render with correct content', () => {
    render(<ServiceCard {...defaultProps} />);

    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText('Description du service de test')).toBeInTheDocument();
    expect(screen.getByTestId('service-icon')).toBeInTheDocument();
  });

  it('should have correct accessibility attributes', () => {
    render(<ServiceCard {...defaultProps} />);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-labelledby');
  });

  it('should generate correct ID from title', () => {
    render(<ServiceCard {...defaultProps} />);

    const title = screen.getByText('Test Service');
    expect(title).toHaveAttribute('id', 'service-test-service-title');
  });

  it('should use custom ID when provided', () => {
    render(<ServiceCard {...defaultProps} id="custom-id" />);

    const title = screen.getByText('Test Service');
    expect(title).toHaveAttribute('id', 'custom-id-title');
  });
});