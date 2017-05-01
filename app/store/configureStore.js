/**
 * 创建store，并增加中间件
 */
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

import promiseMiddleware from '../fetch/promiseMiddleware'

export default function configureStore(initialState, history) {

    let middleware = [thunkMiddleware, promiseMiddleware];
    // 不同环境下构造不同的 store构成函数
    let finalCreateStore;

    // 触发 redux-devtools
    finalCreateStore = window.devToolsExtension ? 
        compose(applyMiddleware(...middleware), window.devToolsExtension()) :
        compose(applyMiddleware(...middleware))
    // 创建 store，第二个参数是可选的, 用于设置 state 初始状态
    const store = finalCreateStore(createStore)(rootReducer, initialState)

    return store
}