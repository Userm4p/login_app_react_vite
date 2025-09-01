import { renderHook, act } from "@testing-library/react";
import { useLoginContext } from "./useLoginContext";
import type { User } from "../../types/UserResponse";

describe("useLoginContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("login actualiza el estado y localStorage", () => {
    const { result } = renderHook(() => useLoginContext());
    const user = {
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
    } as User;
    act(() => {
      result.current.login(user, "token123");
    });
    expect(result.current.isLoggedIn).toBe(true);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(user));
    expect(localStorage.getItem("access_token")).toBe("token123");
  });

  it("logout limpia el estado y localStorage", () => {
    const { result } = renderHook(() => useLoginContext());
    act(() => {
      result.current.logout();
    });
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("access_token")).toBeNull();
  });

  it("setUser refresca el usuario", () => {
    const { result } = renderHook(() => useLoginContext());
    const user = {
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
    } as User;
    act(() => {
      result.current.setUser(user);
    });
    expect(result.current.user).toEqual(user);
  });
});
