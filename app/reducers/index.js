import { combineReducers } from 'redux'

import demo from './demo'
import userinfo from './userinfo'

// 聚合reducer
const rootReducer = combineReducers({
    demo,
    userinfo
})

export default rootReducer
