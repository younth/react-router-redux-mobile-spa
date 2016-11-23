/*
 * @file 首页已购卡片-续费卡组件 RenewCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';

// 组装 RenewCard 组件
class RenewCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
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
                <div className = "inner-card">
                    <div className = "section1">
                        <div className = "city">{card.city_name}</div>
                        <div className = "to-use-detail">查看详情</div>
                    </div>
                    <div className = { classNames('section2', { nobtn: card.notRenew }) }>
                        <div className = "desc-wrap">
                            <div className = "discount">{card.discount_rate}</div>
                            <div className = "discount-rule">
                                <div className = "name">折 {card.privilege_name}</div>
                                <div className = "desc">仅支持百度专送</div>
                            </div>
                        </div>
                        <div className = "msg-tip">
                            {
                                card.expired_in === 0 ? <div className = "tip">今天到期</div> 
                                : card.expired_in === 1 ? <div className = "tip">明天到期</div> 
                                : card.expired_in === 2 ? <div className = "tip">后天到期</div> 
                                : <div className = "tip"><div className = "expired-in">{card.expired_in}</div>天后到期</div>
                            }
                        </div>
                    </div>
                    {
                        card.notRenew ? '' : 
                        <div className = "section3" onClick = {this.clickBtn.bind(this, 'renew', card.privilege_no)}>
                            <div className = "btn-wrap">
                                <div className = "btn renew">续费</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default RenewCard
