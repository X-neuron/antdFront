import React from 'react';
import _ from 'lodash';
import useAccessModel from '@/models/useAccess';

// const checkAccess = (access, accessible) => access[accessible]
// return access[accessible] ?? (access[page] ? access[page][accessible] : false)


const Access = (props) => {
  const { children, accessible, fallback = null } = props;
  const { access } = useAccessModel();
  const childrenRender = typeof children === 'undefined' ? null : children;

  if (!access) {
    return <>{childrenRender}</>;
  }

  const checkResult = access[accessible];

  if (_.isFunction(children)) {
    return <>{children(checkResult)}</>;
  }
  return <>{checkResult ? childrenRender : fallback}</>;
};

export default Access;
