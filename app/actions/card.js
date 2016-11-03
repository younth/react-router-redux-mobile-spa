import * as actionTypes from '../constants/types'
import {
	get
} from '../fetch/request'

//获取首页全部卡片信息（包括我的特权与在售卡片），promise形式
export const getHomeCard = () => {
	return {
		type: actionTypes.GET_HOMECARD,
		promise: get('/wmall/center?display=json')
	}
}
//获取提单页特权卡详细信息，promise形式
export const getConfirmInfo = () => {
	return {
		type: actionTypes.GET_CONFIRMINFO,
		promise: get('/wmall/view?display=json') // 还需要传入特权卡ID
	}
}