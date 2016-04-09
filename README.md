项目新地址 [react-less-boilerplate](https://github.com/mingzepeng/react-less-boilerplate),请前往这个地址下载开发脚手架，此项目已被遗弃不更新
 
## React Boilerplate
这个脚手架项目专门为webpack+react开发单页应用定制，支持ie9以及其他现代浏览器，内置对React,Promise和fetch的支持，并采用postcss处理css。



### 开始

1. clone this repo
2. cd into folder
3. `npm install`
4. `npm start` 启动开发服务器
5. auto open http://yourIP:9000 (not localhost or 127.0.0.1 , for mobile test)

### 内置部件
webpack集成了对react jsx语法和es2015的支持，由babel实现。关于babel对es2015的支持情况，可以查看babel的相关文档[babel](http://babeljs.io/)

采用postcss对css进行后处理，集成了postcss的以下几个插件。关于postcss的用法，可以查看官方文档[postcss](https://github.com/postcss/postcss)，更多插件访问[postcss.parts](http://postcss.parts/)

1. autoprefixer 自动处理css前缀 [地址](https://github.com/postcss/autoprefixer)
2. precss  支持部分sass的写法特性,包括variables, mixins, conditionals,Loops,Extends,Imports等等 [地址](https://github.com/jonathantneal/precss)
3. ~~cssgrace 自动生成兼容旧IE浏览器的css代码，国人开发，适合国情 [地址](https://github.com/cssdream/cssgrace)~~
4. filterGradient 增加对旧版ie的background gradient支持 [地址](https://github.com/yuezk/postcss-filter-gradient)
5. postcss-import ，支持import node_modules中的包
6. postcss-url 对url()的路径进行转换 

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


### 图片和字体引入
目前支持的图片引入为小于等于 30kb 的文件，会作为dataUrl编译在js或者css文件中，url返回dataUrl，超过该大小，会返回图片的url，css同理。
```javascript
var url = require('img.png')
var img = new Image
img.src = url
```

支持css引入字体文件，编译的时候会自动处理路径。

### 编译打包
会在dist文件中输出合并后的js，css，图片，字体等静态资源文件。
```
npm run deploy
```

### 打包完成之后与后台整合
在dist命令完成之后，会在dist文件夹中生成打包的文件，包括 index,js,css 以及图片字体等文件，请按照index.html的模板方式引入，head里面引入css文件，body底部引入js文件。

建议项目默认打包后的静态资源文件都放在后台项目的bundles文件夹中（index.html可以不需要添加）
