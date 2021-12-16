import { atom, selector } from "recoil";
import { i18n } from "@lingui/core";

export const locales = {
  "zh-CN": {
    name: "简体中文",
    icon: "🇨🇳",
    // UILocale:zhCN
    // antd:zhCN
    antd: {
      ...require("antd/es/locale/zh_CN").default,
    },
  },
  "en-US": {
    name: "英文",
    icon: "🇺🇸",
    // UILocale:enUS
    // antd:enUS
    antd: {
      ...require("antd/es/locale/en_US").default,
    },
  },
};

export const curLangAtom = atom({
  key: "curLangAtom",
  default: "zh-CN",
  // effects_UNSTABLE:[
  //   ({onSet}) => {
  //     // 用户国际化内容,同时菜单也国际化
  //     onSet((newLang,oldValue) => {
  //       if(newLang !== oldValue) {
  //         dynamicActivateCustomLocale(newLang)

  //       }
  //     })
  //   },
  //   localStorageLangEffect('lang')
  // ]
});

export const curLocaleLoadAtom = selector({
  key: "curLocaleLoadAtom",
  default: "none",
  get: async ({ get }) => {
    const lang = get(curLangAtom);
    const { messages } = await import(
      /* webpackChunkName: 'i18n' */ `@/locales/${lang}.js`
    );
    i18n.load(lang, messages);
    i18n.activate(lang);
    return lang;
  },
});

// UI 国际化内容
// UI 内容随curLangAtom 而改变，故为selector

export const antdLocaleAtom = selector({
  key: "antdLocaleAtom",
  get: ({ get }) => locales[get(curLangAtom)].antd,
});
