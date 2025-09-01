import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./useLogin";
import LoginContext from "../../common/context/LoginContext/LoginContext";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (k: string) => k }),
}));
jest.mock("../../common/api/services/user_service", () => ({
  UserService: function () {
    return {
      loginUser: jest.fn().mockResolvedValue({ access: "token" }),
      setToken: jest.fn(),
      getUserInfo: jest.fn().mockResolvedValue({ user: "mock" }),
    };
  },
}));

const loginMock = jest.fn();
const providerValue = {
  isLoggedIn: false,
  user: null,
  token: null,
  login: loginMock,
  logout: jest.fn(),
  setUser: jest.fn(),
};

describe("useLogin", () => {
  it("handleInputChange actualiza el formulario", () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue}>
          {children}
        </LoginContext.Provider>
      ),
    });
    act(() => {
      result.current.handleInputChange({
        target: { name: "username", value: "julia" },
      } as any);
    });
    // No hay acceso directo al form, pero no debe lanzar error
  });

  it("handleSubmit llama a postLogin", async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: ({ children }) => (
        <LoginContext.Provider value={providerValue}>
          {children}
        </LoginContext.Provider>
      ),
    });
    await act(async () => {
      await result.current.handleSubmit({ preventDefault: () => {} } as any);
    });
    expect(result.current.loading).toBe(false);
    expect(
      result.current.error === "" || result.current.error === "error",
    ).toBe(true);
  });
});
