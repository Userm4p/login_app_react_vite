import type { AxiosInstance } from "axios";
import apiClient from "../index";
import type { LoginResponse } from "../../types/LoginResponse";
import type { UserResponse } from "../../types/UserResponse";

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

  async getUserInfo(token: string) {
    const { data } = await this.apiClient.get<UserResponse>(
      apiPath + `perfil/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data.data;
  }

  set setToken(token: string) {
    this.token = token;
  }
}
