/*
 * @file 详情页订单展示组件 DiscountItem
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

// 组装 DiscountItem 组件
class DiscountItem extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        let data = this.props.data
        return (
            <div className="discount-item">
                <div className="name">{data.shop_name}</div>
                <div className="desc">节省配送费 ￥{data.save_money}</div>
            </div>
        )
    }
}

export default DiscountItem
