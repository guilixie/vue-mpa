'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageConfig = require('../package.json')
const fs = require('fs')
const vueConfig = require('../vue.config')

const pageDir = 'src/views'
const entryName = 'main.js'
const tmplName = 'index.html'

const pageConfig = getVueConfig()

exports.assetsPath = function(_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
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
    function generateLoaders(loader, loaderOptions) {
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
exports.styleLoaders = function(options) {
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

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

function getEntriesAuto(dir = pageDir, entry = entryName) {
    const entries = {}
    const pageDirPath = resolve(dir)
        // 发现文件夹，就认为是页面模块
    fs.readdirSync(pageDirPath)
        .forEach(function(fold) {
            entries[fold] = [dir, fold, entry].join('/')
        })
    return entries
}

function setMultipagePluginAuto(pageDir, entryPath, htmlOptions) {
    const pages = getEntries(pageDir, entryPath)
    const webpackConfig = {
        plugins: []
    }
    for (let pathname in pages) {
        const opt = Object.assign({}, {
                title: pathname,
                filename: pathname + '.html',
                template: pages[pathname],
                chunks: ['manifest', 'vendor', pathname]
            }, htmlOptions)
            // https://github.com/ampedandwired/html-webpack-plugin
        webpackConfig.plugins.push(new HtmlWebpackPlugin(opt))
    }
    return webpackConfig
}

function getVueConfig() {
    const ret = {
        entries: {},
        plugins: []
    }
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
    return ret
}

function getEntries() {
    const entries = getEntriesAuto()
}

function setMultipagePluginAuto(pageDir, entryPath, htmlOptions) {}

exports.getEntriesAuto = getEntriesAuto
exports.getEntries = getEntries
exports.setMultipagePluginAuto = setMultipagePluginAuto
exports.setMultipagePlugin = setMultipagePlugin