var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssgrace = require('cssgrace');
var filterGradient = require('postcss-filter-gradient');
module.exports = {
    entry: {
        main : path.join(__dirname,"./src/scripts/main.js")   
    },
    output: {
        path: path.join(__dirname,'hot'),
        // publicPath: "/scripts/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/,  loader: 'style-loader!css-loader!postcss-loader' },
            // { test : /\.jsx?$/ ,loader : 'react-hot!babel?presets[]=react,presets[]=es2015' , exclude: /(node_modules|bower_components)/},
            { test : /\.jsx?$/ , loader : 'babel-loader' , query:{ presets : ['es2015','react'] } , exclude: /(node_modules|bower_components)/},
            //如果不超过30000/1024kb,那么就直接采用dataUrl的形式,超过则返回链接,图片会复制到dist目录下
            { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
            { test: /\.(ttf|eot|svg|woff(2)?)((\?v=)?[?#a-z0-9]+)?$/, loader : "file-loader"}
        ]
    },
    postcss: function () {
        return [autoprefixer, precss,cssgrace,filterGradient];
    },
    plugins : [ 
        new webpack.DefinePlugin({
            __DEBUG__: true
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template : 'src/index.html',
            inject: true
            // filename: '../index.html',
        })
    ],
    debug : true,
    devtool : 'cheap-module-eval-source-map'
    //devServer 配置在webpack.dev.server.js 中
};