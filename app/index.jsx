// 入口文件
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import configureStore from './store/configureStore'

// 性能测试
import Perf from 'react-addons-perf'
window.Perf = Perf

import Utils from './util/util';
import '../static/styles/common.less'

import './util/page'
// 创建 Redux 的 store 对象
const store = configureStore()

// 获取 route 配置
import Router from './router'

render(
    <Provider store={store}>
        <Router history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
