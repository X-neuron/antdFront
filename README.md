# antdFront
using hox data manager and webpack to building antd design pro project without umi, cra，dva or rematch
<img src="https://i.loli.net/2020/04/26/GmucUWpFbEZ1LC6.gif" />

为什么建这么项目，直接用umi 或者 craco 不好么？

1、UMI有框架化的趋势，使用umi去建antd design pro，虽然上手很快，约定用起来很爽，但很多技术耦合太深，在接轨新技术上往往反应慢半拍，脱离了umi，写的业务代码都跑不起来，迁移到其他UI困难(Material UI)。对于全栈学习，或求知开发人员，不是最好选择。

2、craco虽然可以改写部分cra的配置，但是对于启用某些性能优化的配置，比如thread-loader 也比较困难。

3、数据流为什么不选dva,rematch,easy-peasy， dva or rematch 都是redux优化代码编写的产物，hook时代不太需要redux这么重的框架，但是需要它的思想，而easy-peasy 实践一段实践后，手工映射state 和 action 和 connect 的方式如出一辙。甚至connect的方式反而更使得UI和业务model之间的耦合更松散。于是找啊找，发现了hox 和 unstate-next。对比后，hox 简介在于 不需要那么多provider 和context。有点类似于 mobox的 订阅 和 hook的结合。使代码更简洁，于是决定使用这个，并且万一遇到问题，迁移到unstate-next 也很方便，于是放弃了easy-peasy。

4、于是有了全部上最近技术的想法，并决心付诸实践。


该项目有什么特点？

1、直接采用webpack,babel、antd 等较为原生的配置和组件搭建antd design 的开发环境，支持pwa。

2、二次编译速度大幅优化。

3、采用纯react hooks 编写，数据流采用hox方案。

4、json路由配置，支持纯字符串配置。方便后端配置权限。

5、支持热加载

6、tab标签支持，通知可以自行扩展 单页或多标签的方式，展示页面。

7、1个HOOK国际化。

8、支持微前端。

9、代码量小，逻辑清晰，非常适合react 入手学习。



## Installation

```
1: gitclone 到本机
2: cnpm i  or yarn
3: npm run build  or npm run dev

```
