import * as actionTypes from '../constants/types'
import { get, post } from '../fetch/request'

//获取首页全部卡片信息（包括我的权益与在售卡片），promise形式
export function getHomeCard(params) {
    // 获取state属性/state下面的值，action通过dispatch触发reduce
    return (dispatch, getState) => {
        // action执行的时候，会传递dispatch getState参数，属于store方法
        let globalParams = getState().globalVal
        params = {
            ...globalParams,
            ...params
        }
        return dispatch({
            type: actionTypes.GET_HOMECARD,
            promise: get('/wmall/privilege/center', params)
        })
    }
}
//获取提单页 权益卡详细信息，需要传入 privilege_no
export function getConfirmInfo(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    return (dispatch, getState) => {
        // action执行的时候，会传递dispatch getState参数，属于store方法
        let globalParams = getState().globalVal
        params = {
            ...globalParams,
            ...params
        }
        return dispatch({
            type: actionTypes.GET_CONFIRMINFO,
            promise: get('/wmall/privilege/view', params)
        })
    }
}

//获取详情页 权益卡使用详情，需要传入 page(页码) limit(每页限制数量)
export function getDiscountDetail(params) {
    // 获取state属性/state下面的值，要用dispatch主动触发
    return (dispatch, getState) => {
        // action执行的时候，会传递dispatch getState参数，属于store方法
        let globalParams = getState().globalVal
        params = {
            ...globalParams,
            ...params
        }
        return dispatch({
            type: actionTypes.GET_DISCOUNTDETAIL,
            promise: get('/wmall/privilege/promotiondetail', params)
        })
    }
}
