// 页面头，可以使用discribe + 面包屑
import React from 'react';

import { Breadcrumb } from 'antd';

import useLocaleModel from '@/models/useLocale';
import useTabRouteModel from '@/models/useTabRoute'

const PageHeader = ({ code }) => {
  const { intl } = useLocaleModel();
  const { tabRouteConfig, openRoute } = useTabRouteModel();
  return (
    <>
      <Result
        status={code}
        title={code}
        subTitle={intl.get(`access${code}`)}
        extra={<Button type="primary" onClick={() => openRoute('/')}>{intl.get('backhome')}</Button>}
      />
    </>
  )
}


export default PageHeader;
