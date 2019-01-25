'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageConfig = require('../package.json')
/* const fs = require('fs')

const defaultOpt = {
  entry: 'main.js',
  tmpl: 'index.html',
  root: 'src'
} */

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

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function getEntries () {
  return pageConfig.entries
}

function setMultipagePlugin (mode = process.env.NODE_ENV) {
  console.log(mode)
  const webpackConfig = {
    plugins: []
  }
  for (let plugin in pageConfig.plugins) {
    const opt = Object.assign({}, plugin, htmlPluginOpt[mode])
    // https://github.com/ampedandwired/html-webpack-plugin
    webpackConfig.plugins.push(new HtmlWebpackPlugin(opt))
  }
  console.log(webpackConfig)
  return webpackConfig
}

function getVueConfig () {
  // const path = resolve('vue.config.js')
  const ret = {
    entries: {},
    plugins: []
  }
  /* fs.readFile(path, 'utf8', function (err, data) {
    console.log(err, data)
    const vueConfig = JSON.parse(data)
    for (let key in vueConfig.pages) {
      const tmp = vueConfig.pages[key]
      ret.entries[key] = tmp.entry
      ret.plugins.push({
        template: tmp.template,
        filename: tmp.filename,
        title: tmp.title,
        chunks: tmp.chunks
      })
    }
  }) */
  const vueConfig = require('../vue.config')
  for (let key in vueConfig.pages) {
    const tmp = vueConfig.pages[key]
    ret.entries[key] = `./${tmp.entry}`
    ret.plugins.push({
      template: `./${tmp.template}`,
      filename: tmp.filename,
      title: tmp.title,
      chunks: tmp.chunks
    })
  }
  console.log(ret)
  return ret
}

exports.getEntries = getEntries
exports.setMultipagePlugin = setMultipagePlugin
