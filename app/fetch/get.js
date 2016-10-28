// 封装get请求
import 'whatwg-fetch'
import 'es6-promise'

export function get(url) {
  var result = fetch(url, {
      credentials: 'include',// 请求默认带 cookie
      headers: {
          'Accept': 'application/json, text/plain, */*'
      }
  });

  return result;
}