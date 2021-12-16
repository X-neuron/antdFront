import { atom } from "recoil";
import defaultAccess from "@/config/access";

export const accessAtom = atom({
  key: "accessAtom",
  default: defaultAccess,
});
