
import React from 'react';


import { hot } from 'react-hot-loader/root'
// import Locale from '@/component/Locale';

// import BasicLayout from './layout/BasicLayout';

// setConfig({
//   reloadHooks: false
// });

import { Router } from '@reach/router';
import useAppRoute from '@/hooks/useAppRoute';
import { getRoutePage } from '@/config/pages';


function App() {
  const rmtConfig = useAppRoute();

  return (
    // <Locale>
    <Router>
      {getRoutePage(rmtConfig.routes)}
    </Router>
    // </Locale>
  )
}


export default hot(App);
