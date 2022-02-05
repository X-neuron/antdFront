import Mock from "mockjs";

export default {
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
