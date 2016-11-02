/*
 * @file 首页热卖商品卡片组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

// 组装 MessageTip 组件
class MessageTip extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="sellcard-item tip">{this.props.tip}</div>
        )
    }
}

export default MessageTip
