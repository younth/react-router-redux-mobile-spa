/*
 * @file 首页热卖商品区组件 Onsell
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import CardList from '../../../components/CardList'
import TitleBar from '../../../components/TitleBar'
import ImgTip from '../../../components/ImgTip'

// 组装 Onsell 组件
class Onsell extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        let cardList = this.props.cardList
        return (
            <div>
                { cardList.length ? <TitleBar type = "city-card" title = "热卖中（todo）" /> : '' }
                {
                    cardList.length
                    ? <CardList cardList = {cardList} clickBtn = {this.props.clickBtn} />
                    : <ImgTip type = "nocitycard" /> 
                }
            </div>
        )
    }
}

export default Onsell
