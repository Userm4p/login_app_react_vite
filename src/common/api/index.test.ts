const mockAxiosInstance = {
  interceptors: {
    response: {
      use: jest.fn(),
    },
  },
};

jest.mock("axios", () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

// Mock envs
jest.mock("../config/envs", () => ({
  envs: {
    VITE_API_URL: "http://localhost:3000/api",
  },
}));

// Mock localStorage helpers
jest.mock("../helpers/localstorage", () => ({
  removeLoginInfoInLocalStorage: jest.fn(),
}));

// Mock reloadPage helper
jest.mock("../helpers/reloadPage", () => ({
  reloadPage: jest.fn(),
}));

describe("API Client", () => {
  let mockRemoveLoginInfo: jest.Mock;
  let mockReloadPage: jest.Mock;

  beforeEach(async () => {
    jest.clearAllMocks();
    jest.resetModules();

    const localStorageModule = await import("../helpers/localstorage");
    const reloadPageModule = await import("../helpers/reloadPage");
    mockRemoveLoginInfo =
      localStorageModule.removeLoginInfoInLocalStorage as jest.Mock;
    mockReloadPage = reloadPageModule.reloadPage as jest.Mock;

    await import("./index");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("configura el interceptor de respuesta", () => {
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });

  it("maneja errores 401 correctamente", async () => {
    const interceptorCallback =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    const error = { response: { status: 401 } };

    await expect(interceptorCallback(error)).rejects.toBe(error);

    expect(mockRemoveLoginInfo).toHaveBeenCalled();
    expect(mockReloadPage).toHaveBeenCalled();
  });

  it("rechaza otros errores sin modificar", async () => {
    const interceptorCallback =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    const error = { response: { status: 500 } };

    await expect(interceptorCallback(error)).rejects.toBe(error);
    expect(mockRemoveLoginInfo).not.toHaveBeenCalled();
    expect(mockReloadPage).not.toHaveBeenCalled();
  });

  it("maneja errores sin response", async () => {
    const interceptorCallback =
      mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
    const error = { message: "Network error" };

    await expect(interceptorCallback(error)).rejects.toBe(error);
    expect(mockRemoveLoginInfo).not.toHaveBeenCalled();
    expect(mockReloadPage).not.toHaveBeenCalled();
  });
});
