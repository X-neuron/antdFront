import { atom } from "recoil";
// import defaultAccess from '@/config/access'
// console.log("defaultAccess is",defaultAccess)

export const accessAtom = atom({
  key:"accessAtom",
  default:{
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
  }

});
