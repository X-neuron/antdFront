/* eslint-disable global-require */
module.exports = {
  targets: ">1%, not ie 11",
  presets: [
    [
      "@babel/preset-env",
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: "entry",
        // Set the corejs version we are using to avoid warnings in console
        corejs: 3,
        // Exclude transforms that make all code slower
        exclude: ["transform-typeof-symbol"],
      },
    ],
    [
      "@babel/preset-react",
      {
        // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
        // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
        runtime: "automatic",
        development: true,
      },
    ],
  ],
  plugins: [
    "lodash",
    "@babel/plugin-syntax-jsx",
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false, // defaults to true
        "runtime": "automatic", // defaults to classic
        // "importSource": "custom-jsx-library" // defaults to react
      }
    ],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-transform-react-constant-elements",
    "macros",
    "@umijs/babel-plugin-auto-css-modules",
    // "babel-plugin-macros",
    // [
    //   "babel-plugin-styled-components",
    //   {
    //     "transpileTemplateLiterals": false
    //   }
    // ],
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-transform-runtime",
      {
        version: require("@babel/runtime/package.json").version,
        absoluteRuntime: false,
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
    [
      "import",
      // using antd UI
      {
        libraryName: "antd",
        libraryDirectory: "es",
        // style: 'css', // `style: true` 会加载 less 文件
        style: true,
      },
      // // using material-ui
      // {
      //   "libraryName": "@material-ui/core",
      //   "libraryDirectory": "components",  // default: lib
      //   "camel2DashComponentName": false  // default: true
      // }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      }
    ],
    "@babel/plugin-proposal-export-default-from",
    [
      "@babel/plugin-proposal-private-methods",
      {
        loose: true,
      }
    ],
    [
      "@babel/plugin-proposal-private-property-in-object",
      {
        loose: true,
      }
    ],
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
  ],
};
