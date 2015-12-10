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
        path: path.join(__dirname,'dist'),
        // publicPath: "/scripts/",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/,  loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader') },
            { test : /\.jsx?$/ ,loader : 'babel?presets[]=react,presets[]=es2015' , exclude: /(node_modules|bower_components)/},
            { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
            { test: /\.(ttf|eot|svg|woff(2)?)((\?v=)?[?#a-z0-9]+)?$/, loader : "file-loader"}
        ]
    },
    postcss: function () {
        return [autoprefixer, precss,cssgrace,filterGradient];
    },
    plugins : [ 
        new webpack.DefinePlugin({
            __DEBUG__: false //true/false
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
        new ExtractTextPlugin("[name].css",{allChunks: true}),
        new HtmlWebpackPlugin({
            template : 'src/index.html',
            inject: true
        })
    ]

    // devServer : {
    //     proxy : {
    //         '/service/*' : {
    //             target : 'http://10.45.11.102'//http://localhost:3000/api2/homePage/getBannerList
    //         },
    //         '/api/*' : {
    //             target : 'http://127.0.0.1:3000'//http://localhost:3000/api2/homePage/getBannerList
    //         }
    //     }
    // }
};