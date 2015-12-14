### 前后端分离下的前后端交互路径问题


站点的地址有以下几种情况
```
http://www.example.com
http://www.example.com/site
http://www.example.com/site/subsite
```

api地址会有以下几种情况
```
http://www.example.com/api
http://www.example.com/site/api
http://www.example.com/site/subsiteApi
```

上面地址和api地址不是一一对应，而是笛卡尔积式的组合，那么就会出现 3*3种方式的组合，因此在开发的时候就必须考虑到这种情况的发生。而网站部署的basePath和api部署的basePath，前端是无法获知的，必须通过后台传输给前台。因此在开发的时候不推荐使用相对路径，而是在主页面上定义两个属性，即basePath和 apiBasePath ,前者表示网站的basePath，后者表示apiBasePath，而且后者可能还不止一个。


baePath 如下值
```
http://www.example.com      
basePath = '/'

http://www.example.com/site
basePath = '/site'

http://www.example.com/site/subsite
basePath = '/site/subsite'
```

apiBasePath 如下值
```
http://www.example.com/api
apiBasePath = '/api'

http://www.example.com/site/api
apiBasePath = '/site/api'

http://www.example.com/site/subsiteApi
apiBasePath = '/site/api'
```


比如一个api的path为*/users/get*，表示获取用户信息，那么在请求这个api的时候，我们需要按照如下方式构建请求地址，在index.html中，定义好站点的basePath和apiBasePath。
```html
//index.html
<head>
    <script>
        //站点部署地址 http://www.example.com/site
        //api部署地址  http://www.example.com/siteApi
        var app = {
            basePath : '/site',
            apiBasePath : '/siteApi'
        }
    </script>
</head>
<body></body>
```

```
//index.js
var url = app.apiBasePath + '/users/get'
$.ajax({url : url })
```