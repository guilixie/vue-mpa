# 基于vue-cli 2的多页面模板

> 这是基于 vue-cli 2 改造的vue的多页面模板，主要原理非常简单，只是webpack的多入口的配置和使用多个HtmlWebpackPlugin。当然，随着 <a href="https://cli.vuejs.org/zh/" target="_blank">vue-cli 3</a> 的发布，支持多页面已经不在话下，而且十分方便。在此之前，笔者使用本项目的配置已经满足当时的开发需求了。

## 一、运行
和原来一样样的。更多细节解释和原理不在本文讨论范围，请参考 <a href="http://vuejs-templates.github.io/webpack/" target="_blank">vuejs-templates</a> 说明和 <a href="https://vue-loader.vuejs.org/" target="_blank">vue-loader</a> 文档。

``` bash
# install dependencies
npm install / yarn

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 二、改造步骤
### 1. 核心方法
需要在 ***utils.js*** 里面添加两个方法，记得在头部添加
`const HtmlWebpackPlugin = require('html-webpack-plugin')`，代码如下：
``` javascript
function getEntries (pageDir, entryPath) {
  const entries = {}
  const pageDirPath = resolve(pageDir)
  fs.readdirSync(pageDirPath) // 发现文件夹，就认为是页面模块
    .forEach(function (fold) {
      entries[fold] = [pageDir, fold, entryPath].join('/')
    })
  return entries
}

function setMultipagePlugin (pageDir, entryPath, htmlOptions) {
  const pages = getEntries(pageDir, entryPath)
  const webpackConfig = {
    plugins: []
  }
  for (let pathname in pages) {
    const opt = Object.assign({}, {
      filename: pathname + '.html',
      template: pages[pathname],
      chunks: ['manifest', 'vendor', pathname]
    }, htmlOptions)
    // https://github.com/ampedandwired/html-webpack-plugin
    webpackConfig.plugins.push(new HtmlWebpackPlugin(opt))
  }
  return webpackConfig
}

exports.getEntries = getEntries
exports.setMultipagePlugin = setMultipagePlugin
```

### 2. 配置多入口
修改 ***webpack.base.conf.js*** 配置项 `entry`如下：
``` javascript
entry: utils.getEntries('./src/views', 'main.js')
```

### 3. 修改开发模式HtmlWebpackPlugin配置
修改 ***webpack.dev.conf.js*** 关键代码如下：
``` javascript
const multiWebpackConfig = utils.setMultipagePlugin('./src/views', 'index.html', {
  inject: true
})

const devWebpackConfig = merge(baseWebpackConfig, multiWebpackConfig, webpackConfig)
```

### 4. 修改生产模式HtmlWebpackPlugin配置
修改 ***webpack.prod.conf.js*** 关键代码如下：
``` javascript
const multiWebpackConfig = utils.setMultipagePlugin('./src/views', 'index.html',
  // generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  {
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      minifyJS: true,
      minifyCSS: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
  })

module.exports = merge(baseWebpackConfig, multiWebpackConfig, webpackConfig)
```

于是就可以愉快的开发多页面项目了，以上代码只是关键代码，完整代码见 <a href="https://github.com/guilixie/vue-mpa/tree/1.0.0" target="_blank">1.0.0</a> 分支。
