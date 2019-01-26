'use strict'

module.exports = {
  pages: {
    index: {
      entry: './src/views/index/main.js',
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      title: '主页',
      chunks: ['manifest', 'vendor', 'index']
    },
    admin: {
      entry: './src/views/admin/main.js',
      template: './public/admin.html',
      filename: 'admin.html',
      favicon: './public/favicon.ico',
      title: '后台管理',
      chunks: ['manifest', 'vendor', 'admin']
    }
  }
}
