/**
 * promise中间件, 让action返回promise,把action与reducer联系起来
 * author: wangyang@iwaimai.baidu.com
 */
require('es6-promise').polyfill()

export default function promiseMiddleware() {
    return next => action => {
        // rest是action对象剩下的变量集合
        const { promise, type, ...rest } = action
        // 非promise直接返回
        if (!promise) return next(action)
        // promise对下各种状态类型
        const SUCCESS = type + '_SUCCESS'
        const REQUEST = type + '_REQUEST'
        const FAILURE = type + '_FAILURE'
        // 开始请求
        next({...rest, type: REQUEST })

        return promise
            .then(res => res.json())
            .then(json => {
                // success 结果包裹在json中
                if (Number(json.error_no) === 0) {
                    next({...rest, json, type: SUCCESS })
                } else {
                    // error_no 不等于当失败处理
                    next({...rest, json, type: FAILURE })
                }
                return true
            })
            .then(undefined, error => {
                // error
                let json = {
                    error_msg: String(error),
                    error_no: 10086
                }
                next({...rest, json, type: FAILURE })
                return false
            })
    }
}