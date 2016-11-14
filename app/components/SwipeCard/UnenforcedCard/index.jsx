/*
 * @file 首页已购卡片-未生效卡组件 UnenforcedCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';

// 组装 UnenforcedCard 组件
class UnenforcedCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let card = this.props.card
        return (
            <div className = { classNames("card-item", this.props.cardType) } onClick = {this.props.clickBtn.bind(null, 'detail', card.privilege_no)} >
                <div className = "inner-card">
                    <div className = "section1">
                        <div className = "city">{card.city_name}</div>
                        <div className = "to-use-detail">查看详情</div>
                    </div>
                    <div className = "section2">
                        <div className = "desc-wrap">
                            <div className = "discount">{card.discount_rate}</div>
                            <div className = "discount-rule">
                                <div className = "name">折 {card.privilege_name}</div>
                                <div className = "desc">仅支持百度专送</div>
                            </div>
                        </div>
                    </div>
                    <div className = "section3">
                        <div className = "time-wrap">
                            有效期 
                            <div className = "time">{card.start_time} ~ {card.end_time}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UnenforcedCard
