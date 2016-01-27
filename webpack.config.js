var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.join(__dirname,'./src/scripts'),
	entry: {
		main : path.join(__dirname,"./src/scripts/main.js")
	},
	output: {
		path: path.join(__dirname,'dist'),
		// publicPath: "/bundles/",
		filename: "[name].[hash].bundle.js",
		chunkFilename: "[id].[hash].chunk.js"
	},
	module: {
		loaders: [
			{ test : /\.less$/, loader : ExtractTextPlugin.extract('style-loader','css-loader!autoprefixer-loader!less-loader',{publicPath : ''}) },
			{ test : /\.css$/,  loader : ExtractTextPlugin.extract('style-loader','css-loader',{publicPath : ''}) },
			// { test: /\.jsx?$/, loader : 'uglify-loader!babel-loader?presets[]=react,presets[]=es2015' , exclude: /(node_modules|bower_components)/},
			{ test : /\.jsx?$/ ,loader : 'babel-loader' , query:{ presets : ['es2015','react'] } , exclude: /(node_modules|bower_components)/},
			{ test : /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
			{ test : /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : "file-loader"}
		]
	},

	resolve : {
		root : path.resolve('./src')
	},
	plugins : [ 
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$super', '$', 'exports', 'require']
			}
		}),
		new webpack.DefinePlugin({
			"process.env" : {
				NODE_ENV : JSON.stringify("production")
			}
		}),
		new webpack.optimize.CommonsChunkPlugin("commons", "[name].[hash].bundle.js"),
		new ExtractTextPlugin("[name].[hash].bundle.css",{allChunks: true}),
		new HtmlWebpackPlugin({
			template : 'src/index.html',
			inject: true
		})
	]

};