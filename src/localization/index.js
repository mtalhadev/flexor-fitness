import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import en from './translations/en.json'
import is from './translations/is.json'
import * as RNLocalize from "react-native-localize";

// 💖 we will use translate in our components
export const _translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

export const currentLocale = () => i18n.locale;

// 💖 this is function responsinble for changing locale
export const setI18nConfig = async languageTag => {
    let locale = languageTag;
    if(!locale) {
      const fallback = { languageTag: "en", isRTL: false };
      const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(['en','is']) || fallback;
      locale = languageTag;
    }
    _translate.cache.clear();
    i18n.initializeOptions();
    i18n.translations = {
        en,
        is
    };
    i18n.locale = locale;
};