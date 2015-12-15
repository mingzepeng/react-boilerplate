## React Boilerplate
脚手架适合单页应用，


### 开始

1. clone this repo
2. cd into folder
3. `npm install`
4. `npm start` 启动开发服务器
5. auto open http://yourIP:9000 (not localhost or 127.0.0.1 , for mobile test)


### 启动restful测试数据服务器
`npm start mock` 启动测试数据服务器，数据配置在mock文件夹里，更详细的配置请参考[json-server文档](https://github.com/typicode/json-server)

### 代码规范检查
```
npm run lint
```
采用eslint对js代码进行检查，配置文件为.eslintrc.json ，可以参考官方文档[eslint](http://eslint.org/)

### 执行单元测试
```
npm run test
```
采用karma和jasmine的组合进行单元测试，karma是一个针对web前端进行单元测试的自动化环境，jasmine是单元测试框架。单元测试的代码支持es6，请在test文件夹中新建测试文件。
可以参考官方文档[karma](http://karma-runner.github.io/) [jasmine](http://jasmine.github.io/)




### 设置代理
`npm start`启动的是webpack-dev-server服务器并进行开发，如果需要请求api进行开发测试，那么就会存在跨域的问题，因此需要设置webpack-dev-server的代理服务器，将webpack-dev-server服务器的一个path映射到api服务器。请更改server.js文件中的new WebpackDevServer 第二个参数的proxy属性，示例如下：
```
// `/api/*` 会映射 http://127.0.0.1:3000/api/* ，如 `/api/todos` 映射 http://127.0.0.1:3000/api/todos
new WebpackDevServer(webpack(config), {
  proxy : {
    '/api/*' : {
      target : 'http://127.0.0.1:3000'
    }
  }
  
})
```
已经内置集成了一个restful测试数据服务器json-server，通过`npm run mock`启动，并从webpack-dev-server指向该服务，通过 `http://yourIP:9000/api` 可以访问，[点击查看json-server文档](https://github.com/typicode/json-server)

关于apiPath的另外一些tips，可以查看 [前后端分离下的前后端交互路径问题](https://github.com/mingzepeng/react-boilerplate/blob/master/doc/apiPath.md)


### 开发注意事项
~~目前对于在js中引入大于30KB的图片，即通过以下代码引入的方式是不支持的，原因是和后台的整合过程中，路径问题还没有一个很好的解决方案，因此超过30KB的图片在css文件中引入。~~

已经通过设置publicPath解决这个问题，但仍然需要一些特殊的处理，请先阅读[前后端分离下的前后端交互路径问题](https://github.com/mingzepeng/react-boilerplate/blob/master/doc/apiPath.md)。采用这种方式的前提是，发布的静态资源文件已经确定是会放在后台项目的某一个固定的文件夹，默认是存放在后台项目根目录下面的bundles文件夹。如果需要更改，那么请更改webpack.config.js的output.publicPath属性。因为webpack在执行编译的时候，`url = require('large-img.png')` 返回的url值，实际是 '[publicPath]large-img.png', 此配置publicPath的默认值是/bundles/，所以最终结果会是 `/bundles/large-img.png`，和 `app.basePath` 进行连接后，即可得到在服务端的正确路径。

```
var url = require('large-img.png')
var img = new Image
img.src = app.basePath + url

```
不过不建议大图（超过30KB）用这种方式链接进来，推荐用css。

### 编译打包
会在dist文件中输出合并后的js，css，图片，字体等静态资源文件。
```
npm run deploy
```

### 打包完成之后与后台整合
在dist命令完成之后，会在dist文件夹中生成打包的文件，包括 index,js,css 以及图片字体等文件，请按照index.html的模板方式引入，head里面引入css文件，body底部引入js文件。

项目默认打包后的静态资源文件都放在后台项目的bundles文件夹中（index.html可以不需要添加），如果需要更改，请更改webpack.config.js文件中的output.publicPath值，改为你实际存放的项目的文件夹名称，比如 `/assets/`。
