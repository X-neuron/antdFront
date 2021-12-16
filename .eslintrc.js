// const fs = require("fs");
// const path = require("path");

// const prettierOptions = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"),
// );

module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "airbnb",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-hooks", "html", "compat", "@babel/eslint-plugin"],
  env: {
    node: true,
    jquery: true,
    es6: true,
    browser: true,
  },
  globals: {
    angular: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".json", ".ts", "tsx"],
      },
    },
  },
  rules: {
    // "compat/compat": 2,
    // "prettier/prettier": ["error", prettierOptions],
    "global-require": 1,
    "arrow-body-style": [2, "as-needed"],
    "no-nested-ternary": 0,
    "no-bitwise": 0,
    "prefer-promise-reject-errors": 1,
    "react/jsx-props-no-spreading": 0,
    "prefer-rest-params": 1,
    "no-var": 1,
    "vars-on-top": 1,
    "no-multi-assign": 0,
    "max-len": 0,
    "func-names": 0,
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 2,
    "import/no-webpack-loader-syntax": 0,
    "import/prefer-default-export": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    // 官方文档 http://eslint.org/docs/rules/
    // 参数：0 关闭，1 警告，2 错误
    quotes: [1, "double"], // 建议使用单引号
    // "no-inner-declarations": [0, "both"],     //不建议在{}代码块内部声明变量或函数
    // 使用前未定义
    "no-use-before-define": [1, "nofunc"],
    "react/jsx-no-useless-fragment": 2,
    complexity: [0, 10], // 圈复杂度大于*

    // 定义数组或对象最后多余的逗号
    // "comma-dangle": [
    //   1,
    //   "never"
    // ],
    "comma-dangle": 0,
    // 不允许对全局变量赋值,如 window = 'abc'
    "no-global-assign": [
      "error",
      {
        // 定义例外
        // "exceptions": ["Object"]
      },
    ],
    // "space-before-function-paren": 1,  // 函数定义时括号前面要不要有空格
    "no-console": 0, // 不禁用console
    "no-debugger": 2, // 禁用debugger
    // "no-var": 0, //对var警告
    semi: 0, // 不强制使用分号
    "no-irregular-whitespace": 0, // 不规则的空白不允许
    "no-trailing-spaces": 1, // 一行结束后面有空格就发出警告
    trailing: 0,
    "eol-last": 0, // 文件以单一的换行符结束
    "no-unused-vars": [1, { vars: "all", args: "after-used" }], // 不能有声明后未被使用的变量或参数
    "no-underscore-dangle": 0, // 标识符不能以_开头或结尾
    "no-alert": 2, // 禁止使用alert confirm prompt
    "no-class-assign": 2, // 禁止给类赋值
    "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
    "no-const-assign": 2, // 禁止修改const声明的变量
    "no-delete-var": 2, // 不能对var声明的变量使用delete操作符
    "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复
    "no-duplicate-case": 2, // switch中的case标签不能重复
    "no-dupe-args": 2, // 函数参数不能重复
    "no-empty": 2, // 块语句中的内容不能为空
    "no-func-assign": 2, // 禁止重复的函数声明
    "no-invalid-this": 0, // 禁止无效的this，只能用在构造器，类，对象字面量
    "no-spaced-func": 1, // 函数调用时 函数名与()之间不能有空格
    "no-this-before-super": 0, // 在调用super()之前不能使用this或super
    "no-undef": 1, // 不能有未定义的变量
    // "no-use-before-define": 2, //未定义前不能使用
    camelcase: 1, // 强制驼峰法命名
    "react/display-name": 0, // 防止在React组件定义中丢失displayName
    "react/forbid-prop-types": [2, { forbid: ["any"] }], // 禁止某些propTypes
    "react/jsx-boolean-value": 0, // 在JSX中强制布尔属性符号
    "react/jsx-closing-bracket-location": 1, // 在JSX中验证右括号位置
    "react/jsx-curly-spacing": [2, { when: "never", children: true }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
    // "react/jsx-indent-props": [2, "tab"], //验证JSX中的props缩进
    "react/jsx-indent": 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    "react/jsx-key": 1, // 在数组或迭代器中验证JSX具有key属性
    // "react/jsx-max-props-per-line": [1, {"maximum": 1}], // 限制JSX中单行上的props的最大数量
    "react/jsx-no-bind": 0, // JSX中不允许使用箭头函数和bind
    "react/jsx-no-duplicate-props": 2, // 防止在JSX中重复的props
    "react/jsx-no-literals": 0, // 防止使用未包装的JSX字符串
    "react/jsx-no-undef": 1, // 在JSX中禁止未声明的变量
    "react/jsx-pascal-case": 1, // 为用户定义的JSX组件强制使用PascalCase
    // "react/jsx-sort-props": 2, //强化props按字母排序
    "react/jsx-uses-react": 0, // 防止反应被错误地标记为未使用 //new jsx trans可以关闭了
    "react/jsx-uses-vars": 2, // 防止在JSX中使用的变量被错误地标记为未使用
    "react/no-danger": 0, // 防止使用危险的JSX属性
    "react/no-did-mount-set-state": 0, // 防止在componentDidMount中使用setState
    "react/no-did-update-set-state": 1, // 防止在componentDidUpdate中使用setState
    "react/no-direct-mutation-state": 2, // 防止this.state的直接变异
    // "react/no-multi-comp": 1, //防止每个文件有多个组件定义
    "react/no-set-state": 0, // 防止使用setState
    "react/prefer-stateless-function": 1,
    "react/jsx-one-expression-per-line": 0,
    "react/no-unknown-property": 2, // 防止使用未知的DOM属性
    "react/prop-types": 0, // 防止在React组件定义中丢失props验证
    "react/react-in-jsx-scope": 0, // 使用JSX时防止丢失React //new jsx trans可以关闭了
    "react/self-closing-comp": 0, // 防止没有children的组件的额外结束标签
    "react/sort-comp": 2, // 强制组件方法顺序
    "no-extra-boolean-cast": 0, // 禁止不必要的bool转换
    "react/no-array-index-key": 0, // 防止在数组中遍历中使用数组key做索引
    "react/no-deprecated": 1, // 不使用弃用的方法
    "react/jsx-equals-spacing": 2, // 在JSX属性中强制或禁止等号周围的空格
    "no-unreachable": 1, // 不能有无法执行的代码
    "no-mixed-spaces-and-tabs": 0, // 禁止混用tab和空格
    "prefer-arrow-callback": 0, // 比较喜欢箭头回调
    "arrow-parens": 0, // 箭头函数用小括号括起来
    "arrow-spacing": 0, //= >的前/后括号
    "object-curly-newline": 0, // 对象另起一行
    "no-multiple-empty-lines": 0, // 不要多行空行
    // "jsx-a11y/img-has-alt":1,//<img> 标签总是添加 alt 属性. 如果图片以presentation(感觉是以类似PPT方式显示?)方式显示，alt 可为空, 或者<img> 要包含role="presentation"
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ["Input"],
      },
    ],
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/img-redundant-alt": [
      2,
      {
        components: ["Image"],
        words: ["Bild", "Foto"],
      },
    ], // Enforce img alt attribute does not contain the word image, picture, or photo. Screenreaders already announce img elements as an image. There is no need to use words such as image, photo, and/or picture.
    "jsx-a11y/no-access-key": 1, // 不要在标签上使用 accessKey 属性 为什么? 屏幕助读器在键盘快捷键与键盘命令时造成的不统一性会导致阅读性更加复杂.
    "jsx-a11y/anchor-is-valid": 0,
    "no-plusplus": 0,
    "no-script-url": 0,
    "react/state-in-constructor": 0,
    "react/no-string-refs": 1, // 总是在Refs里使用回调函数.
    "no-param-reassign": 0,
    // "react/wrap-multilines":2, //将多行的JSX标签写在 ()里
    "react/require-render-return": 1, // 在 render 方法中总是确保 return 返回值
    "react/no-is-mounted": 2, // 不要再使用 isMounted,为什么? isMounted 反人类设计模式:(), 在 ES6 classes 中无法使用， 官方将在未来的版本里删除此方法
    // 代码风格优化 --------------------------------------
    "no-else-return": 1, // 在else代码块中return，else是多余的
    "no-multi-spaces": [
      1,
      {
        ignoreEOLComments: false,
        exceptions: { VariableDeclarator: true, ImportDeclaration: true },
      },
    ], // 不允许多个空格
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/destructuring-assignment": 0,
    // object直接量建议写法 : 后一个空格前面不留空格,切keyvalue对齐
    // "key-spacing": [
    // 	1,
    // 	{
    // 		align: "value",
    // 		"beforeColon": false,
    // 		"afterColon": true
    // 	}
    // ],
    "newline-per-chained-call": 0,

    "key-spacing": [
      0,
      {
        beforeColon: false,
        afterColon: true,
      },
    ],

    "block-scoped-var": 1, // 变量应在外部上下文中声明，不应在{}代码块中
    "consistent-return": 0, // 函数返回值可能是不同类型
    "accessor-pairs": 1, // object getter/setter方法需要成对出现

    // 换行调用对象方法  点操作符应写在行首
    "dot-location": [1, "property"],
    "no-lone-blocks": 1, // 多余的{}嵌套
    "no-labels": 1, // 无用的标记
    "no-extend-native": 1, // 禁止扩展原生对象
    "no-floating-decimal": 1, // 浮点型需要写全 禁止.1 或 2.写法
    "no-loop-func": 1, // 禁止在循环体中定义函数
    "no-new-func": 1, // 禁止new Function(...) 写法
    "no-self-compare": 1, // 不允与自己比较作为条件
    "no-sequences": 1, // 禁止可能导致结果不明确的逗号操作符
    "no-throw-literal": 1, // 禁止抛出一个直接量 应是Error对象

    // 不允return时有赋值操作
    "no-return-assign": [1, "always"],

    // 不允许重复声明
    "no-redeclare": [
      1,
      {
        builtinGlobals: true,
      },
    ],

    // 不执行的表达式
    "no-unused-expressions": [
      0,
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    "no-useless-call": 1, // 无意义的函数call或apply
    "no-useless-concat": 1, // 无意义的string concat
    "no-void": 1, // 禁用void
    "no-with": 1, // 禁用with
    "space-infix-ops": 0, // 操作符前后空格

    // jsdoc
    "valid-jsdoc": [
      1,
      {
        requireParamDescription: true,
        requireReturnDescription: true,
      },
    ],

    // 标记未写注释
    "no-warning-comments": [
      1,
      {
        terms: ["todo", "fixme", "any other term"],
        location: "anywhere",
      },
    ],
    curly: 0, // if、else、while、for代码块用{}包围
  },
};
