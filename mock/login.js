import Mock from 'mockjs';

const login = {
  login: Mock.mock(/\/api\/login\/account/, {
    status: 200,
    data: {
      role: 'user',
      userId: '323',
      token: 'fafaf',
      ssKey: '24234',
      userName: 'fafa',
    }
  })
}

export default login;
