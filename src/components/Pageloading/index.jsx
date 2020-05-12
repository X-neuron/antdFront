
import React from 'react';

import { Spin } from 'antd';



function Loading({ tip }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        paddingTop: 100,
        textAlign: 'center'
      }}
    >
      <Spin size="large" />
    </div>
  )
}

export default Loading;
