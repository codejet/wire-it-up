import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders footer ', () => {
    render(<Footer />);

    expect(screen.getByText('Help improve these docs.')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Open an issue or pull request/i }),
    ).toBeInTheDocument();
  });
});
