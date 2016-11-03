/*
 * @file 提单页顶部特权展示组件 Access
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

// 组装 Access 组件
class Access extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curCard: 0
        }
    }
    render() {
        return (
            <div className = "access-wrap">
                <div className = "access-item">
                    <div className = "info"><span className="num">4</span>元</div>
                    <div className = "desc">每单最高减免</div>
                </div>
                <div className = "access-item">
                    <div className = "info"><span className="num">4</span>元</div>
                    <div className = "desc">每单最高减免</div>
                </div>
                <div className = "access-item">
                    <div className = "info"><span className="num">4</span>元</div>
                    <div className = "desc">每单最高减免</div>
                </div>
            </div>
        )
    }
}

export default Access
