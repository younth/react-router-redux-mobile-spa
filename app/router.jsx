// 路由配置
import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { Router, Route, IndexRoute } from 'react-router'

import { redirectToLogin } from './util/authService'

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
export default class RouteMap extends Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.updateHandle = this.updateHandle.bind(this)
    }

    updateHandle() {
    }

    render() {
        return (
            <Router history={this.props.history} onUpdate={this.updateHandle}>
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
        )
    }
}