import {
  setLoginInfoInLocalStorage,
  removeLoginInfoInLocalStorage,
} from "./localstorage";
import type { User } from "../types/UserResponse";

describe("localstorage helpers", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const user: User = {
    basic_info: {
      biografia: "Bio",
      documento: "",
      email: "julia@example.com",
      first_name: "Julia",
      foto: "",
      id_usuario: 1,
      last_name: "Doe",
      redes_sociales: {
        github: "",
        linkedin: "",
        sitio_web: "",
        twitter: "",
      },
      telefono: "123456789",
      username: "juliadoe",
    },
    cursos_impartidos: [],
    educacion: [],
    esta_verificado: false,
    experiencia_laboral: [],
    habilidades: [],
    portafolio: [],
    tipo_usuario: "normal",
  };

  it("setLoginInfoInLocalStorage guarda user y token", () => {
    setLoginInfoInLocalStorage(user, "token123");
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
    expect(localStorage.getItem("access_token")).toBe("token123");
  });

  it("removeLoginInfoInLocalStorage elimina user y token", () => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("access_token", "token123");
    removeLoginInfoInLocalStorage();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("access_token")).toBeNull();
  });
});
