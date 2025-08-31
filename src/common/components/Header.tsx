import { useContext } from "react";
import { useTranslation } from "react-i18next";
import LoginContext from "../context/LoginContext/LoginContext";

const Header = () => {
  const { i18n, t } = useTranslation("commons");
  const { logout } = useContext(LoginContext);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="w-full bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center">
      Login React App
      <div className="flex items-center gap-3">
        <button
          onClick={() => changeLanguage("en")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            i18n.language === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } cursor-pointer`}
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage("es")}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
            i18n.language === "es"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } cursor-pointer`}
        >
          ES
        </button>

        <button
          onClick={logout}
          className="ml-4 px-4 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
        >
          {t("logout")}
        </button>
      </div>
    </header>
  );
};

export default Header;
