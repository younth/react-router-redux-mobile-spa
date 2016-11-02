// 相当于layout
import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import * as demoActions from '../actions/demo'

// 将 store 中的数据作为 props 绑定到组件上，参数就是 Redux 的 store
function mapStateToProps(state) {
    return {
        demo: state.demo
    }
}

// 将 action 作为 props 绑定到 组件上 要触发这个 action 必须在 store 上调用 dispatch 方法
// bindActionCreators 将 action 包装成直接可被调用的函数 diapatch 正是 mapDispatchToProps 的第一个参数
// 调用该方法就会触发 dispatch
function mapDispatchToProps(dispatch) {
    return {
        demoActions: bindActionCreators(demoActions, dispatch)
    }
}

@connect(mapStateToProps,mapDispatchToProps)
export default class App extends Component {

    static propTypes = {
        demo: PropTypes.object.isRequired,
        demoActions: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        }
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
