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
        return (
            <div>
                <div className="title-wrap">
                    <div className="title">已购买</div>
                    <Link className="to-all-card" to='all'>查看全部</Link>
                </div>
                <SwipeCard cardlist={this.props.cardlist}/>
            </div>
        )
    }
}

export default Mime
