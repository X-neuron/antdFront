import { parse } from "querystring";
import _ from "lodash";
// import { pathRegexp } from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);

// export const isAntDesignPro = () => {
//   if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
//     return true;
//   }

//   return window.location.hostname === 'preview.pro.ant.design';
// }; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

// export const isAntDesignProOrDev = () => {
//   const { NODE_ENV } = process.env;

//   if (NODE_ENV === 'development') {
//     return true;
//   }

//   return isAntDesignPro();
// };

export const getPageQuery = () => parse(window.location.href.split("?")[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {Promise}
 */
export function getBlob(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };

    xhr.send();
  });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement("a");
    const body = document.querySelector("body");

    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = "none";
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
export function downloadFile(url, filename) {
  getBlob(url).then((blob) => {
    saveAs(blob, filename);
  });
}

export function saveFilefromBlob(filename, blob) {
  // alert(
  //   "Downloading files is no longer supported by CodeSandbox runtime.\n"
  // );

  // get downloadable url from the blob
  const blobUrl = URL.createObjectURL(blob);

  // create temp link element
  let link = document.createElement("a");
  link.download = filename;
  link.href = blobUrl;

  // use the link to invoke a download
  document.body.appendChild(link);
  link.click();

  // remove the link
  setTimeout(() => {
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
    link = null;
  }, 0);
}

// 以下两个用来操作tree checked key的 array数据转化成tree需要的数据类型..
export const transToAntdTreeData = (tree) => {
  const toAntdTrees = (array) =>
    array?.map((item) => {
      const returnValue = {
        ...item,
        id: item.id,
        key: item.id,
        value: item.id,
        title: item.name,
        isLeaf: item.children.length === 0,
        // disableCheckbox:item.children.length === 0 ? true:false,
        // selectable: item.children.length !== 0? true:false //叶子节点不可选，子步骤不会修改
      };
      if (item.children.length !== 0) {
        returnValue.children = toAntdTrees(item.children);
      }
      return returnValue;
    });
  const ret = toAntdTrees(tree);
  return ret;
};

export const filterTreesFromSelectedKey = (tree, keys) => {
  const cloneTree = _.cloneDeep(tree);
  const filterTree = (data) => {
    if (!data) return;
    const newData = data?.filter((item) => {
      if (item?.children?.length !== 0) {
        item.children = filterTree(item.children);
      }
      return keys.find((key) => key === item.id);
    });
    return newData;
  };
  return filterTree(cloneTree);
};


// export const transToAntdTreeNodeData = (array) => array?.map((item) => ({
//   ...item,
//   id: item.id,
//   key: item.id,
//   value: item.id,
//   title: item.name,
//   isLeaf: false,
//   // disableCheckbox:item.children.length === 0 ? true:false,
//   selectable: false // 叶子节点不可选，子步骤不会修改
// }));


export const transToAntdTreeLeafData = (tree,pid) => {
  if(tree.length === 0){ return []}
  // if(tree){
  const toAntdTrees = (array) =>
    array?.map((item) => {
      const returnValue = {
        // ...item,
        id: item.id,
        key: item.id,
        value: item.id,
        pid,
        title: item.name ?? item.nickName,
        name: item.name ?? item.nickName,
        isLeaf: true,
        selectable:true,

        // disableCheckbox:item.children.length === 0 ? true:false,
        // selectable: item.children.length !== 0? true:false //叶子节点不可选，子步骤不会修改
      };
      if (item.children?.length !== 0) {
        returnValue.children = toAntdTrees(item.children,item.id);
      }
      return returnValue;
    });
  const ret = toAntdTrees(tree);
  return ret;
};


export const transToAntdTreeNodeData = (tree,pid) => {
  // console.log('transToAntdTreeNodeData start');
  if(tree.length === 0){ return []}
  const toAntdTrees = (array) =>
    array?.map((item) => {
      const returnValue = {
        // ...item,
        id: item.id,
        key: item.id,
        pid,
        name:item.name,
        value: item.id,
        title: item.name,
        isLeaf: false,
        selectable: false // 叶子节点不可选，子步骤不会修改
      };
      if (item.children?.length !== 0) {
        returnValue.children = toAntdTrees(item.children,item.id);
      }
      return returnValue;
    });
  const ret = toAntdTrees(tree);
  return ret;
}


export const transPermissionToRoute = (route) => {
  // console.log("data",data);

  const newRoute = [];
  const transObjectName = (curRoute) => {
    const newCurRoute = {
      path:curRoute.route,
      icon:curRoute.icon,
      name:curRoute.name
    };
    if(curRoute.component){
      newCurRoute.component = curRoute.component;
    }
    if(curRoute.route === "/" && curRoute.component){
      newCurRoute.index = true;
    }
    if (curRoute.children?.length !== 0) {
      const newChildren = [];
      curRoute.children.forEach((item) => {
        newChildren.push(transObjectName(item));
      });
      newCurRoute.children = newChildren;
    }
    console.log(newCurRoute);
    return newCurRoute;
  };
  route.forEach((item) => {
    newRoute.push(transObjectName(item));
  });
  return newRoute;
}