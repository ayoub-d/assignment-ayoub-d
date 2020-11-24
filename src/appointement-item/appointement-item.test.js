import { render, screen } from '@testing-library/react';
import AppointementItem from './appointement-item';

const appointement = {
    title: "Test Appointement",
    start: new Date(),
    end: new Date(),
}

const handleDelete = () => {};

test('renders appointement item', () => {
  render(<AppointementItem appointement={appointement} onAppointementDeleted={handleDelete}/>);
  const linkElement = screen.getByText(appointement.title);
  expect(linkElement).toBeInTheDocument();
});
