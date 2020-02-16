const path = require('path');

const outputDir = path.resolve(__dirname, 'dist/js/');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        main: path.resolve(__dirname, 'src/js/main.js'),
        submain: path.resolve(__dirname, 'src/js/submain.js')
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: outputDir
    }
};