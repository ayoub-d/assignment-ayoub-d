import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointementsDashboard from './appointement-dashboard';


test('renders appointement dashboard', () => {
  render(<AppointementsDashboard />);
  const linkElement = screen.getByText(/Appointements Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders create appointement modal', async () => {
    render(<AppointementsDashboard />);
    fireEvent.click(screen.getByText('Create Appointement'));

    expect(screen.getByText("Appointement Title")).toBeInTheDocument()
  });
  