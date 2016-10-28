// 入口文件
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import configureStore from './store/configureStore'

// 性能测试
import * as Perf from 'react-addons-perf'
window.Perf = Perf

// 创建 Redux 的 store 对象
const store = configureStore()

// 获取 route 配置
import RouteMap from './router/routeMap'

import '../static/common.less'

render(
    <Provider store={store}>
        <RouteMap history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)

