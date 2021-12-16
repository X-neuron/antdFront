import Mock from "mockjs";
import _ from "lodash";
// import { pathToRegexp } from "path-to-regexp";
import login from "./login";

Mock.setup({
  timeout: "200-600",
});
const mockList = {
  login,
};

const runMock = () => {
  Object.values(mockList).forEach(function (val) {
    Object.getOwnPropertyNames(val).forEach(function (api) {
      const paramList = _.split(api, " ");
      // 动态 参数 还需要再调整下？需要 path to regex
      // 此处要求api字符串路径里目前暂不带参数
      // const pathReg = pathToRegexp(paramList[(paramList.length - 1)]);
      const pathReg = paramList[paramList.length - 1];
      switch (paramList.length) {
        case 1:
          // 没有type则默认get
          Mock.mock(pathReg, "get", val[api]);
          break;

        case 2:
          Mock.mock(pathReg, paramList[0], val[api]);
          break;
        default:
      }
    });
  });
};

export default runMock;
