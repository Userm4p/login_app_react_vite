import { useMemo, useCallback, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { UserService } from "../../common/api/services/user_service";
import LoginContext from "../../common/context/LoginContext/LoginContext";
import type { UpdateUserFormRequest } from "../../common/types/UserResponse";

export const useUserProfile = () => {
  const { t } = useTranslation("commons");

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
    } catch {
      setError(t("error"));
    } finally {
      setLoading((prev) => ({ ...prev, info: false }));
    }
  }, [t, userService, setUser]);

  const updateUserInfo = useCallback(
    async (data: UpdateUserFormRequest) => {
      setLoading((prev) => ({ ...prev, updateInfo: true }));
      setError("");
      try {
        await userService.updateUserInfo(data);
        await getUserInfo();
      } catch {
        setError(t("error"));
      } finally {
        setLoading((prev) => ({ ...prev, updateInfo: false }));
      }
    },
    [t, userService, getUserInfo],
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
      } catch {
        setError(t("error"));
      } finally {
        setLoading((prev) => ({ ...prev, updatePhoto: false }));
      }
    },
    [t, userService, getUserInfo],
  );

  const getUserPhotoUrl = useCallback(
    async (photoPath: string) => {
      setLoading((prev) => ({ ...prev, photo: true }));
      setError("");
      try {
        const file = await userService.getUserPhotoBlob(photoPath);
        const url = URL.createObjectURL(file);
        setPhotoUrl(url);
      } catch {
        setError(t("error"));
      } finally {
        setLoading((prev) => ({ ...prev, photo: false }));
      }
    },
    [userService, t],
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
