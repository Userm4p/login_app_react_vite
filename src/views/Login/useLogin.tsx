import { useCallback, useContext, useMemo, useState } from "react";
import { UserService } from "../../common/api/services/user_service";
import LoginContext from "../../common/context/LoginContext/LoginContext";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const { t } = useTranslation("commons");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(LoginContext);

  const userService = useMemo(() => new UserService(), []);

  const postLogin = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const authInfo = await userService.loginUser(
        form.username,
        form.password,
      );
      const userInfo = await userService.getUserInfo(authInfo.access);
      login(userInfo, authInfo.access);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }, [userService, form, login, t]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
      setForm({
        ...form,
        [name]: value,
      });
    },
    [form],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(form);
      await postLogin();
    },
    [postLogin, form],
  );

  return {
    handleInputChange,
    handleSubmit,
    loading,
    error,
  };
};
