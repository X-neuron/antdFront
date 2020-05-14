// 放在这，mock向umi写法靠齐

export default {
  // 支持值为 Object 和 Array
  'POST /api/login/account': {
    status: 200,
    data: {
      role: 'user',
      userId: '323',
      token: 'fafaf',
      ssKey: '24234',
      userName: 'fafa',
    }
  },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
}
