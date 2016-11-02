import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './index.less'

// 组装 SwipeCard 组件
class SwipeCard extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="swiper-wrap">
                {
                    this.props.cardlist.map((item, index) => {
                        <div className="card">
                        item.privilege_name
                        </div>
                    }
                }
            </div>
        )
    }
}

export default SwipeCard
