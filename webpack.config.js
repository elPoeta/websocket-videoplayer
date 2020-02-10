const path = require('path');

module.exports = {
    entry: './public/src/js/videoPlayer.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./public/dist')
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    },
    mode: 'none'
}
