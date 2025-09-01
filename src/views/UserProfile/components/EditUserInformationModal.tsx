import { useMemo, useState } from "react";
import type {
  BasicInfo,
  UpdateUserFormRequest,
} from "../../../common/types/UserResponse";
import { useTranslation } from "react-i18next";
import { Loader } from "../../../common/components/Loader";

type Props = {
  user: BasicInfo;
  onSave: (updatedUser: UpdateUserFormRequest) => Promise<void>;
  loading: boolean;
};

const EditUserModal = ({ user, onSave, loading }: Props) => {
  const initialFormInfo = useMemo((): UpdateUserFormRequest => {
    return {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
      },
      telefono: user.telefono,
      biografia: user.biografia,
      documento: user.documento,
      linkedin: user.redes_sociales.linkedin,
      twitter: user.redes_sociales.twitter,
      github: user.redes_sociales.github,
      sitio_web: user.redes_sociales.sitio_web,
    };
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] =
    useState<UpdateUserFormRequest>(initialFormInfo);
  const { t } = useTranslation("userProfileEditModal");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await onSave(formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        {t("editProfile")}
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <h2 className="text-xl font-semibold mb-4">{t("editProfile")}</h2>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2  py-2">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium">{t("name")}</label>
                  <input
                    className="w-full border rounded p-2"
                    name="user.first_name"
                    value={formData.user.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">{t("lastName")}</label>
                  <input
                    className="w-full border rounded p-2"
                    name="user.last_name"
                    value={formData.user.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t("biography")}</label>
                <textarea
                  className="w-full border rounded p-2"
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t("document")}</label>
                <input
                  className="w-full border rounded p-2"
                  name="documento"
                  value={formData.documento}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium">{t("phone")}</label>
                <input
                  className="w-full border rounded p-2"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-700 transition">Github</label>
                <input
                  className="w-full border rounded p-2"
                  name="github"
                  placeholder={t("github")}
                  value={formData.github}
                  onChange={handleChange}
                />
                <label className="text-blue-700 transition">Linkedin</label>
                <input
                  className="w-full border rounded p-2"
                  name="linkedin"
                  placeholder={t("linkedin")}
                  value={formData.linkedin}
                  onChange={handleChange}
                />
                <label className="text-gray-700 transition">
                  {t("website")}
                </label>
                <input
                  className="w-full border rounded p-2"
                  name="sitio_web"
                  placeholder={t("website")}
                  value={formData.sitio_web}
                  onChange={handleChange}
                />
                <label className="text-blue-400 transition">Twitter</label>
                <input
                  className="w-full border rounded p-2"
                  name="twitter"
                  placeholder={t("twitter")}
                  value={formData.twitter}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                {loading ? <Loader /> : <>{t("save")}</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal;
