import { useState, useRef } from 'react';
import intl from 'react-intl-universal';
import request from 'umi-request';
import { usePersistFn } from '@umijs/hooks';
import _ from 'lodash';

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
  // 用ref 主要为了避免不必要的刷新。
  const curLang = useRef({ lang: null });

  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [curLocale, setCurLocale] = useState(() => {
    const currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
      localStorageLocaleKey: 'lang'
    });
    const returnLocale = _.find(Locales, { value: currentLocale }) || Locales[0];
    return returnLocale;
  });


  const loadLocale = (locale) => {
    const currentLocale = locale.value;
    if (localeList.current.has(currentLocale)) {
      intl.init({
        currentLocale,
        locales: {
          [currentLocale]: localeList.current.get(currentLocale)
        }
      }).then(() => {
        curLang.current.lang = currentLocale;
        setCurLocale(locale);
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
          curLang.current.lang = currentLocale;
        })
        .then(() => {
          setCurLocale(locale);
          setLocaleLoaded(true);
        })
    }
  };

  // useEffect(() => {
  //   console.log('effect:', curLocale);
  //   loadLocale(curLocale);
  // })

  const changeCurLocale = usePersistFn((key) => {
    console.log(curLang.current.lang, key);
    if (curLang.current.lang === key) return;
    const returnLocale = _.find(Locales, { value: key }) || Locales[0];
    loadLocale(returnLocale);
  });

  return { Locales, curLocale, localeLoaded, changeCurLocale, intl }
}

export default createModel(useLocales);
