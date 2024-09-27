import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders logo', () => {
    render(<Header />);

    expect(screen.getByAltText('Bower Logo')).toBeInTheDocument();
    expect(screen.getByText('Package Search')).toBeInTheDocument();
    expect(screen.getByText('Powered by')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /libraries\.io/i }),
    ).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);

    const navLinks = ['Docs', 'Search Packages', 'Blog', 'Stats'];

    navLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
