import { useState, useRef } from "react";
import loc from "react-intl-universal";
import request from "umi-request";
import { usePersistFn, useMount } from "@umijs/hooks";

// import _ from 'lodash';

// import scope from 'babel-plugin-console/scope.macro';

import { createModel } from "hox";

const Locales = [
  {
    name: "简体中文",
    value: "zh-CN",
    icons: "🇨🇳"
  },
  {
    name: "English",
    value: "en-US",
    icons: "🇺🇸"
  }
];

const intl = {
  init: (option) => loc.init(option),
  determineLocale: (options) => loc.determineLocale(options),
  getInitOptions: () => loc.getInitOptions(),
  load: (locales) => loc.load(locales),
  get: (key, variables) => {
    const trans = loc.get(key, variables);
    return trans || key;
  },
  getHTML: (key, options) => {
    const trans = loc.getHTML(key, options);
    return trans || key;
  }
};
// console.log(intl);

function useLocale() {
  // 缓存json 防止重复请求
  const localeList = useRef(new Map());

  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [defLocale] = useState(() => {
    const currentLocale = loc.determineLocale({
      urlLocaleKey: "lang",
      cookieLocaleKey: "lang",
      localStorageLocaleKey: "lang"
    });
    const returnLocale = currentLocale ? Locales[0].value : currentLocale;
    return returnLocale;
  });
  const [curLocale, setCurLocale] = useState("");

  const loadLocale = (currentLocale) => {
    // const currentLocale = alocale.current.lang;
    if (localeList.current.has(currentLocale)) {
      intl.init({
        currentLocale,
        locales: {
          [currentLocale]: localeList.current.get(currentLocale)
        }
      }).then(() => {
        setCurLocale(currentLocale);
        // locale.current.lang = currentLocale;
        setLocaleLoaded(true);
      });
    } else {
      request.get(`${window.location.origin}/public/locales/${currentLocale}.json`, {
        responseType: "json"
      })
        // const lang = require(`public/locales/${currentLocale}.js`);
        // babel 还是webpack 目前暂不支持es2020的import。
        // import(`../public/locales/${currentLocale}`)
        .then(res => {
          intl.init({
            currentLocale,
            locales: {
              [currentLocale]: res
            }
          });
          localeList.current.set(currentLocale, res);
        })
        .then(() => {
          setCurLocale(currentLocale);
          // locale.current.lang = currentLocale;
          setLocaleLoaded(true);
        })
    }
  };

  useMount(() => {
    loadLocale(defLocale);
  });

  const changeCurLocale = usePersistFn((key) => {
    if (curLocale === key) {
      return;
    }
    loadLocale(key);
  });

  return { Locales, curLocale, localeLoaded, changeCurLocale, intl }
}

export default createModel(useLocale);
