import { atom, selector } from "recoil";
import { i18n } from "@lingui/core";


const localStorageLangEffect = key => ({setSelf, onSet, trigger}) => {
  // If there's a persisted value - set it on load
  const loadPersisted = async () => {
    const savedValue = await localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  };

  // Asynchronously set the persisted data
  if (trigger === 'get') {
    loadPersisted();
  }

  // Subscribe to state changes and persist them to localStorage
  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(newValue));
  });
};


export const locales = {
  "zh-CN":{
    name:"简体中文",
    icon:'🇨🇳',
    // UILocale:zhCN
    // antd:zhCN
    antd: {
      ...require('antd/es/locale/zh_CN').default,
    },
  },
  "en-US":{
    name:"英文",
    icon:'🇺🇸',
    // UILocale:enUS
    // antd:enUS
    antd:{
      ...require('antd/es/locale/en_US').default,
    },
  },
}


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
  key:"curLocaleLoadAtom",
  default:'none',
  get:async ({get}) => {
    const lang = get(curLangAtom);
    const { messages } = await import(/* webpackChunkName: 'i18n' */`@/locales/${lang}.js`);
    i18n.load(lang, messages)
    i18n.activate(lang)
    return lang;
  }
})


// UI 国际化内容
// UI 内容随curLangAtom 而改变，故为selector

export const antdLocaleAtom = selector({
  key:'antdLocaleAtom',
  get: ({get}) => {
    return locales[get(curLangAtom)].antd
  }
});
