/*
 * @file 公共组件-单选框 RadioItem
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames';

import './index.less'

// 组装 RadioItem 组件
class RadioItem extends Component {
    constructor(props, context) {
        super(props, context)
    }
   
    render() {
        let radio = this.props.radio
        return (
            <div className = { classNames('radio-item', { selected: this.props.selected === radio.period }) } onClick={this.props.onSelectedValueChanged.bind(null, radio.period, radio.price)} >
                <div className = "text">{radio.period_str}</div>
                <div className = "radio"></div>
            </div>
        )
    }
}

export default RadioItem
