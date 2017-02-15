/*
 * @file Rule 组件, 展示配送折扣卡规则
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Utils from '../../util/util.js';

import './index.less'

class Rule extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentWillMount() {
        Utils.setTitleBar({
            titleText: '规则详解'
        })
        Utils.loading(0)
        Utils.setBack()
        return false
    }

    componentDidMount() {
        // 添加活动规则页面统计
        Utils.addStat('rule')
    }

    render() {
        return (
             <section id="rule">
                <h2>外卖折扣配送卡规则</h2>
                <p>
                请您务必认真阅读本规则, 特别是加粗的内容, 对您有重要影响, 请确保您理解并认同本 规则所有条款, 如不能理解任何条款请致电外卖客服10105777, 您点击同意本规则, 则表示您已完全理解与认可本规则, 并愿意完全接受本规则的约束。
                </p>
                <h2>折扣配送卡介绍</h2>
             </section>
        );
    }
}

export default Rule
