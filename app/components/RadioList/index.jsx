/*
 * @file 公共-单选列表 RadioList
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import RadioItem from './RadioItem';

import './index.less'

// 组装 RadioList 组件
class RadioList extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        let radioList = this.props.radioList
        return (
            <div className = "radio-list">
                <div className = "radio-wrap">
                {
                    radioList.map((item, index) => <RadioItem key = {index} radio = {item} selected = {this.props.selected} isNew = {this.props.isNew} onSelectedValueChanged = {this.props.onSelectedValueChanged}/>)
                }
                </div>
            </div>
        )
    }
}

export default RadioList
