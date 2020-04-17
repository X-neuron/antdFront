
import React from 'react';

import { Spin } from 'antd';


function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        textAlign: 'center'
      }}
    >
      <Spin tip="语言加载中..." size="large" />
    </div>
  )
}

export default Loading;
