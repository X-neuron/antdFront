import { atom } from "recoil";

export const loginStateAtom = atom({
  key: "loginStateAtom",
  default: {
    role: null,
    id: null,
    account: "test",
    isLogin: false,
    // isLogin: true,
    token: null,
    ssKey: null,
  },
});
