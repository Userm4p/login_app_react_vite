import { useTranslation } from "react-i18next";
import { useLogin } from "./useLogin";
import { ErrorsModal } from "../../common/components/ErrorsModal";

const Login = () => {
  const { t } = useTranslation("loginPage");

  const { error, handleSubmit, handleInputChange, loading } = useLogin();

  return (
    <>
      <ErrorsModal error={error} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {t("title")}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                {t("usernameLabel")}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={t("usernamePlaceholder")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("passwordLabel")}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={t("passwordPlaceholder")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition-colors cursor-pointer flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                t("loginButton")
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
