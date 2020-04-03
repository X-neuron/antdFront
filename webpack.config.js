// const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-disable */
// const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackbar = require("webpackbar");
const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const threadLoader = require('thread-loader');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


const BuildFolder = "build";
const SrcFolder = "src";
const EntryJS = `${SrcFolder}/index.js`;
const HTMLTemplateFileName = 'index.html';
const HTMLTemplateFileFolder = `${SrcFolder}`;
const PublicFolder = `${SrcFolder}/public`;

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
  poolParallelJobs: 50,

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
// threadLoader.warmup(cssWorkerPool, ['css-loader', 'less-loader','sass-loader']);


module.exports = {
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        // test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use:     [
          {
              loader:"thread-loader",
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
                // '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-transform-runtime'
              ]
            }
          }
      ],
       // use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: cssWorkerPool
          // },
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   hmr: process.env.NODE_ENV === 'development',
            // },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              import: (parsedImport, resourcePath) => {
                // parsedImport.url - url of `@import`
                // parsedImport.media - media query of `@import`
                // resourcePath - path to css file

                // Don't handle `style.css` import
                if (parsedImport.url.includes('style.css')) {
                  return false;
                }

                return true;
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          // {
          //   loader: 'thread-loader',
          //   options: cssWorkerPool
          // },
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          // // {
          // //   // loader:'style-loader',
          // //   loader: MiniCssExtractPlugin.loader,
          // //   options: {
          // //     esModule: true,
          // //   },
          // //   // loader: 'isomorphic-style-loader',
          // // },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: {
              //     'primary-color': '#1DA57A',
              //     'link-color': '#1DA57A',
              //     'border-radius-base': '2px',
              //     // or
              //     'hack': `true; @import "your-less-file-path.less";`, // Override with less file
              //   },
                javascriptEnabled: true, // 恶心 bug一般的代码 来支持 antd
              },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use:  [
          {
            loader:  'url-loader',
            options: {
              limit: 8192,
              // mimetype:'image/tif'
            },
          },
        ],
      },
    ],
  },

  cache:  true,
  entry:  [
    // "core-js/modules/es6.promise",
    // "core-js/modules/es6.array.iterator",
    // path.resolve(__dirname, "src/index.js"),
    path.resolve(__dirname, EntryJS),
  ],
  output: {
    path:     path.resolve(__dirname, BuildFolder),
    // filename: 'banble.js',
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",

  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  // devServer: {
  //   // contentBase: './dst',//默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到"build"目录）
  //   historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
  //   inline:             true, // 设置为true，当源文件改变时会自动刷新页面
  //   port:               8080, // 设置默认监听端口，如果省略，默认为"8080"
  // },

  optimization: {
    minimize:true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),
    ],
  },
  plugins: [
    new webpackbar(),
    new CopyPlugin([
      { from: path.join(__dirname, PublicFolder), to: `${BuildFolder}/public` },
    ]),

    new HtmlWebpackPlugin({
      // filename: 'index.html', // 生成的html存放路径，相对于 output.path
      // template: path.join(__dirname, '/src/index.html'), //html模板路径
      filename: HTMLTemplateFileName, // 生成的html存放路径，相对于 output.path
      template:  `${HTMLTemplateFileFolder}/${HTMLTemplateFileName}`, // html模板路径
      // hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      inject: true, // 是否将js放在body的末尾
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    // new BundleAnalyzerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new LodashModuleReplacementPlugin,

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new LodashModuleReplacementPlugin,
    new HardSourceWebpackPlugin({
      // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
      // 果清除了node_modules，则缓存也是如此
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either an absolute path or relative to webpack's options.context.
      // Sets webpack's recordsPath if not already set.
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
      // 置构建不同的缓存
      configHash: function(webpackConfig) {
         // node-object-hash on npm can be used to build this.
         return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
      // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
      environmentHash: {
         root: process.cwd(),
         directories: [],
         files: ['package-lock.json', 'yarn.lock'],
      },
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: BuildFolder,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: BuildFolder + '/index.html',
      navigateFallbackDenylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp('/[^/?]+\\.[^/]+$'),
      ],
    }),
  ]

}
