/*
 * @file 首页热卖商品区组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CardList from '../../../components/CardList'

// 组装 Onsell 组件
class Onsell extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        return (
            <div>
                <div className = "title-wrap">
                    <div className = "title">热卖中（<span className = "city-name">北京</span>）</div>
                </div>
                <CardList cardlist = {this.props.cardlist} isVip = {this.props.isVip}/>
            </div>
        )
    }
}

export default Onsell
