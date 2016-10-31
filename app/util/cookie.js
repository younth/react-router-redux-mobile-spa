/**
 * 本地储存封装
 * author: wangyang@iwaimai.baidu.com
 */

// 操作 cookie 

import cookie from 'react-cookie'
import { CookieDomain } from '../config'

let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: '' }
}

export default {
    saveCookie(name, value) {
        cookie.save(name, value, cookieConfig)
    },

    getCookie(name) {
        return cookie.load(name)
    },

    removeCookie(name) {
        cookie.remove(name, cookieConfig)
    }
}
