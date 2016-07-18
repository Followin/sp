var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';


module.exports = {
    entry: {
        "vendor": "./src/app/vendor",
        "app": "./src/app/main"
    },
    output: {
        path: __dirname,
        filename: "./dist/[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.ts', 'css', '.styl']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts/,
                loaders: ['ts', 'angular2-template-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            { test: /\.css$/, include: root('src', 'app'), loader: 'raw!postcss' },

            {
                test: /\.styl$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!stylus-loader')
            },
            { test: /\.styl$/, exclude: root('src', 'style'), loader: 'raw!postcss!stylus-loader' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./dist/vendor.bundle.js"),
        new ExtractTextPlugin('css/[name].[hash].css', {disable: !isProd})
    ]
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}