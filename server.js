var localIp = require('quick-local-ip');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var opn = require('opn');
var ip = localIp.getLocalIP4();
var port = 9000;

if (typeof config.entry === 'string') {
  config.entry = ["webpack-dev-server/client?http://"+ip+":"+port, "webpack/hot/dev-server" ,config.entry];
}else if(typeof config.entry === 'object'){
  for(var k in config.entry){
    var main = config.entry[k]
    config.entry[k] = ["webpack-dev-server/client?http://"+ip+":"+port, "webpack/hot/dev-server"].concat(main)
  }
}

// console.log('config.entry',config.entry)
new WebpackDevServer(webpack(config), {
  contentBase: path.resolve(__dirname, './src'),
  hot: true,
  //设置webpack-dev-server启动的时候，bundles的输出的路径，打包的时候这个publicPath没有作用
  // publicPath: "/bundles/",
  historyApiFallback: true
  // proxy : {
  //   '/api/*' : {
  //     target : 'http://127.0.0.1:3000'//  target http://127.0.0.1:3000/api/*
  //   }
  // }
}).listen(port, ip, function (err) {
  if (err) {
    console.log(err); //eslint-disable-line no-console
  }else{
  	opn('http://'+ ip + ':' + port);
  	console.log('Listening at '+ip+':' + port); //eslint-disable-line no-console
  }

});
