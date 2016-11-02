import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import './index.less'

// 组装 SwipeCard 组件
class SwipeCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="card-item">
                <div className="section1">
                    <div className="city">北京</div>
                    <Link className="to-use-detail" to='detail'>查看详情</Link>

                </div>
                <div className="section2">
                    <div className="discount">5</div>
                    <div className="discount-rule">
                        <div className="name">折 配送月卡</div>
                        <div className="desc">仅支持百度专送</div>
                    </div>
                </div>
                <div className="section3 end-time">有效期至 2016.12.1</div>
            </div>
        )
    }
}

export default SwipeCard
