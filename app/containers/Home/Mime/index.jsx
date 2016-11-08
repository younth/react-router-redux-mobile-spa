/*
 * @file 首页我的权益区组件 Mime
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import SwipeCard from '../../../components/SwipeCard'
import TitleBar from '../../../components/TitleBar'
import ImgTip from '../../../components/ImgTip'

import './index.less'

// 组装 Mime 组件
class Mime extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    getCardNum(cardList) {
        let valid = cardList && cardList.valid || []
        let expired = cardList && cardList.expired || []
        let num = valid && valid.length + expired && expired.length
        return num
    }
    render() {
        let num = this.getCardNum(this.props.cardList)
        return (
            <div>
            {
                num ? 
                <TitleBar type = "user-card" title = "已购买" />
                : ''
            }
            {
                num ? <SwipeCard cardList = {this.props.cardList} />
                : this.props.isVip 
                ? <ImgTip type = "novipcard" /> 
                : <ImgTip type = "nousercard" /> 
            }
            </div>
        )
    }
}

export default Mime
