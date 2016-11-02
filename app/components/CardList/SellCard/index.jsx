/*
 * @file 首页热卖商品卡片组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as globalActions from '../../../actions/globalVal'

import './index.less'

// 组装 SellCard 组件
const mapStateToProps = state => {
    return {
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        globalActions: bindActionCreators(globalActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class SellCard extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            rulefold: true // 使用规则折叠true 展开false
        }
    }
    unfoldRule() {
        // 展开使用规则
        this.setState({
            rulefold: false
        })
    }
    render() {
        let card = this.props.card
        return (
            <div className="sellcard-item">
                <div className="section1">
                    <div className="base-info">
                        <div className="name">{card.privilege_name}</div>
                        <div className="desc">仅支持百度专送</div>
                    </div>
                    <div className="other-info">
                        <div className="price-wrap">
                            <div className="price">{card.price * 10 * 10}</div>
                        </div>
                        <div className="btn-wrap">
                            <div className="btn buy">购买</div>
                            <div className="btn conflict">购买</div>
                            <div className="btn nostock">缺货中</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.rulefold
                    ? <div className="section2 to-use-rule" onClick={this.unfoldRule.bind(this)}>查看使用规则</div>
                    : <div className="section3 rule-wrap">
                        <p>在山的那边 海的那边 有一群蓝精灵</p>
                        <p>在山的那边 海的那边 有一群蓝精灵</p>
                        <p>在山的那边 海的那边 有一群蓝精灵</p>
                    </div>
                }
            </div>
        )
    }
}

export default SellCard
