import { render, screen } from "@testing-library/react";
jest.mock("../../common/config/envs");
jest.mock("./useUserProfile", () => ({
  useUserProfile: () => ({
    updateUserInfo: jest.fn(),
    error: "",
    loading: { photo: false, updateInfo: false, updatePhoto: false },
    basic_info: {
      first_name: "Julia",
      last_name: "Doe",
      email: "julia@example.com",
      telefono: "123456789",
      username: "juliadoe",
      biografia: "Bio",
      foto: null,
      redes_sociales: {},
    },
    educacion: [],
    experiencia_laboral: [],
    habilidades: [],
    portafolio: [],
    getUserInfo: jest.fn(),
    updateUserPhoto: jest.fn(),
    getUserPhotoUrl: jest.fn(),
    photoUrl: "",
  }),
}));
import UserProfile from "./UserProfile";
describe("UserProfile", () => {
  it("renderiza sin crashear", () => {
    render(<UserProfile />);
    expect(screen.getByText("Julia Doe")).toBeInTheDocument();
  });
});
