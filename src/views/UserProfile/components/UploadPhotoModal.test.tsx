import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadPhotoModal from "./UploadPhotoModal";
describe("UploadPhotoModal", () => {
  it("renderiza el botón de cambiar foto", () => {
    render(<UploadPhotoModal onSave={jest.fn()} loading={false} />);
    expect(screen.getByText("changePhoto")).toBeInTheDocument();
  });
});
