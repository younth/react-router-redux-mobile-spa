// 路由配置
import React, { PropTypes, Component } from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import { redirectToLogin, updateHandle } from './util/authService'

// App 入口
import App from './containers/App'

// Home 首页
import Home from './containers/Home'
// Confirm 提交订单页
import Confirm from './containers/Confirm'
// Detail 使用详情
import Detail from './containers/Detail'

// 规则页面按需加载
const Rule = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/Rule').default)
    },'rule')
}

// 404
import NotFound from './containers/404'

// 配置 router
export default (
    <Router history={hashHistory} onUpdate={updateHandle}>
        {/* 先加载app组件 */}
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="home" component={Home} />
            <Route path="confirm/:id" component={Confirm} onEnter={redirectToLogin} />// 确认页面
            <Route path="detail/:id" component={Detail} onEnter={redirectToLogin} />// 详情页面
            <Route path="rule" getComponent={Rule} onEnter={redirectToLogin} />// 规则页面 getComponent 按需
            {/* 404 */}
            <Route path="*" component={NotFound}/>
            <Route path="/404" component={NotFound}/>
        </Route>
    </Router>
);