import Mock from 'better-mock';


export default {
  login: () => Mock.mock(/\/api\/login\/account/, 'POST', (url) => ({
    status: 200,
    data: {
      role: 'user',
      userId: '323',
      token: 'fafaf',
      ssKey: '24234',
      userName: 'fafa',
      isLogin: true
    }
  })),
  captcha: () => Mock.mock(/\/api\/login\/captcha/, (url) => ({
    status: 200,
    data: {
      code: Mock.Random.string(4)
    }
  })),
  // 近期支持这个写法
  // 'POST /api/login/account': {
  //   status: 200,
  //   data: {
  //     role: 'user',
  //     userId: '323',
  //     token: 'fafaf',
  //     ssKey: '24234',
  //     userName: 'fafa',
  //   }
  // }
}
