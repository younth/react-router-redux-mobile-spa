import * as actionTypes from '../constants/types'

// 一. 公共接口数据

// 更新address信息，自动触发store
export const addressUpdate = data => {
	return {
		type: actionTypes.ADRESS_UPDATE,
		data
	}
}

// 更新设备信息，自动触发store
export const adeviceUpdate = data => {
	return {
		type: actionTypes.DEVICE_UPDATE,
		data
	}
}

// 二. 首页与提单页 权益卡ID传送

// 保存点击的权益卡ID
export const savePrivilegeNo = data => {
	return {
		type: actionTypes.SAVE_PRIVILEGENO,
		data
	}
}