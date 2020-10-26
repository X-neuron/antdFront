module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    [
      '@babel/preset-react',
      {
        //   "pragma": "dom", // default pragma is React.createElement
        //   "pragmaFrag": "DomFrag", // default is React.Fragment
        // throwIfNamespace: false, // defaults to true
        // useBuiltIns: 'usage',
        "runtime": "automatic",
        "development": true
      },
    ],
  ],
  plugins: [
    'macros',
    'lodash',
    'styled-components',
    'transform-react-remove-prop-types',
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements',
    // "babel-plugin-macros",
    // [
    //   "babel-plugin-styled-components",
    //   {
    //     "transpileTemplateLiterals": false
    //   }
    // ],
    '@babel/plugin-syntax-dynamic-import',
    // "@babel/plugin-transform-runtime",
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: false,
        corejs: 3,
        helpers: true,
        regenerator: true,
        useESModules: true,
      },
    ],
    [
      'import',
      //using antd UI
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css', // `style: true` 会加载 less 文件
        "style": true
      },
      // // using material-ui
      // {
      //   "libraryName": "@material-ui/core",
      //   "libraryDirectory": "components",  // default: lib
      //   "camel2DashComponentName": false  // default: true
      // }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ],
};
