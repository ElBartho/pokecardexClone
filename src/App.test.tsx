import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('increments counter on button click', () => {
    render(<App />);
    const counterElement = screen.getByTestId('counter');
    const incrementButton = screen.getByRole('button', { name: 'Increment' });

    expect(counterElement).toHaveTextContent('0');

    fireEvent.click(incrementButton);
    expect(counterElement).toHaveTextContent('1');
  });
});
