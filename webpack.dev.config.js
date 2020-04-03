const path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool:'source-map',
  module: {
    rules: [
      {
        test:    /\.(js|jsx)?/,
        exclude: /node_modules/,
        use:     {
          loader: 'babel-loader'
        }
        // use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.scss$/,
        use:  [{
          loader: 'style-loader' // 将 JS 字符串生成为 style 节点
        }, {
          loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
        }, {
          loader: 'sass-loader' // 将 Sass 编译成 CSS
        }]
      },
      { // 使用css配置
        test:   /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        // 使用less配置
        test:   /\.less$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use:  [
          {
            loader:  'url-loader',
            options: {
              limit: 8192
              // mimetype:'image/tif'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader'
            // options: {
            //   plugins: ['lodash'],
            //   presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
            // }
          }
        ]
      }
    ]
    // rules: [
    //     {
    //       enforce: "pre",
    //       test: /\.js$/,
    //       exclude: /node_modules/,
    //       loader: "eslint-loader",
    //       options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
    //         formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
    //     }
    //     },
    //     {
    //       test: /\.js$/,
    //       exclude: /node_modules/,
    //       loader: "babel-loader"
    //     }
    //   ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },

  cache:  true,
  entry: './src/index.js',

  output: {
    path:     path.resolve(__dirname, 'build/js'),
    filename: 'banble.js'
  },

  optimization: {

    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      })
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
    compress: true,
    // historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline:             true, // 设置为true，当源文件改变时会自动刷新页面
    port:               8080 // 设置默认监听端口，如果省略，默认为"8080"
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
