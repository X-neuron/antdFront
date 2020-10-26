import _ from "lodash";
import { Redirect } from "@reach/router";
import useAccessModel from "@/models/useAccess";

// const checkAccess = (access, accessible) => access[accessible]
// return access[accessible] ?? (access[page] ? access[page][accessible] : false)


const Access = (props) => {
  const { children, accessible, redirectPath, fallback = null } = props;
  const { access } = useAccessModel();
  const childrenRender = typeof children === "undefined" ? null : children;
  // access 和 accessible 不存在的情况
  if (!access || !accessible) {
    return <>{childrenRender}</>;
  }

  if (_.isFunction(children)) {
    return <>{children(access[accessible])}</>;
  }

  // console.log(access, accessible, access[accessible]);
  return <>{access[accessible] ? childrenRender : redirectPath ? (<Redirect from={window.location.href} to={redirectPath} />) : fallback}</>;
};

export default Access;
