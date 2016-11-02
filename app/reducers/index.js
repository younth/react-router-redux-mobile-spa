import {
	combineReducers
} from 'redux'

import demo from './demo'
import userinfo from './userinfo'
import globalVal from './globalVal'
import card from './card'

// 聚合reducer
const rootReducer = combineReducers({
	demo,
	userinfo,
	card,
	globalVal
})

export default rootReducer