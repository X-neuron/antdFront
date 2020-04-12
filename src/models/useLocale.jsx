import { useState, useEffect, useCallback } from 'react';
import { createModel } from 'hox';
import intl from 'react-intl-universal';
import _ from 'lodash';
import request from '../utils/request';

const LANG_LOCALES = [
  {
    name: '简体中文',
    icon: '🇨🇳',
    value: 'zh-CN'
  },
  {
    name: 'English',
    icon: '🇺🇸',
    value: 'en-US'
  }
];



function useLocale() {
  const [lang, setLang] = useState(0);

  let currentLocale = useCallback(() => {
    intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang'
    })
  }, []);

  console.log(currentLocale);

  // 如果没找到，则默认为汉语
  if (!_.find(LANG_LOCALES, { value: currentLocale })) {
    currentLocale = 'zh-CN';
  }

  setLang(_.find(LANG_LOCALES, { value: currentLocale }));

  // 装载语言
  useEffect(() => {
    request.get(`locales/${currentLocale}.json`)
      .then(res => {
        console.log('App locale data', res.data);
        // init 方法将根据 currentLocale 来加载当前语言环境的数据
        return intl.init({
          currentLocale,
          locales: {
            [currentLocale]: res.data
          }
        });
      })
      .then(() => {
        // After loading CLDR locale data, start to render
        this.setState({ initDone: true });
      });
  });

  return {
    lang,
    changLang
  };
}

export default createModel(useLocale);
