var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var precss = require('precss');
// var cssgrace = require('cssgrace');
var filterGradient = require('postcss-filter-gradient');
var atImport = require("postcss-import");
var postcssUrl = require("postcss-url");
var nodeModulesPath = path.join(__dirname,'node_modules')
module.exports = {
	entry: {
		main : path.join(__dirname,"./src/scripts/main.js")
	},
	output: {
		path: path.join(__dirname,'hot'),
		// publicPath: "/bundles/",
		filename: "[name].[hash].bundle.js",
		chunkFilename: "[id].[hash].chunk.js"
	},
	module: {
		loaders: [
			{ test : /\.css$/,  loader : 'style-loader!css-loader!postcss-loader' },
			{ test : /\.jsx?$/, loader : 'react-hot!babel?presets[]=react,presets[]=es2015' , exclude: /(node_modules|bower_components)/},
			// { test : /\.jsx?$/ , loader : 'babel-loader' , query:{ presets : ['es2015','react'] } , exclude: /(node_modules|bower_components)/},
			//如果不超过30000/1024kb,那么就直接采用dataUrl的形式,超过则返回链接,图片会复制到dist目录下
			{ test : /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=30000" },
			{ test : /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/, loader : "file-loader"}
		]
	},

	resolve : {
		root : path.resolve('./src')
		// alias : {
		//     'react' : path.join(nodeModulesPath,'react/dist/react.js'),
		//     'react-dom' :  path.join(nodeModulesPath,'react-dom/dist/react-dom.js')
		// }
	},

	postcss: function () {
		return [atImport({ onImport : function(files){ files.forEach(this.addDependency); }.bind(this) }), 
				postcssUrl ,
				autoprefixer, 
				precss,
				// cssgrace,
				filterGradient];
	},
	plugins : [ 
		new webpack.DefinePlugin({
			"process.env" : {
				NODE_ENV : JSON.stringify("development")
			}
		}),
		new webpack.optimize.CommonsChunkPlugin("commons", "[name].[hash].bundle.js"),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template : 'src/index.html',
			inject: true
			// chunks : ['main']
			// filename: '../index.html',
		})
	],
	debug : true,
	devtool : '#inline-source-map'
	//devServer 配置在webpack.dev.server.js 中
};