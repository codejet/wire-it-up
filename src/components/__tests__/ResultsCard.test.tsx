import { render, screen } from '@testing-library/react';
import { ResultsCard } from '../ResultsCard';
import userEvent from '@testing-library/user-event';

describe('ResultsCard Component', () => {
  const mockResult = {
    name: 'Test Project',
    description: 'A test project for demonstration purposes',
    homepage: 'https://testproject.com',
    stars: 123,
    owner: 'testowner',
  };

  it('renders the project name', () => {
    render(<ResultsCard result={mockResult} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Project',
    );
  });

  it('renders the project description', () => {
    render(<ResultsCard result={mockResult} />);

    expect(
      screen.getByText('A test project for demonstration purposes'),
    ).toBeInTheDocument();
  });

  it('renders the homepage link when homepage is provided', () => {
    render(<ResultsCard result={mockResult} />);

    const link = screen.getByRole('link', { name: /testproject.com/i });

    expect(link).toHaveAttribute('href', 'https://testproject.com');
  });

  it('does not render the homepage section if homepage is null', () => {
    const noHomepageResult = { ...mockResult, homepage: null };

    render(<ResultsCard result={noHomepageResult} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the owner and stars', () => {
    render(<ResultsCard result={mockResult} />);

    expect(screen.getByText('Owner:')).toBeInTheDocument();
    expect(screen.getByText('testowner')).toBeInTheDocument();
    expect(screen.getByText('Stars:')).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('renders the home icon when homepage is provided', () => {
    render(<ResultsCard result={mockResult} />);

    const img = screen.getByAltText('home icon');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining('home-icon.svg'),
    );
  });
});
