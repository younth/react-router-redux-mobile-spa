import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import '../../../../static/styles/home.less'


// 组装 home 组件
class Privilege extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            	我的特权
            	<div className="test"></div>
            </div>
        )
    }
}

export default Privilege
