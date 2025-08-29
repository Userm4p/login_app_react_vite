import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  error: string;
}

export const ErrorsModal = ({ error }: Props) => {
  const [showError, setShowError] = useState(true);

  const { t } = useTranslation("commons");

  useEffect(() => {
    if (error.length > 0) {
      setShowError(true);
    }
  }, [error]);

  return (
    <>
      {error && showError && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
          <div className="bg-white rounded-2xl shadow-lg w-80 sm:w-96 p-6 text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-2">
              {t("errorTitle")}
            </h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => setShowError(false)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              {t("closeButton")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
