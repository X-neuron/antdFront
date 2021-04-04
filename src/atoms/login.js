import { atom } from "recoil";

export const loginStateAtom = atom({
  key:"loginStateAtom",
  default:{
    role: null,
    userId: null,
    userName: null,
    // isLogin: true,
    isLogin: false,
    // token: null,
    ssKey: null
  }
});
