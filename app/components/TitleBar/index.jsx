/*
 * @file 首页区域title TitleBar
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

import './index.less'

// 组装 TitleBar 组件
class TitleBar extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curCard: 0
        }
    }
    render() {
        return (
            <div className = { classNames("title-wrap", this.props.type) }>
                <div className = "title">{this.props.title}</div>
                {this.props.children}
            </div>
        )
    }
}

export default TitleBar
