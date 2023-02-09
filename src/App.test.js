import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome phrase", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to AIKreate/i);
  expect(linkElement).toBeInTheDocument();
});
