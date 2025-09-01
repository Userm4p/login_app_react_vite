import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
jest.mock("../../i18n", () => ({}));
import Layout from "./Layout";
describe("Layout", () => {
  it("renderiza los children", () => {
    render(
      <Layout>
        <div>Contenido</div>
      </Layout>,
    );
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });
});
