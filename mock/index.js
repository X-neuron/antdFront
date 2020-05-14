import Mock from 'mockjs';
import login from './login';

Mock.setup({
  timeout: '200-600'
});
console.log(login)
const mockList = {
  login
}

const runMock = () => {
  Object.values(mockList).forEach(function (val) {
    Object.getOwnPropertyNames(val).forEach(function (api) {
      console.log(val, api);
      val[api]();
    })
  });
}

export default runMock;
