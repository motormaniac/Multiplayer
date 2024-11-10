const path = require('path')

module.exports = {
    target:"node",
    entry: "./src/js_compiled/index.js",
    output: {
        path: __dirname,
        filename: "index.js",
    },
    mode: "development",
}