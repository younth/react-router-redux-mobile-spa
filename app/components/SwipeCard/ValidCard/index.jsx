/*
 * @file 首页已购卡片-有效卡组件 ValidCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';

// 组装 ValidCard 组件
class ValidCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let card = this.props.card
        return (
            <div className = { classNames("card-item", this.props.cardType) } onClick = {this.props.clickBtn.bind(null, 'detail', card.privilege_no)} >
                <div className="inner-card">
                    <div className="section1">
                        <div className="city">{card.city_name}</div>
                        <div className="to-use-detail">查看详情</div>
                    </div>
                    <div className="section2">
                        <div className="desc-wrap">
                            <div className="discount">{card.discount_rate}</div>
                            <div className="discount-rule">
                                <div className="name">折 {card.privilege_name}</div>
                                <div className="desc">仅支持专送</div>
                            </div>
                        </div>
                    </div>
                    <div className="section3">
                        <div className="time-wrap">
                            有效期至 {card.end_time}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ValidCard
