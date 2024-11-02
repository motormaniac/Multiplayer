const path = require('path')

module.exports = [
    {
        entry: "./client/src/scripts/index.js",
        output: {
            path: path.resolve(__dirname, "./client/dist"),
            filename: "main.js",
        },
        mode: "development",
    }
]