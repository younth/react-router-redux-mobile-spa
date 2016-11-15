/**
 * @fileOverview 统计代码
 */
'use strict';
var cookie = require("node_h5:static/scripts/common/Cookie.js");
/*
    urlUtil = require("core:static/js/url-util.js"),
    pagemgr = require("core:widget/pagemgr/pagemgr.js"),
    pbstat = require('core:widget/stat/pbstat.js');
*/
var STAT_PV = 20138;

var isFlowCtrl = function() {
    var flowCtrl = cookie.get("flow_ctrl") || false;
    if (flowCtrl === false) {
        return false;
    } else {
        return true;
    }
}();

/**
 * webapp简版点击统计增加cookie
 * @param {number} code 统计的code
 * @param {object} opts 统计的可选参数
 * @param {function} callback 回调
 */
var addCookieStat = function(code, opts, callback) {
    var options = {
        expires: 10000,
        path: '/'
    }, //设置cookie的超时时间是10秒钟
        _callback = callback || function() {},
        _opts = opts || {};

    // 单页模式下, 统一发送code空图统计, shengxuanwei
    addStat(code, _opts);

    _opts = $.extend({
        'module': window._APP_HASH.module,
        'action': window._APP_HASH.action,
        'page': window._APP_HASH.page,
        'third_party': window._APP_HASH.third_party,
        'resid': 31,     // 迁移SAK平台，添加webapp标识
        'da_ver': '2.1.0'
    }, _opts);
    if (code) {
        _opts.code = code;
        _opts.trackCode = code;
    }

    //设置code的cookie值
    cookie.set('H_MAP_CLK', JSON.stringify(_opts), options);

    _callback();
};
var _addCookieStat = function(log) {
    if (typeof log === 'object' && log.code) {
        addCookieStat(log.code, log);
        return;
    }

    if (typeof log === 'string') {
        try {
            var info = log.replace(/[{}"']/g, '').split(',');
            var result = {};
            for (var i = 0; i < info.length; i++) {
                var item = info[i].split(':');
                result[$.trim(item[0])] = $.trim(item[1]);
            }
            addCookieStat(result.code, result);
        } catch (e) {}
    } else {
        if (cookie.get('H_MAP_CLK') == null) {
            addCookieStat('', {});
        }
    }
};
/**
 * 点击统计的初始化
 * 通过监听页面中的body点击事件
 */
var initClickStat = function() {
    if (listener) {
        listener.on('common.page', 'switchstart', function(event, eventOption) {
            var log,
                target = eventOption.target;
            if (target) {
                log = $(target).data('log');
                _addCookieStat(log);
            }

            var da_src = $(target).data('da-src');
            if (da_src) {
                pbstat.addStat(da_src);
            }
        });
    }

    $(document).on('click', 'a,[data-href]', function() {
        var log = $(this).data('log');
        if (log) {
        _addCookieStat(log);
        }

        var da_src = $(this).data('da-src');
        if (da_src) {
            pbstat.addStat(da_src);
        }
    }, true);
};
// 获取统计url
var getStatUrl = (function() {
    // var statPath = "//map.baidu.com/mobile/img/t.gif?newmap=1";
    var statPath = [
        '//map.baidu.com/mobile/img/t.gif?newmap=1',
        '//log.waimai.baidu.com/static/transparent.gif?newmap=1'
    ];
    //客户端/不统计标志 则不进行统计
    if (/(&|\?)(kehuduan=1|nostat=1)(&|$|#)/.test(location.href)) {
        statPath = "//map.baidu.com/mobile/img/nostat.gif?newmap=1";
    }

    return function() {
        return statPath;
    };

})();

var $img = $("#statImg");

/**
 * 发送统计方法
 * @param {Number} code 统计code
 * @param {Object} opts
 */
var addStat = function(code, opts, callback) {
    var _callback = callback || function() {};

    if (!code) {
        return;
    }

    // 组装参数
    opts = opts || {};

    if (isFlowCtrl) {
        opts.flow_ctrl = true;
    }

    opts.module = 'waimai';
    opts.third_party = cookie.get("WMREFER") || '';//cookie里如果有utm来源，带到sak中
    opts.resid = 31;    // 迁移SAK平台，添加webapp标识
    opts.da_ver = '2.1.0';

    var platform = parsePlatform();

    if (platform) { 
        platform.resid && (opts.resid = platform.resid);
        platform.third_party && (opts.third_party = platform.third_party);
    }

    var extq = jsonToUrl(opts);

    // 内部函数定义 - 发送统计请求
    var sendStat = function(q) {
        //console.log(q);
        var statPath = getStatUrl();
        var img =new Image(),
            i = 0,
            len = statPath.length;
        if (!q) {
            return;
        }
        addStat._sending = true;
        setTimeout(function() {
            addStat._sending = false;
            for( ; i<len; i++){
                img.src = statPath[i] + q.src;
            }
            // img.src = statPath + q.src;
            $(document).trigger('addStat', q.code);
            reqNext();
        }, 50);

        _callback();

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

// 发送pv统计函数
// 使用说明：pv统计的定义和说明可以查看 http://wiki.babel.baidu.com/twiki/bin/view/Com/Main/WebappPV统计文档
// 另外请参看 controller的 pageViewStat 的用法。
// 对于页面展示类的属性统计可以通过pv统计来完成
// 如：place结果列表页的统计，可以通过 在place/list的controller中设置 pageViewStat 为一个function
// return 所需的统计参数 如 {is_place:1}, 在每次展示页面的时候 会将此统计发送，在log平台中可以通过 page_id + is_place 参数来统计
// by caodongqing 2013-2-27
var sendPvStat = function() {
    var code = STAT_PV, //pv统计code
        refPageParam = {},
        locked = false,
        lockedTime = 200,
        staticSended = false,
        user_step = [];

    /**
     * 发送pv统计
     */
    var _sendpv = function(opts) {
        if (locked) {
            return;
        }
        var param = opts || {},
            // pid这个参数是重构前用的统计，基于配置的hash表来读取page的唯一标识
            // 为了保证原有统计正常运行保留这个参数
            pid = opts.pid || "unkown",
            // pageId 是目前推荐使用的页面唯一标识，通过 module+action+pagename来确定当前的页面展示
            // 用这种方法的好处是 新开发页面不需要重新开发pv统计
            pageId = opts.page_id || "unkown",
            pageIdParam = {
                pid: pid,
                page_id: pageId
            },
            // 记录上一个操作路劲
            ref_param = refPageParam;

        // 保存到用户操作路径
        user_step.push(pageIdParam);
        // 获取操作路劲信息
        // param.step_record = user_step.join("|");
        // 记录用户步长
        param.step_len = user_step.length;
        param.time = Date.now();

        param = $.extend({},
            param,
            pageIdParam,
            ref_param);

        addStat(code, param);
        // 用来保存上一个页面
        refPageParam = {
            ref_pid: pageIdParam.pid,
            ref_page_id: pageIdParam.page_id
        };
        // 落地页是首页静态页的时候，如果快速点路线，可能导致首页和路线页pv发送特别近
        // 记录状态，发送PV统计
        if (!window.checkLandingPage() || staticSended) {
            lockPvSend();
        }
        staticSended = true;
    };

    // 锁住pv统计发送
    // 排除因为系统原因连续发送
    var lockPvSend = function() {
        locked = true;
        var _lockTimer = setTimeout(function() {
            locked = false;
            clearTimeout(_lockTimer);
        }, lockedTime);
    };

    return _sendpv;
}();

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
 * 
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
        return {third_party: tp, resid: resid, os: os};
    } else {
        return false;
    }
}
/**
 * @module core:widget/stat
 */
module.exports = {
    addStat: addStat,
    sendPvStat: sendPvStat,
    initClickStat: initClickStat,
    addCookieStat: addCookieStat
};
