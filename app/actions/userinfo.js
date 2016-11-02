import * as actionTypes from '../constants/types'
import {
	get
} from '../fetch/request'

//获取广告数据列表，promise形式
export const getUserInfo = () => {
	return {
		type: actionTypes.GET_USERINFO,
		promise: get('/api/user')
	}
}

// 更新address信息，自动触发store
export const addressUpdate = data => {
	return {
		type: actionTypes.ADRESS_UPDATE,
		data
	}
}

/**
 * 自定义dispath形式，自主触发store更新
 * @return dispatch 触发store
 */
// export function addressUpdate(data) {
//     // 获取state属性/state下面的值，要用dispatch主动触发
//     return (dispatch, getState) => {
//         // action执行的时候，会传递dispatch getState参数，属于store方法
//         console.log(getState())
//         return dispatch({
//             type: actionTypes.ADRESS_UPDATE,
//             lat: data.lat,
//             lng: data.lng
//         })
//     }
// }