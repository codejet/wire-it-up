import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';

vi.mock('./container/Search', () => ({
  Search: () => <div>Search Component</div>,
}));

describe('Sidebar', () => {
  it('renders links correctly on desktop', () => {
    render(<Sidebar />);
    const sidebarLinks = [
      'Home',
      'Creating Packages',
      'API',
      'Configuration',
      'Pluggable Resolvers',
      'Tools',
      'About',
    ];

    sidebarLinks.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('renders button for mobile sidebar menu', () => {
    render(<Sidebar />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });
});
