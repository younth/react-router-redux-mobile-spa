import * as actionTypes from '../constants/types'

// 一. 公共接口数据

// 更新address信息，自动触发store
export const addressUpdate = data => {
	return {
		type: actionTypes.ADRESS_UPDATE,
		data
	}
}

// 二. 首页与提单页 提单页成功支付后调到首页 传递状态值
export const savePayResult = data => {
	return {
		type: actionTypes.SAVE_PAYRESULT,
		data
	}
}