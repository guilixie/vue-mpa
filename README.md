# 基于vue-cli 2的多页面模板

> &emsp;&emsp;这是基于 `vue-cli 2` 改造的vue的多页面模板，主要原理非常简单，只是`webpack`的多入口的配置和使用多个`HtmlWebpackPlugin`。当然，随着 <a href="https://cli.vuejs.org/zh/" target="_blank">`vue-cli 3`</a> 的正式发布，支持多页面已经不在话下，而且十分方便。在此之前，笔者使用本项目的配置已经满足当时的开发需求了。

## 一、运行
&emsp;&emsp;和原来一样样的。更多细节解释和原理不在本文讨论范围，请参考 <a href="http://vuejs-templates.github.io/webpack/" target="_blank">`vuejs-templates`</a> 说明和 <a href="https://vue-loader.vuejs.org/" target="_blank">`vue-loader`</a> 文档。

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
&emsp;&emsp;在某个文件夹下放置各页面的代码，各个页面都是单页面的代码。然后主要是利用`node`模块`fs`读取目录信息，然后构造出多入口配置和生成多个`HtmlWebpackPlugin`。在 ***utils.js*** 里面添加两个方法，记得在头部添加
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
&emsp;&emsp;修改 ***webpack.base.conf.js*** 配置项 `entry`如下：
``` javascript
entry: utils.getEntries('./src/views', 'main.js')
```

### 3. 修改开发模式HtmlWebpackPlugin配置
&emsp;&emsp;修改 ***webpack.dev.conf.js*** 关键代码如下：
``` javascript
const multiWebpackConfig = utils.setMultipagePlugin('./src/views', 'index.html', {
  inject: true
})

const devWebpackConfig = merge(baseWebpackConfig, multiWebpackConfig, webpackConfig)
```

### 4. 修改生产模式HtmlWebpackPlugin配置
&emsp;&emsp;修改 ***webpack.prod.conf.js*** 关键代码如下：
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

---

## 三、改良方案

&emsp;&emsp;现在又有个需求，不用自己去读取目录，而是采用配置文件的方式。于是再次用`vue-cli 2`新建一个x项目，在最外层新建一个文件`vue.config.js`用来配置多页面的信息，然后新建一个`public`文件夹放置各页面模板和静态文件。然后就可以修改关键代码了，原理和 1.0.0 分支的一毛一样，只不过配置需要从文件中读取，并构造成我们需要的样子。主要实现如下，具体细节不再赘述，请自行查看`master`分支。

* 主要方法

``` javascript
const fs = require('fs')

const defaultOpt = {
  entry: './src/main.js',
  plugin: {
    template: './public/index.html',
    filename: 'index.html',
    favicon: './public/favicon.ico',
    chunks: ['manifest', 'vendor', 'app']
  }
}

const htmlPluginOpt = {
  production:
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
  },
  development: {
    inject: true
  }
}

const pageConfig = getVueConfig()
function setMultipagePlugin (mode = process.env.NODE_ENV) {
  const webpackConfig = {
    plugins: []
  }
  pageConfig.plugins.forEach(function (plugin) {
    const opt = Object.assign({}, plugin, htmlPluginOpt[mode])
    webpackConfig.plugins.push(new HtmlWebpackPlugin(opt)) // https://github.com/ampedandwired/html-webpack-plugin
  })
  return webpackConfig
}

function getVueConfig () {
  const path = resolve('vue.config.js')
  const ret = {
    entries: {},
    plugins: []
  }
  try {
    fs.readFileSync(path, 'utf8')
    const vueConfig = require(path)
    for (let key in vueConfig.pages) {
      const tmp = vueConfig.pages[key]
      ret.entries[key] = tmp.entry
      delete tmp.entry
      ret.plugins.push(tmp)
    }
  } catch (err) {
    if (err.toString().indexOf('no such file or directory') === -1) throw err
    ret.entries.app = defaultOpt.entry
    ret.plugins = [defaultOpt.plugin]
  }
  return ret
}

exports.getEntries = getEntries
exports.setMultipagePlugin = setMultipagePlugin
```

&emsp;&emsp;如果不配置这个`vue.config.js`配置文件，那么就需要有个默认的配置，这里默认使用单页面的配置，示例可参考 <a href="https://github.com/guilixie/vue-mpa/tree/spa" target="_blank">spa</a> 分支。

---

## 四、总结
&emsp;&emsp;想当初jQuery盛行的年代，web项目大多采用多页面（mpa）架构，而目前主流趋势都是采用单页面（spa）模式。尽管如此，多页面模式也是需要的，特别是移动端开发。根据单一职责原理，将复杂的业务单一化，降低耦合度，同时可以减少各单页面的复杂度，有利于后期的维护和嵌套在不同容器中。当然配置文件还可以提取很多配置项，这个官方出的 <a href="https://cli.vuejs.org/zh/" target="_blank">`vue-cli 3`</a> 脚手架可以很方便地使用。
