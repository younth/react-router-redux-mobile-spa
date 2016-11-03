/*
 * @file 首页我的特权区组件 Mime
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
    getCardNum(cardlist) {
        let valid = cardlist && cardlist.valid || []
        let expired = cardlist && cardlist.expired || []
        let num = valid && valid.length + expired && expired.length
        return num
    }
    render() {
        let num = this.getCardNum(this.props.cardlist)
        return (
            <div>
            {
                num ? 
                <TitleBar type = "userCard" title = "已购买">
                    { <Link className = "to-all-card" to = 'all'>查看全部</Link> }
                </TitleBar>
                : <TitleBar type = "userCard" title = "已购买" />
            }
            {
                num ? <SwipeCard cardlist = {this.props.cardlist} />
                : this.props.isVip 
                ? <ImgTip type = "viptip" /> 
                : <ImgTip type = "nousercard" /> 
            }
            </div>
        )
    }
}

export default Mime
