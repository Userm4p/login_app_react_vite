import { AxiosError } from "axios";

export interface ErrorResponse {
  message?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  public status: number;
  public code: string;
  public details?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    code?: string,
    details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code || "UNKNOWN_ERROR";
    this.details = details;
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status || 0;
    const errorData = error.response?.data as ErrorResponse;

    let message = "An error occurred";
    let code = "UNKNOWN_ERROR";
    let details: Record<string, string[]> | undefined;

    switch (status) {
      case 400:
        message = errorData?.message || errorData?.detail || "Bad request";
        code = "BAD_REQUEST";
        details = errorData?.errors;
        break;
      case 401:
        message = errorData?.message || errorData?.detail || "Unauthorized";
        code = "UNAUTHORIZED";
        break;
      case 403:
        message = errorData?.message || errorData?.detail || "Forbidden";
        code = "FORBIDDEN";
        break;
      case 404:
        message = errorData?.message || errorData?.detail || "Not found";
        code = "NOT_FOUND";
        break;
      case 409:
        message = errorData?.message || errorData?.detail || "Conflict";
        code = "CONFLICT";
        break;
      case 422:
        message = errorData?.message || errorData?.detail || "Validation error";
        code = "VALIDATION_ERROR";
        details = errorData?.errors;
        break;
      case 429:
        message =
          errorData?.message || errorData?.detail || "Too many requests";
        code = "RATE_LIMIT_EXCEEDED";
        break;
      case 500:
        message =
          errorData?.message || errorData?.detail || "Internal server error";
        code = "INTERNAL_SERVER_ERROR";
        break;
      case 502:
        message = errorData?.message || errorData?.detail || "Bad gateway";
        code = "BAD_GATEWAY";
        break;
      case 503:
        message =
          errorData?.message || errorData?.detail || "Service unavailable";
        code = "SERVICE_UNAVAILABLE";
        break;
      case 504:
        message = errorData?.message || errorData?.detail || "Gateway timeout";
        code = "GATEWAY_TIMEOUT";
        break;
      default:
        if (error.code === "ECONNABORTED") {
          message = "Request timeout";
          code = "TIMEOUT";
        } else if (error.code === "ERR_NETWORK") {
          message = "Network error";
          code = "NETWORK_ERROR";
        } else {
          message =
            errorData?.message ||
            errorData?.detail ||
            error.message ||
            "Unknown error";
          code = "UNKNOWN_ERROR";
        }
    }

    return new ApiError(status, message, code, details);
  }

  if (error instanceof Error) {
    return new ApiError(0, error.message, "GENERIC_ERROR");
  }

  return new ApiError(0, "An unknown error occurred", "UNKNOWN_ERROR");
};

export const getErrorMessageKey = (error: ApiError): string => {
  const { status, code } = error;

  switch (code) {
    case "TIMEOUT":
      return "timeout";
    case "NETWORK_ERROR":
      return "network";
    case "VALIDATION_ERROR":
      return "validation";
    case "RATE_LIMIT_EXCEEDED":
      return "api.429";
  }

  if (status >= 400 && status < 500) {
    if (status === 401) return "api.401";
    if (status === 403) return "api.403";
    if (status === 404) return "api.404";
    if (status === 409) return "api.409";
    if (status === 422) return "api.422";
    return "api.400";
  }

  if (status >= 500) {
    if (status === 502) return "api.502";
    if (status === 503) return "api.503";
    if (status === 504) return "api.504";
    return "api.500";
  }

  return "general";
};

export const getLoginErrorMessageKey = (error: ApiError): string => {
  const { status } = error;

  if (status === 401) {
    return "login.invalidCredentials";
  }

  if (status === 423) {
    return "login.accountLocked";
  }

  if (status === 429) {
    return "login.tooManyAttempts";
  }

  if (status === 503) {
    return "login.serviceUnavailable";
  }

  return getErrorMessageKey(error);
};

export const getUserProfileErrorMessageKey = (
  error: ApiError,
  operation: "fetch" | "update" | "photoUpload" | "photoFetch",
): string => {
  const { status, code } = error;

  if (code === "VALIDATION_ERROR") {
    if (operation === "photoUpload") {
      return "userProfile.invalidPhotoFormat";
    }
    return "validation";
  }

  if (operation === "photoUpload" && status === 413) {
    return "userProfile.photoTooLarge";
  }

  if (operation === "fetch") {
    return "userProfile.fetchError";
  }

  if (operation === "update") {
    return "userProfile.updateError";
  }

  if (operation === "photoUpload") {
    return "userProfile.photoUploadError";
  }

  if (operation === "photoFetch") {
    return "userProfile.photoFetchError";
  }

  return getErrorMessageKey(error);
};
