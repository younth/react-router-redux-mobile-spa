// 注意这里面的.js，不是一般的.js 文件，而是相当于 express 的 route.

var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');

var host = 'http://10.19.161.92:8059';

// 通过nodejs来抓取线上的结果。这样就完成了动态获取线上数据的功能
module.exports = function(request, response, next) {

    // // 最简单的测试
    // response.writeHead(200, {
    //     'Content-type': 'text/html'
    // });
    // response.end('Date.now() ' + Date.now());

    // 获取 GET/POST
    var method = request.method;

    // 获取 post 时的参数
    var postParams = request.body;

    // 解析参数
    postParams = querystring.stringify(postParams)

    // 获取匹配到的
    var originalUrl = request.originalUrl;

    // API 符合 /wmall... 格式
    if (/^\/wmall.*$/.test(originalUrl) === false) {

        // API不是 /news?tn=... 格式，给出提示
        response.writeHead(200, {
            'Content-type': 'text/html'
        });
        response.end('url format is not /wmall....');
        return;
    }

    var apiUrl = host + originalUrl;
    var parsedUrl = url.parse(apiUrl, true);

    var options = {
        host: parsedUrl.hostname,
        port: parsedUrl.port || 80,
        path: parsedUrl.pathname,
        method: method,
        headers: {}
    };
    // 携带cookie
    options.headers.cookie = request.headers.cookie;

    if (parsedUrl.search) {
        options.path += parsedUrl.search;
    }

    if (method.toLowerCase() === 'post') {
        // 增加 header参数
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        options.headers['Content-Length'] = postParams.length;
    }

    // 发送线上的数据请求,此时请求没有携带cookie
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        var str = '';
        res.on('data', function (d) {
            // data 响应事件中先一步一步拼接数据
            str += d;
        });
        res.on('end', function () {
            // end 响应事件中，返回数据
            var data;
            try {
                data = JSON.parse(str);
            } catch (ex) {
                data = str;
            }

            response.json(data);
        });
        res.on('error',function (err) {
            // error 处理
            response.end('reponse error: ' + err.message);
        })
    });
    req.on('error', function (err) {
        // error 处理
        response.end('request error' + err.message);
    });
    // 写入post参数
    req.write(postParams);
    // 请求结束，告诉 response 可以返回了
    req.end();
};