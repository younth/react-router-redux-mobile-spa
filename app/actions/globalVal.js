import * as actionTypes from '../constants/types'
import {
	get
} from '../fetch/request'

// 更新address信息，自动触发store
export const addressUpdate = data => {
	return {
		type: actionTypes.ADRESS_UPDATE,
		data
	}
}