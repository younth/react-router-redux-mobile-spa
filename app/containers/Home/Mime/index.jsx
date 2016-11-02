import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import SwipeCard from '../../../components/SwipeCard'

import './index.less'

// 组装 Mime 组件
class Mime extends Component {
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
                    <div className="title">已购买</div>
                    <Link className="to-all-card" to='all'></Link>
                </div>
                <SwipeCard cardlist={cardlist}/>
            </div>
        )
    }
}

export default Mime
