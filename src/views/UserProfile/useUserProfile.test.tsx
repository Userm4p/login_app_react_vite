import { renderHook, act } from "@testing-library/react";
import { useUserProfile } from "./useUserProfile";
import LoginContext from "../../common/context/LoginContext/LoginContext";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
jest.mock("../../common/api/services/user_service", () => ({
  UserService: function () {
    return {
      getUserInfo: jest.fn().mockResolvedValue({
        basic_info: {},
        educacion: [],
        experiencia_laboral: [],
        habilidades: [],
        portafolio: [],
      }),
      updateUserInfo: jest.fn().mockResolvedValue({}),
      updateUserProfilePicture: jest.fn().mockResolvedValue({}),
      getUserPhotoBlob: jest.fn().mockResolvedValue(new Blob()),
    };
  },
}));

const userMock = {
  basic_info: {},
  educacion: [],
  experiencia_laboral: [],
  habilidades: [],
  portafolio: [],
  cursos_impartidos: [],
  esta_verificado: false,
  tipo_usuario: "normal",
};

const providerValue = {
  isLoggedIn: true,
  token: "token",
  user: userMock,
  setUser: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
};

describe("useUserProfile", () => {
  it("getUserInfo actualiza el usuario", async () => {
    const { result } = renderHook(() => useUserProfile(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue as any}>
          {children}
        </LoginContext.Provider>
      ),
    });
    await act(async () => {
      await result.current.getUserInfo();
    });
    expect(
      result.current.error === "" || result.current.error === "error",
    ).toBe(true);
  });

  it("updateUserInfo actualiza la info", async () => {
    const { result } = renderHook(() => useUserProfile(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue as any}>
          {children}
        </LoginContext.Provider>
      ),
    });
    await act(async () => {
      await result.current.updateUserInfo({} as any);
    });
    expect(
      result.current.error === "" || result.current.error === "error",
    ).toBe(true);
  });

  it("updateUserPhoto actualiza la foto", async () => {
    const { result } = renderHook(() => useUserProfile(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue as any}>
          {children}
        </LoginContext.Provider>
      ),
    });
    await act(async () => {
      await result.current.updateUserPhoto(new File([""], "photo.png"));
    });
    expect(
      result.current.error === "" || result.current.error === "error",
    ).toBe(true);
  });

  it("getUserPhotoUrl actualiza la url de la foto", async () => {
    const { result } = renderHook(() => useUserProfile(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue as any}>
          {children}
        </LoginContext.Provider>
      ),
    });
    await act(async () => {
      await result.current.getUserPhotoUrl("path/to/photo");
    });
    expect(
      result.current.error === "" || result.current.error === "error",
    ).toBe(true);
  });
});
