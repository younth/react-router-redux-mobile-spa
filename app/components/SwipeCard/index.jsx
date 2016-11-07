/*
 * @file 首页已购卡片列表组件 SwipeCard
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import ReactSwipe from 'react-swipes';

import ValidCard from './ValidCard';
import RenewCard from './RenewCard';
import UnenforcedCard from './UnenforcedCard';
import ExpiredCard from './ExpiredCard';
import UselessCard from './UselessCard';

import './index.less'

// 组装 SwipeCard 组件
class SwipeCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curCard: 0
        }
    }
    swipeCallback(index, elem) {
        this.setState({
            curCard: index
        })
    }
    // 区分有效卡、可续费卡、过期卡可续费卡和无用可删除卡
    // 存在的问题：先把用户已购卡片遍历一遍，区分有效卡与无效卡中的四种卡片状态，再在render中遍历并展示
    // => 结构较为清晰，但是遍历两遍性能较差。
    // => 已购卡数量较少，可以接受遍历两遍。
    // => 可以实现四种卡片的排序，如果在render中边遍历判断边展示，只能按照接口返回卡片顺序排序
    // => 后端未返回所有已购卡数量，因此需要通过遍历或者获取两种卡数量之和的方式得到数量以判断是否展示单张卡样式（当然这是小问题，时间复杂度O(1)）
    // => 我选择了遍历两遍的方式，第一遍判断卡类型，第二遍渲染DOM
    distinguishCard(cardList = []) {
        // 定义返回值
        let validCard = [], renewCard = [], unenforcedCard = [], expiredCard = [], uselessCard = []
        let num = 0 // 已购卡数量
        // 获取有效卡 valid
        let valid = cardList && cardList.valid || []
        // 区分有效卡中的 正常有效卡、可续费卡 和 未生效卡
        // 判断依据 renew_state 为 true 标识可续费, current_in_service 为 true 代表当前可使用
        valid.length && valid.map((item, index) => {
            if (item.btn_state === 2) {
                // 快到期可续费
                item.cardType = 'renewCard'
                renewCard.push(item)
            } else if (item.btn_state === 0) {
                if (item.expired_in <= 3) {
                    // 快到期且不可续费
                    item.notRenew = true // 标识该卡不可续费
                    item.cardType = 'renewCard'
                    renewCard.push(item)
                } else if (item.current_in_service === true) {
                    // 当前使用中卡（只展示截止时间）
                    item.cardType = 'validCard'
                    validCard.push(item)
                } else if (item.current_in_service === false) {
                    // 新卡当前未生效（展示起止时间）
                    item.cardType = 'unenforcedCard'
                    unenforcedCard.push(item)
                }
            }
        })
        // 获取过期卡 expired
        let expired = cardList && cardList.expired || []
        // 区分过期卡中的 过期可续费卡（在售） 和 无用可删除卡（下架）
        expired.length && expired.map((item, index) => {
            if (item.off_sale) {
                // 过期下架可删除卡
                item.cardType = 'uselessCard'
                uselessCard.push(item)
            } else if (item.btn_state === 2) {
                // 过期在售可续费卡
                item.cardType = 'expiredCard'
                expiredCard.push(item)
            } else if (item.btn_state === 0) {
                // 过期但不可续费卡
                item.notRenew = true // 标识该卡不可续费
                item.cardType = 'expiredCard'
                expiredCard.push(item)
            }
        })
        // 排序后的 cardList
        let ranklist = renewCard
        ranklist = ranklist.concat(validCard).concat(unenforcedCard).concat(expiredCard).concat(uselessCard)

        return ranklist // 排序后的 cardList
    }
    renderCard(card, key, specialType = '') {
        specialType = specialType ? `${specialType} ${card.cardType}` : card.cardType;
        if (card.cardType === 'renewCard') {
            return <RenewCard key = {key} card = {card} cardType = {specialType}/>
        } else if (card.cardType === 'validCard') {
            return <ValidCard key = {key} card = {card} cardType = {specialType}/>
        } else if (card.cardType === 'unenforcedCard') {
            return <UnenforcedCard key = {key} card = {card} cardType = {specialType}/>
        } else if (card.cardType === 'expiredCard') {
            return <ExpiredCard key = {key} card = {card} cardType = {specialType}/>
        } else if (card.cardType === 'uselessCard') {
            return <UselessCard key = {key} card = {card} cardType = {specialType}/>
        }
    }
    render() {
        let cardList = this.distinguishCard(this.props.cardList)
        // swipes 的配置
        let opt = {
            distance: wmflex.rem2px(8.666667), // 每次移动的距离，卡片的真实宽度，需要计算
            swTouchend: (ev) => {
                let data = {
                    moved: ev.moved,
                    originalPoint: ev.originalPoint,
                    newPoint: ev.newPoint,
                    cancelled: ev.cancelled
                }
                console.log(data)
                this.setState({
                    curCard: ev.newPoint
                })
            }
        }
        return (
            <div>
            {
                // todo length === 0时展示提示图案
                cardList && cardList.length === 1
                ? this.renderCard(cardList[0], 0, 'only-card')
                : <div className = "swipe-wrap">
                    <ReactSwipe className = "card-slide" options = {opt}>
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

export default SwipeCard
