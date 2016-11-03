/*
 * @file 首页热卖商品卡片组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

// 组装 SellCard 组件
class SellCard extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.unfoldRule = this.unfoldRule.bind(this)
        this.handBuyBtn = this.handBuyBtn.bind(this)
        this.state = {
            rulefold: true, // 使用规则折叠true 展开false
            rulebtnval: '查看使用规则',
            btnstatus: 'buy',
            conflictreason: ''
        }
    }
    unfoldRule() {
        this.state.rulefold = !this.state.rulefold;
        // 展开使用规则
        this.setState({
            rulefold: this.state.rulefold,
            rulebtnval: this.state.rulefold ? '查看使用规则' : '使用规则'
        })
    }
    handBuyBtn() {
        let btnstatus = this.state.btnstatus
        if (btnstatus === 'buy') {
            // 跳到提单页
        } else if (btnstatus === 'conflict') {
            // 提示不可购买原因 dialog
            let conflictreason = this.state.conflictreason
            // alert(conflictreason)
            window.WMApp.nui.toast({text: conflictreason})
        } else {
            return false;
        }
    }
    getBtnStatus(card, isVip) {
        let btnstatus = 'buy', conflictreason = ''
        if (card.stock > 0) {
            if (isVip) {
                // 会员冲突
                btnstatus = 'conflict'
                conflictreason = '会员不能买todo'
            } else {
                // todo 同类权益卡冲突待补充
                let btn_state = Number.parseInt(card.btn_state)
                if (btn_state === 1) {
                    // 可购买
                    btnstatus = 'buy'
                } else if (btn_state === 2) {
                    btnstatus = 'conflict'
                    conflictreason = card.conflict_msg
                } else if (btn_state === 3) {
                    btnstatus = 'renew'
                }
            }
        } else {
            // 无库存
            btnstatus = 'nostock'
        }
        this.state.btnstatus = btnstatus
        this.state.conflictreason = conflictreason
    }
    render() {
        let card = this.props.card
        this.getBtnStatus(card, this.props.isVip)
        return (
            <div className="sellcard-item">
                <div className="section1">
                    <div className="base-info">
                        <div className="name">
                            {card.privilege_name}
                            {
                                (card.stock <= 1000 && card.stock > 0) && <span className="stock">（库存{card.stock}张）</span>
                            }
                        </div>
                        <div className="desc">仅支持百度专送</div>
                    </div>
                    <div className="other-info">
                        <div className="price-wrap">
                            <div className="price">{card.price * 10 * 10}</div>
                        </div>
                        <div className="btn-wrap" onClick = {this.handBuyBtn}>
                        {
                            this.state.btnstatus === 'buy'
                            ? <div className="btn buy">购买</div>
                            : this.state.btnstatus === 'renew'
                            ? <div className="btn renew">续费</div>
                            : this.state.btnstatus === 'conflict'
                            ? <div className="btn conflict">购买</div>
                            : this.state.btnstatus === 'nostock'
                            ? <div className="btn nostock">缺货中</div>
                            : ''
                        }
                        </div>
                    </div>
                </div>
                <div className="section2 to-use-rule" onClick={this.unfoldRule}>{this.state.rulebtnval}</div>
                {
                    !this.state.rulefold && <div className="section3 rule-wrap">
                        <p>特权只在开通城市有效</p>
                        <p>每单最高减免{card.privilege_rule && card.privilege_rule.max_discount}元配送费</p>
                        <p>每天最多可享{card.privilege_rule && card.privilege_rule.day_limit}单</p>
                        <p>每月最多可享{card.privilege_rule && card.privilege_rule.month_limit}单</p>
                    </div>
                }
            </div>
        )
    }
}

export default SellCard
