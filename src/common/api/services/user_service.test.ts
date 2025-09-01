import { UserService } from "./user_service";

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(),
}));

// Mock apiClient
jest.mock("../index", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  },
}));

// Mock types
jest.mock("../../types/LoginResponse", () => ({
  LoginResponse: {},
}));

jest.mock("../../types/UserResponse", () => ({
  UserResponse: {},
  UserUpdateResponse: {},
  UpdateUserFormRequest: {},
}));

describe("UserService", () => {
  let userService: UserService;
  let mockApiClient: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Get mocked apiClient
    mockApiClient = require("../index").default;

    // Create service instance
    userService = new UserService("test-token");
  });

  describe("constructor", () => {
    it("crea una instancia con token", () => {
      const serviceWithToken = new UserService("test-token");
      expect(serviceWithToken.token).toBe("test-token");
      expect(serviceWithToken.apiClient).toBe(mockApiClient);
    });

    it("crea una instancia sin token", () => {
      const serviceWithoutToken = new UserService();
      expect(serviceWithoutToken.token).toBeNull();
      expect(serviceWithoutToken.apiClient).toBe(mockApiClient);
    });
  });

  describe("loginUser", () => {
    it("hace login exitosamente", async () => {
      const mockResponse = {
        data: {
          data: { token: "new-token", user: { id: 1, username: "test" } },
        },
      };

      mockApiClient.post.mockResolvedValue(mockResponse);

      const result = await userService.loginUser("username", "password");

      expect(mockApiClient.post).toHaveBeenCalledWith("/usuarios/api/login/", {
        username: "username",
        password: "password",
      });
      expect(result).toEqual(mockResponse.data.data);
    });

    it("maneja errores en login", async () => {
      const mockError = new Error("Login failed");
      mockApiClient.post.mockRejectedValue(mockError);

      await expect(
        userService.loginUser("username", "password"),
      ).rejects.toThrow("Login failed");
    });
  });

  describe("getUserInfo", () => {
    it("obtiene información del usuario exitosamente", async () => {
      const mockResponse = {
        data: {
          data: { id: 1, username: "test", email: "test@test.com" },
        },
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await userService.getUserInfo();

      expect(mockApiClient.get).toHaveBeenCalledWith("/usuarios/api/perfil/", {
        headers: {
          Authorization: "Bearer test-token",
        },
      });
      expect(result).toEqual(mockResponse.data.data);
    });

    it("maneja errores al obtener información del usuario", async () => {
      const mockError = new Error("Failed to get user info");
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(userService.getUserInfo()).rejects.toThrow(
        "Failed to get user info",
      );
    });
  });

  describe("updateUserInfo", () => {
    it("actualiza información del usuario exitosamente", async () => {
      const mockUserInfo = { name: "John Doe", email: "john@test.com" };
      const mockResponse = {
        data: {
          data: { success: true, message: "Updated successfully" },
        },
      };

      mockApiClient.put.mockResolvedValue(mockResponse);

      const result = await userService.updateUserInfo(mockUserInfo as any);

      expect(mockApiClient.put).toHaveBeenCalledWith(
        "/usuarios/api/usuario/perfil/",
        mockUserInfo,
        {
          headers: {
            Authorization: "Bearer test-token",
          },
        },
      );
      expect(result).toEqual(mockResponse.data.data);
    });

    it("maneja errores al actualizar información del usuario", async () => {
      const mockUserInfo = { name: "John Doe" };
      const mockError = new Error("Failed to update user info");
      mockApiClient.put.mockRejectedValue(mockError);

      await expect(
        userService.updateUserInfo(mockUserInfo as any),
      ).rejects.toThrow("Failed to update user info");
    });
  });

  describe("updateUserProfilePicture", () => {
    it("actualiza la foto de perfil exitosamente", async () => {
      const mockFormData = new FormData();
      mockFormData.append("photo", new File([""], "photo.jpg"));

      const mockResponse = {
        data: {
          data: { success: true, photo_url: "new-photo.jpg" },
        },
      };

      mockApiClient.patch.mockResolvedValue(mockResponse);

      const result = await userService.updateUserProfilePicture(mockFormData);

      expect(mockApiClient.patch).toHaveBeenCalledWith(
        "/usuarios/api/perfil/foto/",
        mockFormData,
        {
          headers: {
            Authorization: "Bearer test-token",
            "Content-Type": "multipart/form-data",
          },
        },
      );
      expect(result).toEqual(mockResponse.data.data);
    });

    it("maneja errores al actualizar la foto de perfil", async () => {
      const mockFormData = new FormData();
      const mockError = new Error("Failed to update profile picture");
      mockApiClient.patch.mockRejectedValue(mockError);

      await expect(
        userService.updateUserProfilePicture(mockFormData),
      ).rejects.toThrow("Failed to update profile picture");
    });
  });

  describe("getUserPhotoBlob", () => {
    it("obtiene la foto del usuario como blob exitosamente", async () => {
      const mockBlob = new Blob(["photo data"], { type: "image/jpeg" });
      const mockResponse = {
        data: mockBlob,
      };

      mockApiClient.get.mockResolvedValue(mockResponse);

      const result = await userService.getUserPhotoBlob("path/to/photo.jpg");

      expect(mockApiClient.get).toHaveBeenCalledWith(
        "/usuarios/path/to/photo.jpg",
        {
          headers: {
            Authorization: "Bearer test-token",
          },
          responseType: "blob",
        },
      );
      expect(result).toBe(mockBlob);
    });

    it("maneja errores al obtener la foto del usuario", async () => {
      const mockError = new Error("Failed to get user photo");
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(
        userService.getUserPhotoBlob("path/to/photo.jpg"),
      ).rejects.toThrow("Failed to get user photo");
    });
  });

  describe("setToken", () => {
    it("actualiza el token correctamente", () => {
      expect(userService.token).toBe("test-token");

      userService.setToken("new-token");

      expect(userService.token).toBe("new-token");
    });
  });
});
