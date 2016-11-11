import { combineReducers } from 'redux'

import globalVal from './globalVal'
import baseInfo from './baseInfo'
import card from './card'
import confirm from './confirm'
import detail from './detail'

// 聚合reducer
const rootReducer = combineReducers({
	card,
	globalVal,
	baseInfo,
	confirm,
	detail
})

export default rootReducer