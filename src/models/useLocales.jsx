import { useState, useEffect } from 'react';
import intl from 'react-intl-universal';
import request from 'umi-request';
import _ from 'lodash';
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

// const initalLang = () => {
//   const currentLocale = intl.determineLocale({
//     urlLocaleKey: 'lang',
//     cookieLocaleKey: 'lang',
//     localStorageLocaleKey: 'lang'
//   });

//   console.log('current loacale is', currentLocale);

//   const returnLocale = _.find(Locales, { value: currentLocale })
//   // 如果没找到，则默认为汉语
//   return returnLocale || Locales[0]
// }



function getLocale(locale) {
  const currentLocale = locale.value;
  request.get(`public/locales/${currentLocale}.json`, {
    responseType: 'json'
  })
    .then(res => intl.init({
      currentLocale,
      locales: {
        [currentLocale]: res
      }
    }))
}
function useLocales() {
  // const [curLocale, setCurLocale] = useState({
  //   name: '简体中文',
  //   value: 'zh-CN',
  //   icons: '🇨🇳'
  // });

  const [curLocale, setCurLocale] = useState(() => {
    const currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
      localStorageLocaleKey: 'lang'
    });

    console.log('current loacale is', currentLocale);

    const returnLocale = _.find(Locales, { value: currentLocale });
    // 如果没找到，则默认为汉语
    return returnLocale || Locales[0];
  });

  useEffect(() => getLocale(curLocale), [curLocale]);

  const changeCurLocale = (key) => {
    const returnLocale = _.find(Locales, { value: key });
    console.log(returnLocale);
    getLocale(returnLocale);
    setCurLocale(returnLocale || Locales[0]);
  }

  return { Locales, curLocale, changeCurLocale, intl }
}

export default createModel(useLocales);
