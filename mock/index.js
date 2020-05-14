import Mock from 'better-mock';
import login from './login';

Mock.setup({
  timeout: '200-600'
});
const mockList = {
  login
}

const runMock = () => {
  Object.values(mockList).forEach(function (val) {
    Object.getOwnPropertyNames(val).forEach(function (api) {
      val[api]();
    })
  });
}

export default runMock;
