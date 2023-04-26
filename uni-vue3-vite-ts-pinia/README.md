## uni-vue3-project
### 搭建框架
* 技术栈： uniapp + vue3 + vite + typescript
* 
---
### 步骤
1、npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project

2、安装插件： 1）prettier 2）eslint

3、基础代码配置
  * 代码风格 安装eslint： 
  ``` 
    npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-prettier eslint-plugin-vue vue-eslint-parser -D
  ```
  配置.eslintrc.js文件：
  ```
    module.exports = {
      root: true,
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
      plugins: ['@typescript-eslint', 'prettier', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
      ],
      overrides: [
        {
          files: ['*.ts', '*.tsx', '*.vue'],
          rules: {
            'no-undef': 'off',
          },
        },
      ],
      rules: {
        'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
        camelcase: ['error', { properties: 'never' }],
        'no-var': 'error',
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-void': 'error',
        'prefer-const': [
          'warn',
          { destructuring: 'all', ignoreReadBeforeAssign: true },
        ],
        'prefer-template': 'error',
        'object-shorthand': [
          'error',
          'always',
          { ignoreConstructors: false, avoidQuotes: true },
        ],
        'block-scoped-var': 'error',
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        'no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],

        // vue
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',

        // prettier
        'prettier/prettier': 'error',

        // import
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
            ],
            pathGroupsExcludedImportTypes: ['type'],
          },
        ],
      },
    }

  ```
  * 创建.eslintignore文件（指定不需要进行检查的目录或文件）
  ```
      .sh
      node_modules
      *.md
      *.woff
      *.ttf
      .vscode
      .idea
      dist
      /public
      /docs
      .husky
      .local
      /bin
      Dockerfile
      .npmrc
  ```
  * 创建 .prettierrc 文件(格式化规则)
  ```
   {
    "printWidth": 80, //单行长度
    tabWidth: 2, //缩进长度
    useTabs: false, //使用空格代替tab缩进
    semi: true, //句末使用分号
    singleQuote: true, //使用单引号
    quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
    jsxSingleQuote: true, // jsx中使用单引号
    trailingComma: 'all', //多行时尽可能打印尾随逗号
    bracketSpacing: true, //在对象前后添加空格-eg: { foo: bar }
    jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
    arrowParens: 'always', //单参数箭头函数参数周围使用圆括号-eg: (x) => x
    requirePragma: false, //无需顶部注释即可格式化
    insertPragma: false, //在已被preitter格式化的文件顶部加上标注
    proseWrap: 'preserve', //不知道怎么翻译
    htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
    vueIndentScriptAndStyle: false, //不对vue中的script及style标签缩进
    endOfLine: 'lf', //结束行形式
    embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  }
  ```

  * 创建 .prettierignore 文件(格式化忽略文件)
  ```
    **/*.svg
    **/*.ico
    package.json
    package-lock.json
    /dist
    .DS_Store
    .eslintignore
    *.png
    .editorconfig
    .gitignore
    .prettierignore
    .eslintcache
    *.lock
    yarn-error.log
    **/node_modules/**
  ```


4、设置路径别名
  * 修改vite.config.ts
  ```
    import path from 'path'
    import { defineConfig } from 'vite'
    import uni from '@dcloudio/vite-plugin-uni'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [uni()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
          '@img': path.resolve(__dirname, 'src/static/images'),
        },
      },
    })
  ```
  *如果报错,ts会报找不到模块的错误提示,修改 tsconfig文件:*

  ```
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"] 
    }
  }
  ```

  5、样式管理

  _css预处理，使用sass为例_
  ```
    pnpm i sass sass-loader -D
  ```
  * 创建 vivariable.scss ,管理颜色变量
  ```
    $border-color-dark: #b6b7b9;
  ```
  * 创建 mixins.scss 
  ```
    @mixin flex-row {
      display: flex;
      align-items: center;
    }

    @mixin flex-column {
      display: flex;
      flex-direction: column;
    }

    // 文字超出隐藏
    @mixin text-eli {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  ```
  * 创建 公共样式 common.scss

  * 配置自动导入颜色变量
  
  ```
    在vite.config.ts中配置：
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/vars.scss";`,
        },
      },
    }

    ~~ 插件 SCSS IntelliSense 提示定义变量值
  ```

  * 配置自动导入vue方法
  ```
    全局安装
    pnpm i -D unplugin-auto-import
  ```
  > vite.config.ts 中引入
  ```
    import AutoImport from 'unplugin-auto-import/vite'

    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: './auto-imports.d.ts', // 安装好依赖后，重新运行编译即可自动在根目录下生成此声明文件
      }),
    ]
  ```

  > tsconfig.ts 中引入声明文件，配置后代码中无需导入，直接使用vue中的方法
  ```
     "include": [ 
        "src/**/*.ts", 
        "src/**/*.d.ts", 
        "src/**/*.tsx", 
        "src/**/*.vue",
        "auto-imports.d.ts"
      ]
  ```
  
  