import { combineReducers } from 'redux'

import demo from './demo'
import userinfo from './userinfo'
import globalVal from './globalVal'
import card from './card'
import confirm from './confirm'
import detail from './detail'

// 聚合reducer
const rootReducer = combineReducers({
	demo,
	userinfo,
	card,
	globalVal,
	confirm,
	detail
})

export default rootReducer