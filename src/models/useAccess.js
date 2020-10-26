// 前后端分离的项目，前端的权限 精确到功能 按钮级 就可以。暂不需要到数据级
// 具体的比如同样是 查看数据，但是经理查看100w以上。总裁查看10000w以上的。应该是后端权限的控制。
// 上面这种情况，逻辑上要同样的 page的component去展示。
// 既然 route 可以动态加载，还需要 page的页面级权限么？
// 因为存在动态路由的页面不在menu中显示。却能在其他组件中调用的情况。
// 所以这里的 Access 控制的是模块及 按钮级权限。

// 对比了 umi的 plugin-access 和 antd-plus 的 policy 策略。
// 结合两者的优点 改写了个access 权限组件。
// useAccess 似乎更适合放在 @/config里但是，但是它又是和其他相关的Hook
// 如果回到useSysInit的设计，似乎又回到了中心化管理的redux,这样就没必要使用hook来管理数据流状态了。

import { useState } from "react";
import { createModel } from "hox";
// import useLoginModel from '@/models/useLogin';
// import _ from 'lodash';

const useAccess = () => {
  // const { isLogin, role, user, userId } = useLoginModel();

  const [access, setAccess] = useState({
    // 放弃了这个设计，因为命名易冲突，导致优先获取access.key下的权限。
    // test1: {
    //   open: true,
    //   deleteUserList: false,
    //   adduserList: true
    // },
    // test2: {
    //   open: false, // 可后端返回
    // },
    test1Open: true,
    test2Open: false,
    microOpen: true,
    test3Open: true,
    adminSubmit: false,
    // 'example': role === 'admin',
    // 'example2': some => some.prop === 'test'
  });

  // 已存在则覆盖。
  const updateAccess = (newAccess) => {
    setAccess({ ...access, ...newAccess });
  }

  return { access, updateAccess }
};

export default createModel(useAccess);
