
import React from 'react';
import useLocalesModel from '@/models/useLocales';
import { useSize } from '@umijs/hooks';
import { Spin } from 'antd';


function Locale({ children }) {
  console.log('main Refreshing')
  const [body] = useSize(document.querySelector('body'));
  // const { curLocale, loadLocale } = useLocalesModel();
  const { localeLoaded } = useLocalesModel();


  return (
    localeLoaded ? children
      : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: body.width,
            height: body.height,
            // width: '100%',
            // height: '100%',
            margin: 'auto',
            // paddingTop: 50,
            textAlign: 'center'
          }}
        >
          <Spin tip="语言加载中..." size="large" />
        </div>
      )
  )
}

export default Locale;
