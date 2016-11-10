// // 注意这里面的.js，不是一般的.js 文件，而是相当于 express 的 route.

// var http = require('http');
// var url = require('url');
// var util = require('util');
// var querystring = require('querystring');

// // 通过nodejs来抓取线上的结果。这样就完成了动态获取线上数据的功能

// module.exports = function(request, response, next) {

//     // // 最简单的测试
//     // response.writeHead(200, {
//     //     'Content-type': 'text/html'
//     // });
//     // response.end('Date.now() ' + Date.now());

//     // 获取 GET/POST
//     var method = request.method;

//     // 获取 post 时的参数
//     var postParams = request.body;
//     // 解析参数
//     postParams = querystring.stringify(postParams)

//     // 获取匹配到的
//     var originalUrl = request.originalUrl;
//     if (/^\/news\?.*tn\=[a-zA-Z0-9]+.*/.test(originalUrl) === false) {

//         // API不是 /news?tn=... 格式，给出提示
//         response.writeHead(200, {
//             'Content-type': 'text/html'
//         });
//         response.end('url format is not /news?tn=....');
//         return;
//     }

//     // 模拟passport的返回结果
//     var passportData = {};
//     passportData.data = {};
//     var cookieArr = [];
//     if (originalUrl.indexOf('news?tn=bdapipassport') >= 0 && request.headers.cookie.indexOf('BDUSS') > 0) {
//         cookieArr = request.headers.cookie.split(';')
//         cookieArr.forEach(function(item, index) {
//             var itemArr = item.split('=');
//             passportData.data[itemArr[0].trim()] = itemArr[1].trim();
//         });

//         passportData.data.displayname = '张国荣';
//         passportData.data.image = 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2877253795,3140903876&fm=58';
//         passportData.data.uname = '张国荣';

//         passportData.errno = 0;

//         response.json(passportData);
//         return;
//     }

//     // 模拟 bdcmspage 广告数据
//     var bdcmspage = {};
//     bdcmspage.top_ad = {}
//     if (originalUrl.indexOf('news?tn=bdcmspage') >= 0) {
//         bdcmspage.top_ad.url = 'https://qianbao.baidu.com/hd/huafei?channel_no=CHF0000054';
//         bdcmspage.top_ad.imageurl = 'http://news.baidu.com/z/resource/r/image/2016-07-13/859f58071c681de0f43226ff0ea0fb20.jpg';
//         bdcmspage.top_ad.enable = '1';

//         response.json(bdcmspage);
//         return;
//     }

//     // API 符合 /news?tn=... 格式

//     var apiUrl = 'http://m.news.baidu.com' + originalUrl;
//     var parsedUrl = url.parse(apiUrl, true);

//     var options = {
//         host: parsedUrl.hostname,
//         port: parsedUrl.port || 80,
//         path: parsedUrl.pathname,
//         method: method
//     };

//     if (parsedUrl.search) {
//         options.path += parsedUrl.search;
//     }

//     if (method.toLowerCase() === 'post') {
//         options.headers = {
//             "Content-Type": 'application/x-www-form-urlencoded',
//             "Content-Length": postParams.length
//         };
//     }

//     // 发送线上的数据请求
//     var req = http.request(options, function (res) {
//         res.setEncoding('utf8');
//         var str = '';
//         res.on('data', function (d) {
//             // data 响应事件中先一步一步拼接数据
//             str += d;
//         });
//         res.on('end', function () {
//             // end 响应事件中，返回数据
//             var data;
//             try {
//                 data = JSON.parse(str);
//             } catch (ex) {
//                 data = str;
//             }

//             response.json(data);
//         });
//         res.on('error',function (err) {
//             // error 处理
//             response.end('reponse error: ' + err.message);
//         })
//     });
//     req.on('error', function (err) {
//         // error 处理
//         response.end('request error' + err.message);
//     });
//     // 写入post参数
//     req.write(postParams);
//     // 请求结束，告诉 response 可以返回了
//     req.end();
// };