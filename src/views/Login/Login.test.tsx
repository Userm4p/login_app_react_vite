import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

jest.mock("../../common/config/envs");

describe("Login", () => {
  it("renderiza el formulario de login", () => {
    render(<Login />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
