/*
 * @file 首页已购卡片列表组件 SwipeCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link, hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Utils from '../../util/util.js'

import ReactSwipe from 'react-swipes';

import ValidCard from './ValidCard';
import RenewCard from './RenewCard';
import UnenforcedCard from './UnenforcedCard';
import ExpiredCard from './ExpiredCard';
import UselessCard from './UselessCard';

import * as globalActions from '../../actions/globalVal'

import './index.less'

// 组装 SwipeCard 组件
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
@connect(mapStateToProps, mapDispatchToProps)
export default class SwipeCard extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        // this.state = {
        //     curCard: 0
        // }
    }

    // 区分卡类型，以选择相应的卡组件进行渲染
    distinguishCard(cardList = {}) {
        let newCardList = []
        // btn_state: 0 不展示， 1 开通 2 续费 3 开通置灰 4 续费置灰
        if (cardList.valid) {
            // 区分有效卡中的 正常有效卡、可续费卡 和 未生效卡
            cardList.valid.length && cardList.valid.map((item, index) => {
                if (item.btn_state === 2) {
                    // 展示续费按钮：快到期可续费
                    item.cardType = 'renewCard'
                } else if (item.btn_state === 0) {
                    // 不展示按钮
                    if (item.expired_in < 3) {
                        // expired_in = 0|1|2时，才提示还有几天到期
                        // 快到期且不可续费
                        item.notRenew = true // 标识该卡不可续费
                        item.cardType = 'renewCard'
                    } else if (item.current_in_service === true) {
                        // 当前使用中卡（只展示截止时间）
                        item.cardType = 'validCard'
                    } else if (item.current_in_service === false) {
                        // 新卡当前未生效（展示起止时间）
                        item.cardType = 'unenforcedCard'
                    }
                }
            })
            newCardList = cardList.valid
        }
        if (cardList.expired) {
            // 区分过期卡中的 过期可续费卡（在售）和 无用可删除卡（下架）
            cardList.expired.length && cardList.expired.map((item, index) => {
                if (item.off_sale) {
                    // 过期下架可删除卡
                    item.cardType = 'uselessCard'
                } else if (item.btn_state === 2) {
                    // 展示可续按钮：过期在售可续费卡
                    item.cardType = 'expiredCard'
                } else if (item.btn_state === 0) {
                    // 不展示按钮：过期但不可续费卡
                    item.notRenew = true // 标识该卡不可续费
                    item.cardType = 'expiredCard'
                }
            })
            newCardList = newCardList.concat(cardList.expired)
        }
        return newCardList
    }

    renderCard(card, key, specialType = '') {
        specialType = specialType ? `${specialType} ${card.cardType}` : card.cardType;
        if (card.cardType === 'renewCard') {
            return <RenewCard key = {key} card = {card} cardType = {specialType} clickBtn = {this.props.clickBtn}/>
        } else if (card.cardType === 'validCard') {
            return <ValidCard key = {key} card = {card} cardType = {specialType} clickBtn = {this.props.clickBtn}/>
        } else if (card.cardType === 'unenforcedCard') {
            return <UnenforcedCard key = {key} card = {card} cardType = {specialType} clickBtn = {this.props.clickBtn}/>
        } else if (card.cardType === 'expiredCard') {
            return <ExpiredCard key = {key} card = {card} cardType = {specialType} clickBtn = {this.props.clickBtn}/>
        } else if (card.cardType === 'uselessCard') {
            return <UselessCard key = {key} card = {card} cardType = {specialType} clickBtn = {this.props.clickBtn}/>
        }
    }

    componentDidMount () {
        let {globalVal, globalActions} = this.props
    }

    componentDidUpdate() {
        this.refs.reactSwipe.refresh()
    }

    render() {
        let cardList = this.distinguishCard(this.props.cardList)
        // swipes 的配置
        let opt = {
            distance: window.wmflex.rem2px(window.wmflex.px2rem(650, 75)), // 每次移动的距离，卡片的真实宽度，需要计算
            swTouchend: (ev) => {
                let data = {
                    moved: ev.moved,
                    originalPoint: ev.originalPoint,
                    newPoint: ev.newPoint,
                    cancelled: ev.cancelled
                }
                // this.setState({
                //     curCard: ev.newPoint
                // })
            }

        }
        let swipeWrapWidth = window.wmflex.px2rem(650 * cardList.length, 75)
        let swipeStyle = {
            width: `${swipeWrapWidth}rem`
        }
        return (
            <div>
            {
                cardList && cardList.length === 1
                ? this.renderCard(cardList[0], 0, 'only-card')
                : <div className = "swipe-wrap" style = {swipeStyle}>
                    <ReactSwipe className = "card-slide" options = {opt} ref = "reactSwipe">
                    {
                        cardList.map((item, index) => this.renderCard(item, index))
                    }
                    </ReactSwipe>
                </div>
            }
            </div>
        )
    }
}
