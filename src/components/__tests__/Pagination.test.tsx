import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const renderUI = (props = {}) => {
    const defaultProps = {
      currentPage: 1,
      isLastPage: false,
      onPageChange: vi.fn(),
    };

    return render(<Pagination {...defaultProps} {...props} />);
  };

  it('renders current page number', () => {
    renderUI({ currentPage: 2 });

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders a disabled "Previous" button when on the first page', () => {
    renderUI({ currentPage: 1 });

    const previousButton = screen.getByLabelText('Previous results');

    expect(previousButton).toBeDisabled();
  });

  it('renders an enabled "Previous" button when not on the first page', () => {
    renderUI({ currentPage: 2 });

    const previousButton = screen.getByLabelText('Previous results');

    expect(previousButton).not.toBeDisabled();
  });

  it('renders a disabled "Next" button when on the last page', () => {
    renderUI({ isLastPage: true });

    const nextButton = screen.getByLabelText('Next results');

    expect(nextButton).toBeDisabled();
  });

  it('renders an enabled "Next" button when not on the last page', () => {
    renderUI({ isLastPage: false });

    const nextButton = screen.getByLabelText('Next results');

    expect(nextButton).not.toBeDisabled();
  });

  it('calls handler with previous page number when "Previous" button is clicked', async () => {
    const onPageChange = vi.fn();

    renderUI({ currentPage: 2, onPageChange });

    const previousButton = screen.getByLabelText('Previous results');

    await userEvent.click(previousButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls handler with next page number when "Next" button is clicked', async () => {
    const onPageChange = vi.fn();

    renderUI({ currentPage: 1, onPageChange });

    const nextButton = screen.getByLabelText('Next results');

    await userEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call handler when "Previous" button is disabled and clicked', async () => {
    const onPageChange = vi.fn();

    renderUI({ currentPage: 1, onPageChange });

    const previousButton = screen.getByLabelText('Previous results');

    await userEvent.click(previousButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not call handler when "Next" button is disabled and clicked', async () => {
    const onPageChange = vi.fn();

    renderUI({ isLastPage: true, onPageChange });

    const nextButton = screen.getByLabelText('Next results');

    await userEvent.click(nextButton);

    expect(onPageChange).not.toHaveBeenCalled();
  });
});
