import { atom, selector } from "recoil";
import { i18n } from "@lingui/core";


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
  effects_UNSTABLE:[
    ({onSet}) => {
      // 用户国际化内容,同时菜单也国际化
      onSet((newLang,oldValue) => {
        if(newLang !== oldValue) {
          dynamicActivateCustomLocale(newLang)

        }
      })
    }
  ]
});


// UI 国际化内容
// UI 内容随curLangAtom 而改变，故为selector

export const antdLocaleAtom = selector({
  key:'antdLocaleAtom',
  get: ({get}) => {
    return locales[get(curLangAtom)].antd
  }
});


/**
* We do a dynamic import of just the catalog that we need
* @param locale any locale string
*/
 async function dynamicActivateCustomLocale(locale) {

  // request.get(`${window.location.origin}/public/locales/${locale}.json`,{
  // // request.get(`./public/locales/${locale}.json`,{
  //   responseType: "json",
  // }).then(
  //   res => {
  //     i18n.load(locale, res)
  //     i18n.activate(locale)
  //   }
  // )

  const { messages } = await import(/* webpackChunkName: 'i18n' */`@/locales/${locale}.js`);
  i18n.load(locale, messages)
  i18n.activate(locale)
}
