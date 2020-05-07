import React from 'react';
import _ from 'lodash';
import { Redirect } from '@reach/router';
import useAccessModel from '@/models/useAccess';

// const checkAccess = (access, accessible) => access[accessible]
// return access[accessible] ?? (access[page] ? access[page][accessible] : false)


const Access = (props) => {
  const { children, accessible, redirectPath, fallback = null } = props;
  const { access } = useAccessModel();
  const childrenRender = typeof children === 'undefined' ? null : children;
  // access不存在的情况
  if (!access) {
    return <>{childrenRender}</>;
  }

  const checkResult = access[accessible];

  if (_.isFunction(children)) {
    return <>{children(checkResult)}</>;
  }

  return <>{checkResult ? childrenRender : redirectPath ? (<Redirect from={window.location.href} to={redirectPath} />) : fallback}</>;
};

export default Access;
