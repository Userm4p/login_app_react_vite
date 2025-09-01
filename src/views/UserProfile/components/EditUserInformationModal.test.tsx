import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EditUserModal from "./EditUserInformationModal";
const user = {
  first_name: "Julia",
  last_name: "Doe",
  email: "julia@example.com",
  telefono: "123456789",
  username: "juliadoe",
  biografia: "Bio",
  foto: "",
  redes_sociales: {
    github: "",
    linkedin: "",
    sitio_web: "",
    twitter: "",
  },
  documento: "",
  id_usuario: 1,
};
describe("EditUserInformationModal", () => {
  it("renderiza el botón de editar perfil", () => {
    render(<EditUserModal user={user} onSave={jest.fn()} loading={false} />);
    expect(screen.getByText("editProfile")).toBeInTheDocument();
  });
});
