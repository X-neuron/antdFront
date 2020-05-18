// const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackbar = require('webpackbar');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const threadLoader = require('thread-loader');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const BuildFolder = 'devTmp';
const SrcFolder = 'src';
const EntryJS = `${SrcFolder}/index.jsx`;
const HTMLTemplateFileName = 'index.html';
const HTMLTemplateFileFolder = `${SrcFolder}`;
const InputPublicFolder = '/public';
const OutPutAssertFolder = `static/assert`;

const jsWorkerPool = {
  // the number of spawned workers, defaults to (number of cpus - 1) or
  // fallback to 1 when require('os').cpus() is undefined
  workers: require('os').cpus().length - 1,

  // number of jobs a worker processes in parallel
  // defaults to 20
  workerParallelJobs: 50,

  // additional node.js arguments
  workerNodeArgs: ['--max-old-space-size=1024'],

  // Allow to respawn a dead worker pool
  // respawning slows down the entire compilation
  // and should be set to false for development
  poolRespawn: false,

  // timeout for killing the worker processes when idle
  // defaults to 500 (ms)
  // can be set to Infinity for watching builds to keep workers alive
  poolTimeout: 2000,

  // number of jobs the poll distributes to the workers
  // defaults to 200
  // decrease of less efficient but more fair distribution
  poolParallelJobs: 50

  // name of the pool
  // can be used to create different pools with elsewise identical options
  // name: "my-pool"
};

// const cssWorkerPool = {
//   // 一个 worker 进程中并行执行工作的数量
//   // 默认为 20
//   workers: require('os').cpus().length - 1,

//   // number of jobs a worker processes in parallel
//   // defaults to 20
//   workerParallelJobs: 2,
//   poolTimeout: 2000
// };

threadLoader.warmup(jsWorkerPool, ['babel-loader']);
// threadLoader.warmup(cssWorkerPool, ['css-loader', 'less-loader', 'postcss-loader', 'file-loader']);

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        // test: /\.(js|mjs|jsx|ts|tsx)$/,
        test: /\.(j|t)sx?$/,
        // test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'thread-loader',
            options: jsWorkerPool
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              presets: ['@babel/preset-env'],
              plugins: [
                'lodash',
                'react-hot-loader/babel',
                // '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime'
              ]
            }
          },

        ]
      },
      // For CSS modules
      // For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
      // For Less - /\.((c|le)ss)$/i,
      {
        test: /\.((c|le)ss)$/i,
        include: [/[\\/]node_modules[\\/].*antd/],

        use: [
          // {
          //   loader: 'thread-loader',
          //   options: cssWorkerPool
          // },
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              // lessOptions: {
              //   javascriptEnabled: true
              // } // less loader 6.0.0 支持antd
              javascriptEnabled: true
            }
          }
        ]
      },
      // 以上对antd 的less 不开启 css module 以此解决 import styles from './index.less' 无法使用，而 import './index.less' 可以使用的问题
      {
        // test: /\.less$/i,

        test: /\.((c|le)ss)$/i,
        exclude: [/[\\/]node_modules[\\/].*antd/],
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
        use: [

          'style-loader',

          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              // modifyVars: {
              //     'primary-color': '#1DA57A',
              //     'link-color': '#1DA57A',
              //     'border-radius-base': '2px',
              //     // or
              //     'hack': `true; @import "yonpmur-less-file-path.less";`, // Override with less file
              //   },
              // importLoaders: 2,
              // modules: true,
              // getLocalIdent: getCSSModuleLocalIdent,
              // lessOptions: {
              //   javascriptEnabled: true
              // } // less loader 6.0.0 支持antd
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif|bmp)$/i,
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: OutPutAssertFolder,
            },

          }
        ]
      },

    ]
  },
  cache: true,
  entry: [
    // "core-js/modules/es6.promise",
    // "core-js/modules/es6.array.iterator",
    "react-hot-loader/patch",
    path.resolve(__dirname, EntryJS)
  ],
  output: {
    path: path.resolve(__dirname, BuildFolder),
    publicPath: '/',
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
      'react-dom': '@hot-loader/react-dom',
    }
  },

  devServer: {
    contentBase: path.join(__dirname, 'BuildFolder'), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
    compress: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8001",
    //     changeOrigin: true,
    //   },
    //   "/api2": {
    //     target: "http://localhost:8002",
    //     changeOrigin: true,
    //   }
    // },
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    // historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    port: 8080 // 设置默认监听端口，如果省略，默认为"8080"
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpackbar(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, InputPublicFolder), to: path.join(__dirname, `${BuildFolder}/public`) }
      ],
      options: {
        concurrency: 100,
      }
    }),

    new HtmlWebpackPlugin({
      // filename: 'index.html', // 生成的html存放路径，相对于 output.path
      // template: path.join(__dirname, '/src/index.html'), //html模板路径
      filename: HTMLTemplateFileName, // 生成的html存放路径，相对于 output.path
      template: `${HTMLTemplateFileFolder}/${HTMLTemplateFileName}`, // html模板路径
      // hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      inject: true, // 是否将js放在body的末尾
    }),
    // new BundleAnalyzerPlugin(),
    // new FriendlyErrorsWebpackPlugin(),
  ]
};
