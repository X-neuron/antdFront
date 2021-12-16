import Mock from "mockjs";

export default {
  // login: () => Mock.mock(/\/api\/login\/account/, 'POST', (url) => ({
  //   status: 200,
  //   data: {
  //     role: 'user',
  //     userId: '323',
  //     token: 'fafaf',
  //     ssKey: '24234',
  //     userName: 'fafa',
  //     isLogin: true
  //   }
  // })),
  // captcha: () => Mock.mock(/\/api\/login\/captcha/, (url) => ({
  //   status: 200,
  //   data: {
  //     code: Mock.Random.string(4)
  //   },
  "POST /auth/login": {
    status: 200,
    data: {
      role: "user",
      userId: "323",
      token: "fafaf",
      ssKey: "24234",
      userName: "fafa",
      isLogin: true,
    },
  },
  "/auth/login/captcha": {
    status: 200,
    data: {
      code: Mock.Random.string(4),
    },
  },
};
