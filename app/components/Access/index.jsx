/*
 * @file 提单页顶部权益展示组件 Access
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
        let accessList = this.props.accessList
        let type = this.props.type
        return (
            <div>
            {
                (type === 'privilege-detail') ?
                <div className = "access-wrap">
                    <div className = "access-item">
                        <div className = "info"><span className="num">{accessList.max_discount || 0 }</span>元</div>
                        <div className = "desc">每单最高减免</div>
                    </div>
                    <div className = "access-item">
                        <div className = "info"><span className="num">{accessList.day_limit || 0 }</span>单</div>
                        <div className = "desc">每天减免</div>
                    </div>
                    {
                        accessList.month_limit ? 
                        <div className = "access-item">
                            <div className = "info"><span className="num">{accessList.month_limit || 0 }</span>单</div>
                            <div className = "desc">每月最多减免</div>
                        </div>
                        : ''
                    }
                </div>
                : (type === 'discount-detail') ?
                <div className = "access-wrap">
                    <div className = "access-item">
                        <div className = "info"><span className="num">{accessList.time_days || 0 }</span>天</div>
                        <div className = "desc">权益时间</div>
                    </div>
                    <div className = "access-item">
                        <div className = "info"><span className="num">{accessList.total_save || 0 }</span>元</div>
                        <div className = "desc">为您节省</div>
                    </div>
                    <div className = "access-item">
                        <div className = "info"><span className="num">{accessList.delivery_times || 0 }</span>单</div>
                        <div className = "desc">折扣配送</div>
                    </div>
                </div>
                : ''
            }
            </div>
        )
    }
}

export default Access
