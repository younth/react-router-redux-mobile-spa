// polify
import 'whatwg-fetch'
import 'es6-promise'

// import引入方式
import fetchJsonp from 'fetch-jsonp'

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}

// 发送 post 请求
export function post(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });

    return result;
}


// 发送 jsonp 请求
export function getjsonp(url, data) {
    var js = document.createElement('script');
    data = obj2params(data);

    if (data) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + data;
    }

    var HEAD = getHead();

    js.type = 'text/javascript';
    js.src = url;
    var done = true,
        timer;
    var clear = function() {
        timer && clearTimeout(timer);
        js.onload = js.onreadystatechange = js.onerror = null;
        js = null;
    };

    var cb = function(evt, isTimeout) {
        if (js && (!js.readyState || /loaded|complete/.test(js.readyState))) {
            clear();
            done = false;
        }
    };
    var errorCallback = function(evt) {
        clear();
        done = false;
    };

    timer = setTimeout(function() {
        clear();
        done = false;
    }, 20000);

    js.onload = js.onreadystatechange = js.onerror = cb;
    js.onerror = errorCallback;
    HEAD.appendChild(js);

}

// jsonp保持与fetch一致的API
export function getJsonp (url, data) {
    data = obj2params(data);
    if (data) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + data;
    }
    let result = fetchJsonp(url, {
        // jsonpCallback: 'jsoncallback',
        timeout: 3000
    });
    return result;
}

function getHead() {
    return document.head || document.getElementsByTagName('head')[0] || document.documentElement;
}
