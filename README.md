# antdFront
using hox data manager and webpack to building antd design pro project without umi, cra，dva or rematch

为什么建这么项目，直接用umi 或者 craco 不好么？

1、UMI有框架化的趋势，使用umi去建antd design pro，虽然上手很快，约定用起来很爽，但很多技术耦合太深，在接轨新技术上往往反应慢半拍，脱离了umi，写的业务代码都跑不起来，迁移到其他UI困难(Material UI)。对于全栈学习，或求知开发人员，不是最好选择。

2、craco虽然可以改写部分cra的配置，但是对于启用某些性能优化的配置，比如thread-loader 也比较困难。

3、数据流为什么不选dva,rematch,easy-peasy， dva or rematch 都是redux优化代码编写的产物，hook时代不太需要redux这么重的框架，但是需要它的思想，而easy-peasy 实践一段实践后，手工映射state 和 action 和 connect 的方式如出一辙。甚至connect的方式反而更使得UI和业务model之间的耦合更松散。于是找啊找，发现了hox 和 unstate-next。对比后，觉得hox 毕竟有 umi 阿里的背书，源码上看 可能兼顾的微前端的数据共享的考虑，于是决定使用这个，而放弃了easy-peasy。

4、于是有了全部上最近技术的想法，并决心付诸实践。

该项目有什么特点？

1、直接采用webpack,babel等较为原生的配置搭建antd design 的开发环境，支持pwa。

2、二次编译速度大幅优化，实际测试效果为 umi和 craco 的1-4倍不等的提速。 3、采用纯react hooks 编写，数据流采用hox方案。我一直认为有react 用来class来写 就是个美丽的设计错误。


## Installation

```
cnpm i  or yarn
npm run build  or npm run dev

```




