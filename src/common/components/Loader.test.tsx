import { render } from "@testing-library/react";
import { Loader } from "./Loader";
describe("Loader", () => {
  it("renderiza el spinner", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
