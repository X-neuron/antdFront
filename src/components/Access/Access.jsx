import React from 'react';
// import Policy from '@pansy/policy';
import _ from 'lodash';
// 可给checkAuthority 加memo。但是要useloginModel. policy 改变后，清理记忆即可。
// copy from “@alitajs/antd-plus”，
// and to be more acceptable as umi plugin-access does

/**
 * 权限检查方法
 * @param { 权限判定 | Permission judgment } authority
 * @param { 权限验证方法 | no pass components } policy
 */
const checkPolicy = (policy, authority) => {
  let result = true;

  // 数组处理
  if (_.isArray(authority)) {
    if (!policy.multipleVerify(authority)) {
      result = false;
    }
  }

  // string 处理
  if (_.isString(authority)) {
    if (!policy.combinationVerify(authority)) {
      result = false;
    }
  }

  return result;
};



const Access = (props) => {
  const { policy, children, accessible, noMatch = null } = props;
  const childrenRender = typeof children === 'undefined' ? null : children;

  // 防止policy不存在报错
  if (!policy) {
    return <>{childrenRender}</>;
  }

  const checkResult = checkPolicy(policy, accessible);
  console.log(checkResult, policy, accessible)

  if (_.isFunction(children)) {
    return <>{children(checkResult)}</>;
  }
  return <>{checkResult ? childrenRender : noMatch}</>;
};

export default Access;
