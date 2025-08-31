import { useTranslation } from "react-i18next";
import EditUserModal from "./components/EditUserInformationModal";
import { useUserProfile } from "./useUserProfile";
import { ErrorsModal } from "../../common/components/ErrorsModal";
import { useEffect } from "react";
import UploadPhotoModal from "./components/UploadPhotoModal";
import { Loader } from "../../common/components/Loader";

const UserProfile = () => {
  const { t } = useTranslation("userProfile");
  const {
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
  } = useUserProfile();

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (basic_info?.foto) {
      getUserPhotoUrl(basic_info?.foto);
    }
    // eslint-disable-next-line
  }, [basic_info?.foto]);

  return (
    <>
      <ErrorsModal error={error} />
      <div className="max-w-4xl mx-auto p-6 bg-blue-50 rounded-2xl shadow-lg space-y-8 mt-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          {loading.photo ? (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center shadow-md">
              <Loader />
            </div>
          ) : photoUrl ? (
            <img
              src={photoUrl}
              alt={basic_info.username}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
              {t("noPhoto")}
            </div>
          )}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {basic_info.first_name} {basic_info.last_name}
            </h2>
            <p className="text-gray-600">{basic_info.email}</p>
            <p className="text-sm text-gray-500 mb-6">{basic_info.telefono}</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start">
              <EditUserModal
                user={basic_info}
                onSave={updateUserInfo}
                loading={loading.updateInfo}
              />
              <UploadPhotoModal
                onSave={updateUserPhoto}
                loading={loading.updatePhoto}
                currentPhoto={photoUrl}
                loadingPhoto={loading.photo}
              />
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("biography")}
          </h3>
          <p className="text-gray-700">{basic_info.biografia}</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("education")}
          </h3>
          <ul className="space-y-2">
            {educacion.map((edu) => (
              <li key={edu.id} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">{edu.titulo}</p>
                <p className="text-sm text-gray-600">{edu.institucion}</p>
                <p className="text-xs text-gray-500">
                  {new Date(edu.fecha_inicio).toLocaleDateString()} –{" "}
                  {edu.completado
                    ? new Date(edu.fecha_fin).toLocaleDateString()
                    : t("inProgress")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("workExperience")}
          </h3>
          <ul className="space-y-2">
            {experiencia_laboral.map((exp) => (
              <li key={exp.id} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                <p className="font-medium text-gray-800">{exp.posicion}</p>
                <p className="text-sm text-gray-600">{exp.empresa}</p>
                <p className="text-xs text-gray-500">
                  {new Date(exp.fecha_inicio).toLocaleDateString()} –{" "}
                  {exp.actualmente
                    ? t("current")
                    : exp.fecha_fin
                      ? new Date(exp.fecha_fin).toLocaleDateString()
                      : ""}
                </p>
                <p className="mt-1 text-gray-700 text-sm">{t("functions")}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.habilidades.map((h) => (
                    <span
                      key={h.id}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
                    >
                      {h.nombre}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("skills")}
          </h3>
          <div className="flex flex-wrap gap-2">
            {habilidades.map((h) => (
              <span
                key={h.id}
                className={`px-3 py-1 text-sm rounded-lg shadow-sm ${
                  h.esta_verificado
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {h.habilidad__nombre}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("portfolio")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {portafolio.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-md transition"
              >
                {p.imagen && (
                  <img
                    src={p.imagen}
                    alt={p.titulo}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-3">
                  <h4 className="font-medium text-gray-800">{p.titulo}</h4>
                  <p className="text-sm text-gray-600">{p.descripcion}</p>
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      {t("viewMore")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("socialNetworks")}
          </h3>
          <div className="flex gap-4">
            {basic_info.redes_sociales.twitter && (
              <a
                href={basic_info.redes_sociales.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600 transition"
              >
                Twitter
              </a>
            )}
            {basic_info.redes_sociales.linkedin && (
              <a
                href={basic_info.redes_sociales.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 transition"
              >
                LinkedIn
              </a>
            )}
            {basic_info.redes_sociales.github && (
              <a
                href={basic_info.redes_sociales.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                GitHub
              </a>
            )}
            {basic_info.redes_sociales.sitio_web && (
              <a
                href={basic_info.redes_sociales.sitio_web}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                {t("website")}
              </a>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
