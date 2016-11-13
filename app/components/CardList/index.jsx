/*
 * @file 首页热卖商品卡片列表组件CardList
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import SellCard from './SellCard';
import MessageTip from './MessageTip';

// 组装 CardList 组件
class CardList extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        let length = this.props.cardList && this.props.cardList.length || 0
        return (
            <div className="sellcard-wrap">
                {
                    length && this.props.cardList.map((item, index) => 
                        <SellCard key = {index} card = {item} clickBtn = {this.props.clickBtn} isNew = {this.props.isNew} />)
                }
                <MessageTip tip = {'更多惊喜敬请期待...'}/>
            </div>
        )
    }
}

export default CardList
