import { useI18n } from '@/contexts/I18nContext';

export const useTranslation = () => {
  const { t, changeLocale, locale } = useI18n();
  
  return {
    t,
    changeLanguage: changeLocale,
    currentLanguage: locale,
  };
};
