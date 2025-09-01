import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  handleApiError,
  getErrorMessageKey,
  getLoginErrorMessageKey,
  getUserProfileErrorMessageKey,
} from "../helpers/errorHandler";

export const useErrorHandler = () => {
  const { t } = useTranslation("errors");

  const handleError = useCallback(
    (error: unknown): string => {
      const apiError = handleApiError(error);
      const errorMessageKey = getErrorMessageKey(apiError);
      return t(errorMessageKey);
    },
    [t],
  );

  const handleLoginError = useCallback(
    (error: unknown): string => {
      const apiError = handleApiError(error);
      const errorMessageKey = getLoginErrorMessageKey(apiError);
      return t(errorMessageKey);
    },
    [t],
  );

  const handleUserProfileError = useCallback(
    (
      error: unknown,
      operation: "fetch" | "update" | "photoUpload" | "photoFetch",
    ): string => {
      const apiError = handleApiError(error);
      const errorMessageKey = getUserProfileErrorMessageKey(
        apiError,
        operation,
      );
      return t(errorMessageKey);
    },
    [t],
  );

  const handleCustomError = useCallback(
    (error: unknown, customKey: string): string => {
      try {
        const apiError = handleApiError(error);
        if (apiError.status > 0) {
          const errorMessageKey = getErrorMessageKey(apiError);
          return t(errorMessageKey);
        }
        return t(customKey);
      } catch {
        return t(customKey);
      }
    },
    [t],
  );

  return {
    handleError,
    handleLoginError,
    handleUserProfileError,
    handleCustomError,
  };
};
