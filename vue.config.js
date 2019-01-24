'use strict';

module.exports = {
    pages: {
        index: {
            entry: "src/views/index/main.js",
            template: "public/index.html",
            filename: "index.html",
            title: "主页",
            chunks: ["manifest", "vendor", "index"]
        },
        admin: {
            entry: "src/views/admin/main.js",
            template: "public/admin.html",
            filename: "admin.html",
            title: "后台管理",
            chunks: ["manifest", "vendor", "admin"]
        }
    }
};