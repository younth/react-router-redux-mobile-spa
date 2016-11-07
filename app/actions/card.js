import * as actionTypes from '../constants/types'
import {
	get
} from '../fetch/request'

//获取首页全部卡片信息（包括我的权益与在售卡片），promise形式
export const getHomeCard = () => {
	return {
		type: actionTypes.GET_HOMECARD,
		promise: get('/wmall/center?display=json')
	}
}
//获取提单页权益卡详细信息，promise形式
export const getConfirmInfo = () => {
	return {
		type: actionTypes.GET_CONFIRMINFO,
		promise: get('/wmall/view?display=json') // 还需要传入权益卡ID
	}
}
//获取权益卡使用详情，promise形式
export const getDiscountDetail = () => {
	return {
		type: actionTypes.GET_DISCOUNTDETAIL,
		promise: get('/wmall/promotiondetail?display=json') // TODO
	}
}