# antdFront
为什么建这么项目，直接用umi 或者 craco 不好么？
1、UMI有框架化的趋势，使用umi去建antd design pro，虽然很快，但很多技术耦合太深，在接轨新技术上往往反应慢半拍，脱离了umi，写的业务代码都跑不起来，迁移到其他UI困难(Material UI)。对于全栈学习者 学习困难。
2、craco虽然可以改写部分cra的配置，但是对于启用某些性能优化的配置，也比较困难。

该项目有什么特点？
1、直接采用webpack,babel等较为原生的配置搭建antd design pro的环境，支持pwa。
2、二次编译速度大幅优化，实际测试效果为 umi和 craco 的1-4倍不等的提速。

## Installation

```
cnpm i
yarn
npm run build  or npm run dev

```




