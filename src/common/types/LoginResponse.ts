import type { ApiResponse } from "./ApiResponse";

export interface LoginResponse extends ApiResponse {
  data: AuthInformation;
}

export interface AuthInformation {
  access: string;
  refresh: string;
  requires_2fa: boolean;
  rol: string;
  user_id: number;
}
