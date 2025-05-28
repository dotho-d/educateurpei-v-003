/**
 * tests/accessibility/axe.test.ts
 * Tests d'accessibilité automatisés avec axe-core
 */
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from '@/app/page';

// Étendre Jest avec les matchers axe
expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('should not have accessibility violations on homepage', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading hierarchy', async () => {
    const { container } = render(<Home />);
    
    // Vérifier la hiérarchie des headings
    const h1Elements = container.querySelectorAll('h1');
    const h2Elements = container.querySelectorAll('h2');
    const h3Elements = container.querySelectorAll('h3');
    
    expect(h1Elements).toHaveLength(1); // Un seul H1 par page
    expect(h2Elements.length).toBeGreaterThan(0); // Au moins un H2
    expect(h3Elements.length).toBeGreaterThan(0); // Au moins un H3
  });

  it('should have accessible images', async () => {
    const { container } = render(<Home />);
    
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });

  it('should have proper ARIA landmarks', async () => {
    const { container } = render(<Home />);
    
    // Vérifier les landmarks essentiels
    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
  });

  it('should have accessible form controls', async () => {
    const { container } = render(<Home />);
    
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      // Chaque bouton doit avoir un nom accessible
      const hasAriaLabel = button.hasAttribute('aria-label');
      const hasTextContent = button.textContent && button.textContent.trim().length > 0;
      const hasAriaLabelledBy = button.hasAttribute('aria-labelledby');
      
      expect(hasAriaLabel || hasTextContent || hasAriaLabelledBy).toBe(true);
    });
  });
});