// 相当于layout
import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {}
    }

    render() {
        return (
            <div>
               {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        // 只会执行一次，合适公共数据请求
       console.log('layout Didmount');
    }

    // 路由切换时会触发
    componentDidUpdate() {
        // 记录路由切换完成、组件都渲染完成之后，页面的hash（包含了路由信息）
        window.webappLocationFrom = location.hash;
    }
}

export default App