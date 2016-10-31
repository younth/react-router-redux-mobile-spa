/**
 * 请求封装：get post jsonp
 * 利用 fetch API 低版本浏览器通过es6-promise
 */
import 'whatwg-fetch'
import 'es6-promise'
// import fetchJsonp from 'fetch-jsonp'


// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    let result = '';
    for (let item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }

    if (result) {
        result = result.slice(1);
    }

    return result;
}

export function get(url) {
  var result = fetch(url, {
      credentials: 'include',// 请求默认带 cookie
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  });

  return result;
}

// 普通post请求
export function post(url, paramsObj) {
    var result = fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'// 默认表单提交
        },
        body: obj2params(paramsObj)
    });

    return result;
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