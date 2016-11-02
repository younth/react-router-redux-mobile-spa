import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import '../../../static/styles/common.less'
import './title.less'
import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'

import * as demoActions from '../../actions/demo'
import * as userInfoActions from '../../actions/userinfo'

// 组装 home 组件
const mapStateToProps = state => {
    return {
        userinfo: state.userinfo,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        demoActions: bindActionCreators(demoActions, dispatch),
        userInfoActions: bindActionCreators(userInfoActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {    
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Mime />
                <Onsell />
                <Link className="to-rule" to="rule">小度商城规则</Link>
            </div>
        )
    }
}

export default Home
