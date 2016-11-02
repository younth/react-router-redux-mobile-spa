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
        let cardlist = [{
            'city_id': '131',
            'city_name': '北京',
            'privilege_id': '1',
            'privilege_name': '权益名称1',
            'start_time': '2016-05-17',
            'end_time': '2016-07-18',
            'valid': true,
            'discount_desc': '5折',
            'renew_state': false,
            'expired_in': '3'
        },{
            'city_id': '131',
            'city_name': '北京',
            'privilege_id': '2',
            'privilege_name': '权益名称2',
            'start_time': '2016-05-17',
            'end_time': '2016-07-18',
            'valid': true,
            'discount_desc': '7折',
            'renew_state': false,
            'expired_in': '3'
        }]
        return (
            <div>
                <div className="title-wrap">
                    <div className="title">热卖中（<span className="city-name">北京</span>）</div>
                </div>
                <CardList cardlist={cardlist}/>
            </div>
        )
    }
}

export default Onsell
