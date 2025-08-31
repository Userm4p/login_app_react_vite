import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "../../../common/components/Loader";

type Props = {
  currentPhoto?: string | null;
  onSave: (file: File) => Promise<void>;
  loading: boolean;
  loadingPhoto?: boolean;
};

const UploadPhotoModal = ({
  currentPhoto,
  onSave,
  loading,
  loadingPhoto,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation("userProfileEditModal");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      await onSave(selectedFile);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (currentPhoto) {
      setPreview(currentPhoto);
    }
  }, [currentPhoto]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        {t("changePhoto")}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-semibold mb-4">{t("changePhoto")}</h2>

            <div className="flex flex-col items-center gap-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border"
                />
              ) : loadingPhoto ? (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
                  <Loader />
                </div>
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
                  {t("noPhoto")}
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {t("selectFile")}
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={!selectedFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <Loader /> : t("save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPhotoModal;
