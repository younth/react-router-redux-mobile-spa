import { combineReducers } from 'redux'

import demo from './demo'
import userinfo from './userinfo'
import globalVal from './globalVal'

// 聚合reducer
const rootReducer = combineReducers({
    demo,
    userinfo,
    globalVal
})

export default rootReducer
