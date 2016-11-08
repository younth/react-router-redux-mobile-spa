// 路由配置
import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { Router, Route, IndexRoute } from 'react-router'

import { redirectToLogin } from './util/authService'

// App 入口
import App from './containers/App'

// Home 首页
import Home from './containers/Home'
import User from './containers/User'
// Confirm 提交订单页
import Confirm from './containers/Confirm'
// Detail 使用详情
import Detail from './containers/Detail'
// Rule 使用详情
import Rule from './containers/Rule'

// 404
import NotFound from './containers/404'

// 配置 router
export default class RouteMap extends Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.updateHandle = this.updateHandle.bind(this)
    }

    updateHandle() {
        // biglog的pv打点统计
        console.log('update');
    }

    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle}>
                {/* 先加载app组件 */}
                <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="home/:payresult" component={Home} />
                    <Route path="confirm/:id" component={Confirm} onEnter={redirectToLogin} />
                    <Route path="detail/:id" component={Detail} onEnter={redirectToLogin} />
                    <Route path="rule" component={Rule} onEnter={redirectToLogin} />

                    <Route path="user" component={User} onEnter={redirectToLogin} />
                    {/* 404 */}
                    <Route path="*" component={NotFound}/>
                    <Route path="/404" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}