/**
 * 发送统计方法
 * @param {Number} code 统计code
 * @param {Object} opts
 */
window.addStat = function(code, opts) {

    if (!code) {
        return;
    }

    // 组装参数
    opts = opts || {};

    opts.module = 'waimai';
    opts.third_party = ''; // utm来源
    opts.resid = 31; // 迁移SAK平台，添加webapp标识
    opts.da_ver = '2.1.0';

    var platform = parsePlatform();

    if (platform) {
        platform.resid && (opts.resid = platform.resid);
        platform.third_party && (opts.third_party = platform.third_party);
    }

    var extq = jsonToUrl(opts);

    // 内部函数定义 - 发送统计请求
    var sendStat = function(q) {
        // 获取统计url
        var statPath = '//log.waimai.baidu.com/static/transparent.gif?newmap=1';
        var img = new Image();
        if (!q) {
            return;
        }
        addStat._sending = true;
        setTimeout(function() {
            addStat._sending = false;
            img.src = statPath + q.src;
            reqNext();
        }, 50);
    };

    // 内部函数定义 - 发送队列中下一个统计请求
    var reqNext = function() {
        var nq = addStat._reqQueue.shift();
        if (nq) {
            sendStat(nq);
        }
    };

    var ts = Date.now();

    var _sendStat = {
        src: "&t=" + ts + "&code=" + code + "&" + extq,
        code: code
    };

    if (addStat._sending) {
        // 将本次请求加入队列
        addStat._reqQueue.push(_sendStat);
    } else {
        // 直接发送请求
        sendStat(_sendStat);
    }
};
// 初始化请求队列
addStat._reqQueue = [];

var jsonToUrl = function(json) {
    if (!json) {
        return '';
    }
    var arr = [],
        key;
    for (key in json) {
        if (json.hasOwnProperty(key)) {
            arr.push(key + '=' + encodeURIComponent(json[key]));
        }
    }
    return arr.join('&');
};

/**
 * 解析运行平台相关属性
 * 暂且只针对百度框做了兼容处理
 */
var parsePlatform = function() {
    var search = location.search;
    var params = search.split('&');
    var rst = {};
    for (var i = 0, len = params.length; i < len; i++) {
        var param = params[i].split('=');
        rst[param[0]] = param[1];
    }
    //百度框组件中传入了from和resid的标示
    if (rst['from'] && rst['resid']) {
        var froms = rst['from'].split('-'),
            resid = rst['resid'],
            tp = froms[0],
            os = froms[1];
        return { third_party: tp, resid: resid, os: os };
    } else {
        return false;
    }
};
