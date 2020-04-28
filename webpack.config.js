// const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-disable */
// const webpack = require('webpack');
const path = require('path');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackbar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const safePostCssParser = require('postcss-safe-parser');
const postcssNormalize = require('postcss-normalize');

const threadLoader = require('thread-loader');
const CopyPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const BuildFolder = 'Build';
const SrcFolder = 'src';
const EntryJS = `${SrcFolder}/index.jsx`;
const HTMLTemplateFileName = 'index.html';
const HTMLTemplateFileFolder = `${SrcFolder}`;
const InputPublicFolder = `${SrcFolder}/public`;
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
              "presets": [["@babel/env", { "targets": { "node": 6 } }]],
              plugins: [
                'lodash',
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
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              // lessOptions: {
              //   javascriptEnabled: true
              // } // 用来支持 antd
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

          // 'style-loader',
          // {
          //   loader: 'thread-loader',
          //   options: cssWorkerPool
          // },
          {
            loader: MiniCssExtractPlugin.loader
            // options: {
            //   hmr: process.env.NODE_ENV === 'development',
            // },
          },
          {
            loader: 'css-loader',
            options: {
              // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 3,
              // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
              modules: true
              // modules: {
              //   getLocalIdent: (loaderContext, localIdentName, localName, options) => {
              //     if (loaderContext.resourcePath.includes('src/')) {
              //       return localName;
              //     }
              //     return '[hash:base64:5]';
              //   }
              // }

              // esModule: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebook/create-react-app/issues/2677
              ident: 'postcss',
              plugins: [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009'
                  },
                  stage: 3
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize()
              ]
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
              // less loader 6.0.0 配置 但是mincssextract 插件遇到hash无法读取问题。暂不更新
              // lessOptions: {
              //   javascriptEnabled: true
              // } // 用来支持 antd
              javascriptEnabled: true
            }
          }

          //   {
          //     test: /\.s[ac]ss$/i,
          //     loader: 'sass-loader',
          //   },
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
      // {
      //   test: /\.(png|jpg|gif)$/i,
      //   use:  [
      //     {
      //       loader:  'url-loader',
      //       options: {
      //         limit: 8192,
      //         // mimetype:'image/tif'
      //       },
      //     },
      //   ],
      // },
    ]
  },

  cache: true,
  entry: [
    // "core-js/modules/es6.promise",
    // "core-js/modules/es6.array.iterator",
    // path.resolve(__dirname, "src/index.js"),
    path.resolve(__dirname, EntryJS)
  ],
  output: {
    path: path.resolve(__dirname, BuildFolder),
    // filename: 'banble.js',
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          // Added for profiling in devtools
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        }
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
        canPrint: true
      })
    ]
  },
  plugins: [
    new webpackbar(),
    new CopyPlugin([
      { from: path.join(__dirname, InputPublicFolder), to: path.join(__dirname, `${BuildFolder}/public`) }
    ]),

    new HtmlWebpackPlugin({
      // filename: 'index.html', // 生成的html存放路径，相对于 output.path
      // template: path.join(__dirname, '/src/index.html'), //html模板路径
      filename: HTMLTemplateFileName, // 生成的html存放路径，相对于 output.path
      template: `${HTMLTemplateFileFolder}/${HTMLTemplateFileName}`, // html模板路径
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
        minifyURLs: true
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      cache: true,
      threshold: 10240,
    }),
    // new BundleAnalyzerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // new LodashModuleReplacementPlugin({
    //   'collections': true,
    //   'shorthands': true,
    //   // 'paths': true,
    //   // 'exotics': true,
    // }),
    // new LodashModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.optimize\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   },
    //   canPrint: true
    // }),
    new HardSourceWebpackPlugin({
      // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
      // 果清除了node_modules，则缓存也是如此
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either an absolute path or relative to webpack's options.context.
      // Sets webpack's recordsPath if not already set.
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
      // 置构建不同的缓存
      configHash: function (webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require('node-object-hash')({ sort: false }).hash(webpackConfig);
      },
      // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
      // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', 'yarn.lock']
      }
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
          (fileName) => !fileName.endsWith('.map')
        );

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true, // 让浏览器立即 servece worker 被接管
      skipWaiting: true, // 更新 sw 文件后，立即插队到最前面
      exclude: [/\.map$/, /asset-manifest\.json$/],
      navigateFallback: BuildFolder + '/index.html',
      navigateFallbackDenylist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude any URLs whose last part seems to be a file extension
        // as they're likely a resource and not a SPA route.
        // URLs containing a "?" character won't be blacklisted as they're likely
        // a route with query params (e.g. auth callbacks).
        new RegExp('/[^/?]+\\.[^/]+$')
      ]
    })
  ]
};
