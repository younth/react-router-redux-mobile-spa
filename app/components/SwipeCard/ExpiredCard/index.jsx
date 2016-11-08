/*
 * @file 首页已购卡片-过期卡在售可续费卡组件 ExpiredCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import classNames from 'classnames';

// 组装 ExpiredCard 组件
class ExpiredCard extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        let card = this.props.card
        return (
            <div className = { classNames("card-item", this.props.cardType) }>
                <div className="inner-card">
                    <div className="section1">
                        <div className="city">{card.city_name}</div>
                        <Link className="to-use-detail" to='detail'>查看详情</Link>

                    </div>
                    <div className="section2">
                        <div className="desc-wrap">
                            <div className="discount">{card.discount_rate}</div>
                            <div className="discount-rule">
                                <div className="name">折 {card.privilege_name}</div>
                                <div className="desc">仅支持百度专送</div>
                            </div>
                        </div>
                        <div className="msg-tip">已过期</div>
                    </div>
                    {
                        card.notRenew ? '' :
                        <div className="section3" onClick = {this.props.clickBtnWrap.bind(null, 'renew', card.privilege_no)}>
                            <div className="btn-wrap">
                                 <div className="btn renew">续费</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ExpiredCard
