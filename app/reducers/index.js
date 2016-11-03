import { combineReducers } from 'redux'

import demo from './demo'
import userinfo from './userinfo'
import globalVal from './globalVal'
import card from './card'
import confirm from './confirm'

// 聚合reducer
const rootReducer = combineReducers({
	demo,
	userinfo,
	card,
	globalVal,
	confirm
})

export default rootReducer