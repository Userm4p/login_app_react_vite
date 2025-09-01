import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
jest.mock("../context/LoginContext/LoginContext", () => ({
  __esModule: true,
  default: {
    Provider: ({ children }: any) => children,
    Consumer: ({ children }: any) => children({ logout: jest.fn() }),
  },
}));
jest.mock("react", () => {
  const actualReact = jest.requireActual("react");
  return {
    ...actualReact,
    useContext: () => ({ logout: jest.fn() }),
  };
});
import Header from "./Header";
describe("Header", () => {
  it("renderiza el texto principal", () => {
    render(<Header />);
    expect(screen.getByText("Login React App")).toBeInTheDocument();
  });
});
