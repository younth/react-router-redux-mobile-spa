/*
 * @file 提单页底部同意购买协议 Agree
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import classNames from 'classnames';
import './index.less'

// 组装 Agree 组件
class Agree extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className = { classNames('agree-wrap', { selected: this.props.isAgree }) } onClick = {this.props.onSelectedValueChanged.bind(null, !this.props.isAgree)} >
                <div className = "radio" ></div>
                同意并接受<Link to = "rule">《百度外卖购卡协议》</Link>
            </div>
        )
    }
}

export default Agree
