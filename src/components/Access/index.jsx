import React from 'react';
import _ from 'lodash';
import useAccessModel from '@/models/useAccess';

const checkAccess = (access, accessible, page) => {
  return access[accessible] ?? (access[page] ? access[page][accessible] : false)
}

const Access = (props) => {
  const { page, children, accessible, fallback = null } = props;
  const { access } = useAccessModel();
  const childrenRender = typeof children === 'undefined' ? null : children;

  if (!access) {
    return <>{childrenRender}</>;
  }

  const checkResult = checkAccess(access, accessible, page);

  if (_.isFunction(children)) {
    return <>{children(checkResult)}</>;
  }
  return <>{checkResult ? childrenRender : fallback}</>;
};

export default Access;
