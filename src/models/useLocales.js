import { useState, useRef } from 'react';
import loc from 'react-intl-universal';
import request from 'umi-request';
import { usePersistFn, useMount } from '@umijs/hooks';

// import _ from 'lodash';

// import scope from 'babel-plugin-console/scope.macro';

import { createModel } from 'hox';

const Locales = [
  {
    name: '简体中文',
    value: 'zh-CN',
    icons: '🇨🇳'
  },
  {
    name: 'English',
    value: 'en-US',
    icons: '🇺🇸'
  }
];

const intl = {
  init: (option) => loc.init(option),
  determineLocale: () => loc.determineLocale(options),
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

function useLocales() {
  // 缓存json 防止重复请求
  console.log('useLocales running');
  const localeList = useRef(new Map());

  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [curLocale, setCurLocale] = useState(() => {
    const currentLocale = loc.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
      localStorageLocaleKey: 'lang'
    });
    const returnLocale = currentLocale ? Locales[0].value : currentLocale;
    return returnLocale;
  });

  const loadLocale = (currentLocale) => {
    // const currentLocale = alocale.current.lang;
    if (localeList.current.has(currentLocale)) {
      loc.init({
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
      request.get(`public/locales/${currentLocale}.json`, {
        responseType: 'json'
      })
        .then(res => {
          loc.init({
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
    loadLocale(curLocale);
  });

  const changeCurLocale = usePersistFn((key) => {
    if (curLocale === key) {
      return;
    }
    loadLocale(key);
  });

  return { Locales, curLocale, localeLoaded, changeCurLocale, intl }
}

export default createModel(useLocales);
