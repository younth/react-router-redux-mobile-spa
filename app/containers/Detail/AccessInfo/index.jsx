/*
 * @file 详情页权益规则展示组件 AccessInfo
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

// 组装 AccessInfo 组件
class AccessInfo extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        let accessList = this.props.accessList
        return (
            <div className = "access-rule">
                <div className="section1">
                    <p>每单最高减免{accessList.max_discount}元配送费。</p>
                    <p>每天最多可享{accessList.day_limit}单。</p>
                    {accessList.month_limit ? <p>每月最多可享{accessList.month_limit}单。</p> : ''}
                </div>
                <div className="section2">
                    <p>权益只在开通城市有效。</p>
                    <p>仅支持百度专送。</p>
                </div>
            </div>
        )
    }
}

export default AccessInfo
