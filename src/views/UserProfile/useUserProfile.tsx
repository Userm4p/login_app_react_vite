import { useMemo, useCallback, useState, useContext } from "react";
import { UserService } from "../../common/api/services/user_service";
import LoginContext from "../../common/context/LoginContext/LoginContext";
import type { UpdateUserFormRequest } from "../../common/types/UserResponse";
import { useErrorHandler } from "../../common/hooks/useErrorHandler";

export const useUserProfile = () => {
  const { handleUserProfileError } = useErrorHandler();

  const [loading, setLoading] = useState({
    photo: false,
    info: false,
    updateInfo: false,
    updatePhoto: false,
  });
  const [error, setError] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const { token, user, setUser } = useContext(LoginContext);

  const userService = useMemo(() => new UserService(token), [token]);

  const getUserInfo = useCallback(async () => {
    setLoading((prev) => ({ ...prev, info: true }));
    setError("");
    try {
      const data = await userService.getUserInfo();
      setUser(data);
    } catch (error) {
      const errorMessage = handleUserProfileError(error, "fetch");
      setError(errorMessage);
    } finally {
      setLoading((prev) => ({ ...prev, info: false }));
    }
  }, [userService, setUser, handleUserProfileError]);

  const updateUserInfo = useCallback(
    async (data: UpdateUserFormRequest) => {
      setLoading((prev) => ({ ...prev, updateInfo: true }));
      setError("");
      try {
        await userService.updateUserInfo(data);
        await getUserInfo();
      } catch (error) {
        const errorMessage = handleUserProfileError(error, "update");
        setError(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, updateInfo: false }));
      }
    },
    [userService, getUserInfo, handleUserProfileError],
  );

  const updateUserPhoto = useCallback(
    async (file: File) => {
      setLoading((prev) => ({ ...prev, updatePhoto: true }));
      setError("");
      const formData = new FormData();
      formData.append("foto", file);
      try {
        await userService.updateUserProfilePicture(formData);
        await getUserInfo();
      } catch (error) {
        const errorMessage = handleUserProfileError(error, "photoUpload");
        setError(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, updatePhoto: false }));
      }
    },
    [userService, getUserInfo, handleUserProfileError],
  );

  const getUserPhotoUrl = useCallback(
    async (photoPath: string) => {
      setLoading((prev) => ({ ...prev, photo: true }));
      setError("");
      try {
        const file = await userService.getUserPhotoBlob(photoPath);
        const url = URL.createObjectURL(file);
        setPhotoUrl(url);
      } catch (error) {
        const errorMessage = handleUserProfileError(error, "photoFetch");
        setError(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, photo: false }));
      }
    },
    [userService, handleUserProfileError],
  );

  const {
    basic_info,
    educacion,
    experiencia_laboral,
    habilidades,
    portafolio,
  } = useMemo(() => user!, [user]);

  return {
    updateUserInfo,
    error,
    loading,
    basic_info,
    educacion,
    experiencia_laboral,
    habilidades,
    portafolio,
    getUserInfo,
    updateUserPhoto,
    getUserPhotoUrl,
    photoUrl,
  };
};
