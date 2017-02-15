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
    }

    // 区分卡类型，以选择相应的卡组件进行渲染
    distinguishCard(cardList = {}) {
        let newCardList = []
        if (cardList.valid) {
            cardList.valid.length && cardList.valid.map((item, index) => {
                if (item.btn_state === 2) {
                    item.cardType = 'renewCard'
                } else if (item.btn_state === 0) {
                    if (item.expired_in < 3) {
                        item.notRenew = true // 标识该卡不可续费
                        item.cardType = 'renewCard'
                    } else if (item.current_in_service === true) {
                        item.cardType = 'validCard'
                    } else if (item.current_in_service === false) {
                        item.cardType = 'unenforcedCard'
                    }
                }
            })
            newCardList = cardList.valid
        }
        if (cardList.expired) {
            cardList.expired.length && cardList.expired.map((item, index) => {
                if (item.off_sale) {
                    item.cardType = 'uselessCard'
                } else if (item.btn_state === 2) {
                    item.cardType = 'expiredCard'
                } else if (item.btn_state === 0) {
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
        this.refs.reactSwipe && this.refs.reactSwipe.refresh()
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
