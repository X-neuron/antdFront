
import React from 'react';


import { hot } from 'react-hot-loader/root'
// import Locale from '@/component/Locale';

import BasicLayout from './layout/BasicLayout';

// setConfig({
//   reloadHooks: false
// });

function App() {
  // console.log('app refresh')
  return (
    // <Locale>
    <BasicLayout />
    // </Locale>
  )
}


export default hot(App);
