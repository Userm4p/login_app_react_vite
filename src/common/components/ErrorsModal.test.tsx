import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ErrorsModal } from "./ErrorsModal";
describe("ErrorsModal", () => {
  it("renderiza el modal de error si hay error", () => {
    render(<ErrorsModal error="Error de prueba" />);
    expect(screen.getByText("errorTitle")).toBeInTheDocument();
    expect(screen.getByText("Error de prueba")).toBeInTheDocument();
  });
});
