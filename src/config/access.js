// 前后端分离的项目，前端的权限 精确到功能 按钮级 就可以。
// 具体的比如同样是 查看数据，但是经理查看100w以上。总裁查看10000w以上的。应该是后端权限的控制。
// 上面这种情况都是 要同样的 page的component去展示。
// 既然 route 可以动态加载，还需要 page的页面级权限么？
// 即使存在动态路由的页面不在menu中显示。却能在其他组件中调用，也能在后端配好。
// 所以这里的 Access 控制的是模块及 按钮级权限。

// 对比了 umi的 plugin-access 和 antd-plus 的 policy 策略。两者相似,脑袋模拟了下 觉得 policy 更符合真实的应用场景，
// 但access 更简单，易于和role等其他参数结合。但是后端给你role了干嘛不给policy了？还要在前端再写一遍后端可能自定义的东西？
// 前端策略 不需要包含条件，因为很难对每一个按钮指定一个策略。因为前端的代码都不知道后端的策略名是啥。条件因该后端是API要处理识别的事..
// 结合两者的优点 改写了个access 权限组件。参考：@alitajs/antd-plus 的Authorityplus组件。
import { Policy } from '@/components/Access';
// import useLoginModel from '@/models/useLogin';
// 闭包下更安全。
function access() {
  // 建议后端请求，也可前端配置。

  // 前端静态配置就可以再加上role userid 等条件判断。
  // const {userId,role} = fromsomewhere();

  // const userActions = [

  // ];

  const actions = [
    { module: 'test1', action: ['open', 'deleteUserList', 'adduserList'] },
    { module: 'test2', action: ['open'] },
    { module: 'test3', action: ['open'] },
    { module: 'dashboard', action: ['open'] },
    { module: 'microMaterial', action: ['open'] },
    { module: 'microVue2', action: ['open'] },
  ]

  const policy = new Policy(actions);
  console.log('inital policy:', policy)
  return policy
}

export default access;
