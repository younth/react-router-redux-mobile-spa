/*
 * @file 首页已购卡片-无用可删除卡组件 UselessCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

// 组装 UselessCard 组件
class UselessCard extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    clickBtn(type, privilege_no, event) {
        if (event) {
            if (!event.currentTarget.classList.contains('card-item')) {
                event.stopPropagation();
            }
            this.props.clickBtn(type, privilege_no)
        }
    }
    render() {
        let card = this.props.card
        return (
            <div className = { classNames("card-item", this.props.cardType) } onClick = {this.clickBtn.bind(this, 'detail', card.privilege_no)} >
                <div className="inner-card">
                    <div className="section1">
                        <div className="city">{card.city_name}</div>
                        <div className = "to-use-detail">查看详情</div>
                    </div>
                    <div className="section2">
                        <div className="desc-wrap">
                            <div className="discount">{card.discount_rate}</div>
                            <div className="discount-rule">
                                <div className="name">折 {card.privilege_name}</div>
                                <div className="desc">仅支持专送</div>
                            </div>
                        </div>
                        <div className="msg-tip"><div className = "tip">已下架</div></div>
                    </div>
                    <div className="section3" onClick = {this.clickBtn.bind(this, 'delete', card.privilege_no)}>
                        <div className="btn-wrap">
                            <div className="btn delete">删除</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UselessCard
