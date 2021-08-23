const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpackbar = require('webpackbar');

const CopyPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");

const PnpWebpackPlugin = require('pnp-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const SafePostCssParser = require('postcss-safe-parser');
const postcssNormalize = require('postcss-normalize');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// react-dev-utils
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
// const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// const ignoredFiles = require('react-dev-utils/ignoredFiles');

const DashboardPlugin = require('webpack-dashboard/plugin');

const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient',
);
const reactRefreshOverlayEntry = require.resolve(
  'react-dev-utils/refreshOverlayInterop',
);

// resolve css less scss support module import
const paths = require('./paths');
const modules = require('./modules');
const getClientEnvironment = require('./env');

// Source maps are resource heavy and can cause out of memory issue for large source files.
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
// const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false";

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);
// Get the path to the uncompiled service worker (if it exists).
const { swSrc } = paths;

// const appPackageJson = require(paths.appPackageJson);

// const hasJsxRuntime = (() => {
//   if (process.env.DISABLE_NEW_JSX_TRANSFORM === "true") {
//     return false;
//   }

//   try {
//     require.resolve("react/jsx-runtime");
//     return true;
//   } catch (e) {
//     return false;
//   }
// })();

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function () {
  // We will provide `paths.publicUrlOrPath` to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  // Get environment variables to inject into our app.
  const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
  // const isEnvDevelopment = webpackEnv === "development";
  // const isEnvProduction = webpackEnv === "production";
  const isEnvDevelopment = env.raw.NODE_ENV === 'development';
  const isEnvProduction = env.raw.NODE_ENV === 'production';

  // Variable used for enabling profiling in Production
  // passed into alias object. Uses a flag if passed into the build command
  const isEnvProductionProfile =
    isEnvProduction && process.argv.includes('--profile');

  const shouldUseReactRefresh = env.raw.FAST_REFRESH;

  // common function to get style loaders

  const getStyleLoaders = (testReg, loader, options) => {
    function applyLoaders(isCSSModules) {
      const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
          loader: MiniCssExtractPlugin.loader,
          // css is located in `static/css`, use '../../' to locate index.html folder
          // in production `paths.publicUrlOrPath` can be a relative path
          options: paths.publicUrlOrPath.startsWith('.')
            ? {
              // publicPath: 'auto',
              hmr: isEnvDevelopment,
            }
            : {},
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: loader ? 1 : 0,
            ...(isCSSModules
              ? {
                modules: {
                  localIdentName: '[local]___[hash:base64:5]',
                },
              }
              : {}),
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            postcssOptions: {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in
              ident: 'postcss',
              plugins: [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize(),
              ],
            },
            sourceMap: isEnvDevelopment,
          },
        },
      ].filter(Boolean);
      if (loader) {
        loaders.push(
          // https://github.com/webpack-contrib/postcss-loader/issues/477
          // {
          //   loader: require.resolve("resolve-url-loader"),
          //   options: {
          //     sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          //   },
          // },
          {
            loader: require.resolve(loader),
            options: options || {},
          },
        );
      }
      return loaders;
    }

    return {
      test: testReg,
      oneOf: [
        {
          resourceQuery: /modules/,
          use: applyLoaders(true),
        },
        {
          use: applyLoaders(false),
        },
      ],
    };
  };

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    // Stop compilation early in production
    // bail: isEnvProduction,
    devtool: isEnvProduction ? false : 'cheap-module-source-map', //"eval-cheap-module-source-map"

    //webpack5.30 add featrue gc cahce
    cache: {
      type: 'memory'
      // type: 'filesystem',
      // buildDependencies: {
      //   defaultWebpack: ["webpack/lib/"],
      //   config: [__filename],
      // },
      // name: `${ process.env.NODE_ENV || 'development'}-cache`
    },
    entry: [
      // "core-js/modules/es6.promise",
      // "core-js/modules/es6.array.iterator",
      // path.join(process.cwd(), EntryJS),
      paths.appIndexJs,
    ],

    entry:
      isEnvDevelopment && !shouldUseReactRefresh
        ? [
          // Include an alternative client for WebpackDevServer. A client's job is to
          // connect to WebpackDevServer by a socket and get notified about changes.
          // When you save a file, the client will either apply hot updates (in case
          // of CSS changes), or refresh the page (in case of JS changes). When you
          // make a syntax error, this client will display a syntax error overlay.
          // Note: instead of the default WebpackDevServer client, we use a custom one
          // to bring better experience for Create React App users. You can replace
          // the line below with these two lines if you prefer the stock client:
          //
          // require.resolve('webpack-dev-server/client') + '?/',
          // require.resolve('webpack/hot/dev-server'),
          //
          // When using the experimental react-refresh integration,
          // the webpack plugin takes care of injecting the dev client for us.
          webpackDevClientEntry,
          // Finally, this is your app's code:
          paths.appIndexJs,
          // We include the app code last so that if there is a runtime error during
          // initialization, it doesn't blow up the WebpackDevServer client, and
          // changing JS code would still trigger a refresh.
        ]
        : paths.appIndexJs,

    output: {
      // The build folder.
      path: isEnvProduction ? paths.appBuild : undefined,
      // Add /* filename */ comments to generated require()s in the output.
      // pathinfo: isEnvDevelopment,
      pathinfo: false,
      // There will be one main bundle, and one file per asynchronous chunk.
      // In development, it does not produce real files.
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',

      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      // webpack uses `publicPath` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      // We inferred the "public path" (such as / or /my-project) from homepage.
      publicPath: paths.publicUrlOrPath,
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? (info) =>
          path
            .relative(paths.appSrc, info.absoluteResourcePath)
            .replace(/\\/g, '/')
        : isEnvDevelopment &&
        ((info) =>
          path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
      // Prevents conflicts when multiple webpack runtimes (from different apps)
      // are used on the same page.
      // jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      // globalObject: "this",
    },
    resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || [],
      ),
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools, although we do not recommend using it, see:
      // https://github.com/facebook/create-react-app/issues/290
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypeScript || !ext.includes('ts')),
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        // Allows for better profiling with ReactDevTools
        ...(isEnvProductionProfile && {
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        }),
        ...(modules.webpackAliases || {}),
      },
      // 不能设为 false，因为 tnpm 是通过 link 处理依赖，设为 false tnpm 下会有大量的冗余模块
      symlinks: true,
      // node_modules:path.resolve(module.cwd(), "../../node_modules"),
      // modules:[path.resolve(process.cwd(), "../../node_modules"),"node_modules"],

      mainFields: ['browser', 'module', 'jsnext:main', 'main'],
      // 处理 yarn 全局安装时的 resolve 问题->推测应该是小白
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin,
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.

        new ModuleScopePlugin(paths.appSrc, [
          paths.appPackageJson,
          reactRefreshOverlayEntry,
        ]),
      ],
    },
    resolveLoader: {
      plugins: [
        // Also related to Plug'n'Play, but this time it tells webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module),
      ],
    },
    optimization: {
      // moduleIds: isEnvDevelopment ? 'named':'deterministic',
      // chunkIds: isEnvDevelopment ? 'named':'deterministic',
      minimize: isEnvProduction,
      removeAvailableModules: isEnvProduction,
      removeEmptyChunks: isEnvProduction,

      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      mangleExports: 'deterministic',

      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          // eslint-disable-next-line global-require
          /* webpack-5-react-scripts start */
          // parallel: !process.env.CI,
          //还有单核搞开发的？
          parallel: !process.env.CI,
          extractComments: false,
          // sourceMap:isEnvProduction,
          /* webpack-5-react-scripts end */
          // sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            parse: {
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
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
              inline: 2,

              // turn off flags with small gains to speed up minification
              arrows: false,
              collapse_vars: false, // 0.3kb
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,

              // a few flags with noticable gains/speed ratio
              // numbers based on out of the box vendor bundle
              booleans: true, // 0.7kb
              if_return: true, // 0.4kb
              sequences: true, // 0.7kb
              unused: true, // 2.3kb

              // required features to drop conditional branches
              conditionals: true,
              dead_code: true,
              evaluate: true,
            },
            mangle: {
              safari10: true,
            },
            // Added for profiling in devtools
            keep_classnames: isEnvProductionProfile,
            keep_fnames: isEnvProductionProfile,
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
        // This is only used in production mode
        // new OptimizeCssAssetsPlugin({
        //   cssProcessorOptions: {
        //     parser: SafePostCssParser,
        //     map: isEnvDevelopment
        //       ? {
        //           // `inline: false` forces the sourcemap to be output into a
        //           // separate file
        //           inline: false,
        //           // `annotation: true` appends the sourceMappingURL to the end of
        //           // the css file, helping the browser find the sourcemap
        //           annotation: true,
        //         }
        //       : false,
        //   },
        //   cssProcessorPluginOptions: {
        //     preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        //   },
        // }),

        // new OptimizeCssAssetsPlugin({})
      ].filter(Boolean),
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      // splitChunks: {
      //   chunks: "all",
      //   name: false,
      // },
      splitChunks: isEnvDevelopment
        ? false
        : {
          chunks: 'async',
          minSize: 30720,
          minChunks: 1,
          maxAsyncRequests: 6,
          maxInitialRequests: 4,
          automaticNameDelimiter: '-',
          cacheGroups: {
            common: {
              name: 'common',
              chunks: 'all',
              priority: -20,
              minChunks: 2,
              reuseExistingChunk: true,
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: -10,
            },
            react: {
              name: 'react',
              test: /[\\/]node_modules[\\/](scheduler|react|react-dom|prop-types)/,
              chunks: 'all',
              enforce: true,
            },
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
              chunks: 'all',
            },
            // styles: {
            //   name: "styles",
            //   test: /\.css$/,
            //   chunks: "all",
            //   enforce: true
            // }
          },
        },
    },
    module: {
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // resolve : https://github.com/webpack/webpack/issues/11467 ^5.0.0-bata.30
        // {
        //   oneOf: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          // test: /\.(j|t)sx?$/,
          // exclude: /(node_modules|bower_components)/,
          include: paths.appSrc,
          // resolve:{
          //   fullySpecified: false
          // },
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                // See #6846 for context on why cacheCompression is disabled
                cacheCompression: false,
                compact: isEnvProduction,
                presets: [
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic',
                    },
                  ],
                ],
                plugins: [
                  'lodash',
                  // '@babel/plugin-proposal-object-rest-spread',
                  '@babel/plugin-transform-runtime',
                  // isEnvDevelopment && shouldUseReactRefresh && require.resolve("react-refresh/babel"),
                  isEnvDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        // {
        //   exclude: [/node_modules/],
        //   test: /\.(ts|js)x?$/,
        //   use: ['source-map-loader'],
        //   enforce: 'pre',
        // },
        getStyleLoaders(/\.(css)(\?.*)?$/),
        getStyleLoaders(/\.(less)(\?.*)?$/, 'less-loader', {
          sourceMap: isEnvDevelopment,
          lessOptions: {
            javascriptEnabled: true,
          },
        }),
        getStyleLoaders(/\.(scss|sass)(\?.*)?$/, 'sass-loader', {
          sourceMap: isEnvDevelopment,
        }),
        // {
        //   test: /\.(svg|eot|woff|woff2|ttf)(\?.*)?$/,
        //   use: [
        //     {
        //       loader: "file-loader",
        //       options: {
        //         outputPath: "static/",
        //         esModule: false,
        //         name: "/media/[name].[hash:8].[ext]",
        //       },
        //     },
        //   ],
        // },
        {
          test: /\.(txt|text|md)$/,
          type: 'asset/resource',
          // use: [
          //   {
          //     loader: 'raw-loader',
          //   },
          // ],
        },
        {
          test: /\.(bmp|png|jpe?g|gif|webp|ico|svg|eot|woff|woff2|ttf)(\?.*)?$/,
          type: 'asset/inline',
          // use: [
          //   {
          //     loader: 'url-loader',
          //     options: {
          //       limit: 10000,
          //       esModule: false,
          //       name: 'media/[name].[hash:8].[ext]',
          //       outputPath: 'static/',
          //       fallback: {
          //         loader: 'file-loader',
          //         options: {
          //           name: '[name].[hash:8].[ext]',
          //           outputPath: 'media/[name].[hash:8].[ext]',
          //           esModule: false,
          //         },
          //       },
          //       // mimetype:'image/tif'
          //     },
          //   },
          // ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.(mp4|webm)$/,
          type: 'asset/inline',
          // use: {
          //   loader: 'url-loader',
          //   options: {
          //     limit: 10000,
          //   },
          // },
        },
        {
          test: [/\.avif$/],
          type: 'asset/inline',
          // loader: require.resolve('url-loader'),
          // options: {
          //   limit: 10000,
          //   mimetype: 'image/avif',
          //   name: 'static/media/[name].[hash:8].[ext]',
          // },
        },
        //   ]
        // }
      ],
    },
    [isEnvDevelopment ? 'devServer' : 'ignoreWarnings']: isEnvDevelopment
      ? {
        hot: true,
        allowedHosts: 'all',
        client: {
          logging: "info",
          // Can be used only for `errors`/`warnings`
          //
          // overlay: {
          //   errors: true,
          //   warnings: true,
          // }
          webSocketTransport: 'ws',
          progress: true,
        },
        webSocketServer: 'ws',
        // ipc: true,
        // webSocketServer: "sockjs",
        // allowedHosts: "all",
        compress: false,
        static: [
          {
            directory: path.resolve(paths.appPublic),
            staticOptions: {},
            // publicPath: paths.publicUrlOrPath.slice(0, -1),
            publicPath: '/static',
            serveIndex: true,
            watch: {
              ignored: /node_modules/,
            },
          },
        ],
        // host: "local-ip",
        port: '8080',
        // historyApiFallback: true,
        // historyApiFallback: {
        //   // Paths with dots should still use the history fallback.
        //   // See https://github.com/facebook/create-react-app/issues/387.
        //   disableDotRule: true,
        //   index: paths.publicUrlOrPath,
        // },
        host: '127.0.0.1',
        // port: 8080, // 设置默认监听端口，如果省略，默认为"8080"
      }
      : [],
    // target: ['web', 'es5'],
    stats: 'normal',
    plugins: [
      // isEnvProduction && new CleanWebpackPlugin(),
      new Webpackbar(),
      isEnvDevelopment && new DashboardPlugin(),

      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      // See https://github.com/facebook/create-react-app/issues/240
      // isEnvDevelopment && new CaseSensitivePathsPlugin(),

      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false, // show a warning when there is a circular dependency
      }),

      // new HtmlWebpackPlugin({
      //   // hash: false, // 防止缓存，在引入的文件后面加hash (PWA就是要缓存，这里设置为false)
      //   // filename: HTMLTemplateFileName, // 生成的html存放路径，相对于 output.path
      //   // template: `${HTMLTemplateFileFolder}/${HTMLTemplateFileName}`, // html模板路径
      //   inject: true, // 是否将js放在body的末尾
      //   template: paths.appHtml,
      //   ...(isEnvProduction
      //     ? {
      //       minify: {
      //         removeComments: true,
      //         collapseWhitespace: true,
      //         removeRedundantAttributes: true,
      //         useShortDoctype: true,
      //         removeEmptyAttributes: true,
      //         removeStyleLinkTypeAttributes: true,
      //         keepClosingSlash: true,
      //         minifyJS: true,
      //         minifyCSS: true,
      //         minifyURLs: true,
      //       },
      //     }
      //     : undefined),
      // }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
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
              },
            }
            : undefined,
        ),
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      // isEnvProduction &&
      //   shouldInlineRuntimeChunk &&
      //   new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPath),
      // Makes some environment variables available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
      // It is absolutely essential that NODE_ENV is set to production
      // during a production build.
      // Otherwise React will be compiled in the very slow development mode.
      new webpack.DefinePlugin(env.stringified),

      // If you require a missing module and then `npm install` it, you still have
      // to restart the development server for webpack to discover it. This plugin
      // makes the discovery automatic so you don't have to restart.
      // See https://github.com/facebook/create-react-app/issues/186
      isEnvDevelopment &&
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),

      // This is necessary to emit hot updates (CSS and Fast Refresh):
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/master/packages/react-refresh
      isEnvDevelopment &&
      // shouldUseReactRefresh &&
      new ReactRefreshWebpackPlugin({
        // overlay: {
        //   entry: webpackDevClientEntry,
        //   // The expected exports are slightly different from what the overlay exports,
        //   // so an interop is included here to enable feedback on module-level errors.
        //   module: reactRefreshOverlayEntry,
        //   // Since we ship a custom dev client and overlay integration,
        //   // the bundled socket handling logic can be eliminated.
        //   sockIntegration: false,
        // },
      }),
      isEnvProduction &&
      new CompressionPlugin({
        algorithm: 'gzip',
        // cache: true,
        // threshold: 10240,
      }),

      // isEnvDevelopment && new BundleAnalyzerPlugin(),

      // new FriendlyErrorsWebpackPlugin(),
      // new LodashModuleReplacementPlugin({
      //   'collections': true,
      //   'shorthands': true,
      //   // 'paths': true,
      //   // 'exotics': true,
      // }),
      // new LodashModuleReplacementPlugin(),
      // new webpack.IgnorePlugin({
      //   resourceRegExp: /^\.\/locale$/,
      //   contextRegExp: /moment$/,
      // }),

      new CopyPlugin({
        patterns: [
          { from: paths.appPublic, to: path.join(paths.appBuild, '/public') },
          // { from: path.join(paths.appSrc,"/locales" ), to: path.join(paths.appBuild,"/public/locales" ) },
        ],
        options: {
          concurrency: 100,
        },
      }),

      isEnvProduction &&
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        ignoreOrder: true, // Enable to remove warnings about conflicting order
      }),

      // Generate an asset manifest file with the following content:
      // - "files" key: Mapping of all asset filenames to their corresponding
      //   output file so that tools can pick it up without having to parse
      //   `index.html`
      // - "entrypoints" key: Array of files which are included in `index.html`,
      //   can be used to reconstruct the HTML if necessary
      isEnvProduction &&
      new WebpackManifestPlugin({
        fileName: 'assert-manifest.json',
        publicPath: paths.publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith('.map'),
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),

      isEnvProduction &&
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true, // 让浏览器立即 servece worker 被接管
        skipWaiting: true, // 更新 sw 文件后，立即插队到最前面
        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
        exclude: [/\.map$/, /assert-manifest\.json$/, /LICENSE/],
        // importWorkboxFrom: 'cdn',
        navigateFallback: `${paths.publicUrlOrPath}index.html`,
        navigateFallbackDenylist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp('/[^/?]+\\.[^/]+$'),
        ],
        // Bump up the default maximum size (2mb) that's precached,
        // to make lazy-loading failure scenarios less likely.
        // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      }),

      // TypeScript type checking
      useTypeScript &&
      new ForkTsCheckerWebpackPlugin({
        typescript: resolve.sync('typescript', {
          basedir: paths.appNodeModules,
        }),
        async: isEnvDevelopment,
        checkSyntacticErrors: true,
        resolveModuleNameModule: process.versions.pnp
          ? `${__dirname}/pnpTs.js`
          : undefined,
        resolveTypeReferenceDirectiveModule: process.versions.pnp
          ? `${__dirname}/pnpTs.js`
          : undefined,
        tsconfig: paths.appTsConfig,
        reportFiles: [
          // This one is specifically to match during CI tests,
          // as micromatch doesn't match
          // '../cra-template-typescript/template/src/App.tsx'
          // otherwise.
          '../**/src/**/*.{ts,tsx}',
          '**/src/**/*.{ts,tsx}',
          '!**/src/**/__tests__/**',
          '!**/src/**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*',
        ],
        silent: true,
        // The formatter is invoked directly in WebpackDevServerUtils during development
        formatter: isEnvProduction ? typescriptFormatter : undefined,
      }),
      // new ESLintPlugin({
      //   // Plugin options
      //   extensions: ["js", "mjs", "jsx", "ts", "tsx"],
      //   formatter: require.resolve("react-dev-utils/eslintFormatter"),
      //   eslintPath: require.resolve("eslint"),
      //   context: paths.appSrc,
      //   // ESLint class options
      //   cwd: paths.appPath,
      //   resolvePluginsRelativeTo: __dirname,
      //   baseConfig: {
      //     extends: [require.resolve("eslint-config-react-app/base")],
      //     rules: {
      //       ...(!hasJsxRuntime && {
      //         "react/react-in-jsx-scope": "error",
      //       }),
      //     },
      //   },
      // }),
    ].filter(Boolean),

    // Turn off performance processing because we utilize
    // our own hints via the FileSizeReporter
    performance: false,
  };
};
