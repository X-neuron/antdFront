import { useState, useRef, useEffect } from 'react';
import intl from 'react-intl-universal';
import request from 'umi-request';
import { usePersistFn } from '@umijs/hooks';
// import _ from 'lodash';

// import scope from 'babel-plugin-console/scope.macro';
// import { useRequest } from '@umijs/hooks;'

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

function useLocales() {
  // 缓存json 防止重复请求
  console.log('useLocales running');
  const localeList = useRef(new Map());

  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [curLocale, setCurLocale] = useState(() => {
    const currentLocale = intl.determineLocale({
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
      request.get(`public/locales/${currentLocale}.json`, {
        responseType: 'json'
      })
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

  useEffect(() => {
    loadLocale(curLocale);
  }, []);

  const changeCurLocale = usePersistFn((key) => {
    if (curLocale === key) {
      return;
    }
    loadLocale(key);
  });

  return { Locales, curLocale, localeLoaded, changeCurLocale, intl }
}

export default createModel(useLocales);
