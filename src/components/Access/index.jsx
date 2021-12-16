/* eslint-disable react/jsx-no-useless-fragment */
import _ from "lodash";
import { Navigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { accessAtom } from "@/atoms/access";

// const checkAccess = (access, accessible) => access[accessible]
// return access[accessible] ?? (access[page] ? access[page][accessible] : false)

const Access = function(props) {
  const { children, accessible, redirectPath, fallback = null } = props;
  const access = useRecoilValue(accessAtom);

  const childrenRender = typeof children === "undefined" ? null : children;
  // access 和 accessible 不存在的情况
  if (!access || !accessible) {
    return {childrenRender};
  }

  if (_.isFunction(children)) {
    return <>{children(access[accessible])}</>;
  }

  return (
    <>
      {access[accessible] ? (
        childrenRender
      ) : redirectPath ? (
        <Navigate from={window.location.href} to={redirectPath} />
      ) : (
        fallback
      )}
    </>
  );
}

export default Access;
