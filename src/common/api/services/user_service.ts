import type { AxiosInstance } from "axios";
import apiClient from "../index";
import type { LoginResponse } from "../../types/LoginResponse";
import type {
  UpdateUserFormRequest,
  UserResponse,
  UserUpdateResponse,
} from "../../types/UserResponse";

const apiPath = "/usuarios/api/";

export class UserService {
  apiClient: AxiosInstance;
  token: string | null;

  constructor(token: string | null = null) {
    this.apiClient = apiClient;
    this.token = token;
  }

  async loginUser(username: string, password: string) {
    const { data } = await this.apiClient.post<LoginResponse>(
      apiPath + "login/",
      { username, password },
    );
    return data.data;
  }

  async getUserInfo() {
    const { data } = await this.apiClient.get<UserResponse>(
      apiPath + `perfil/`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    return data.data;
  }

  async updateUserInfo(userInfo: UpdateUserFormRequest) {
    const { data } = await this.apiClient.put<UserUpdateResponse>(
      apiPath + `usuario/perfil/`,
      userInfo,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
    return data.data;
  }

  async updateUserProfilePicture(formData: FormData) {
    const { data } = await this.apiClient.patch<UserUpdateResponse>(
      apiPath + `perfil/foto/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return data.data;
  }

  async getUserPhotoBlob(photoPath: string) {
    const { data } = await this.apiClient.get<Blob>("/usuarios/" + photoPath, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      responseType: "blob",
    });
    return data;
  }

  setToken(token: string) {
    this.token = token;
  }
}
