export const useTranslation = () => ({
  t: (key: string) => key,
  i18n: {
    changeLanguage: () => new Promise(() => {}),
    language: "en",
  },
});

export const Trans = ({ children }: { children: React.ReactNode }) => children;
export default { useTranslation };
