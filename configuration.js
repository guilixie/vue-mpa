'use strict';

module.exports = {
  pages: {
      index: {
        entry: "src/views/index/main.js",
        template: "public/index.html",
        filename: "index.html",
        title: "商品库",
        chunks: ["chunk-vendors", "chunk-common", "index"]
      },
      admin: {
        entry: "src/views/admin/main.js",
        template: "public/admin.html",
        filename: "admin.html",
        title: "商品库后台管理",
        chunks: ["chunk-vendors", "chunk-common", "admin"]
      }
    }
};
