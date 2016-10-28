// 路由配置
import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { Router, Route, IndexRoute } from 'react-router'

// App 入口
import App from './containers/App'

// home 页
import Home from './containers/Home'
import User from './containers/User'

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
                    <Route path="user"  component={User}/>
                    {/* 404 */}
                    <Route path="*" component={NotFound}/>
                    <Route path="/404" component={NotFound}/>
                </Route>
            </Router>
        )
    }
}