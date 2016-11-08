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
            titleText: '会员规则详解',
        });
        Utils.loading(0);
        Utils.setBack();
        return null;
    }

    render() {
        return (
             <section id="rule">
                <h2>百度外卖折扣配送卡规则</h2>
                <p>
                请您务必认真阅读本规则, 特别是加粗的内容, 对您有重要影响, 请确保您理解并认同本 规则所有条款, 如不能理解任何条款请致电百度外卖客服10105777, 您点击同意本规则, 则表示您已完全理解与认可本规则, 并愿意完全接受本规则的约束。
                </p>
                <h2>1、 百度外卖折扣配送卡介绍</h2>
                <p>
                    <span>1.1、 百度外卖折扣配送卡, 是百度外卖为用户提供的、 可供用户选择的、可享有配送费折扣（用户实际享受的配送费折扣以用户实际购买的折扣配送卡的卡面显示为准）的付费服务；</span>
                    <span>1.2、 用户支付成功后, 系统立即自动开通配送费折扣。<span className="bold">每月按31天计算, 从系统开通折扣配送卡之日起算， 即自开通之日起至第31天的23: 59: 59 时到期。</span></span>
                </p>
                <h2>2、 如何开通和续费</h2>
                 <p>
                    <span>2.1、 用户从手机客户端“ 我的→小度商城” 进入即可开通和续费；</span>
                    <span>2.2、 用户每次可购买<span className="red">权益</span>期限以用户实际购买的折扣配送卡的卡面显示为准，不可叠加；</span>
                    <span>2.3、 目前折扣配送卡功能仅限在百度外卖手机客户端 4.0及以上版本开通和使用。</span>
                </p>
                <h2>3、 折扣配送卡权益</h2>
                 <p>
                    <span>3.1、 仅限在百度外卖手机客户端在线支付时使用；</span>
                    <span>3.2、 <span className="bold">每日最多可享受N单折扣配送权益, 每月最多可享受M单折扣配送权益（N、M为表示便利使用，具体数值以用户实际购买的折扣配送卡的<span className="red">说明</span>为准）</span>；</span>
                    <span>3.3、 <span className="bold">每单最高减免4元</span>；</span>
                    <span>3.4、 仅限在开通折扣配送卡时所选的城市使用，不支持跨城市使用；</span>
                    <span>3.5、 仅限本人使用，不得授权或转授权他人使用；</span>
                    <span>3.6、 以上<span className="red">权益</span>仅限【百度专送】 餐厅使用；</span>
                </p>
                <h2>4、注意事项</h2>
                <p>
                    <span>4.1、 折扣配送卡开通或兑换成功后, 不支持退款；</span>
                    <span>4.2、 折扣配送卡失效前3天时可以<span className="red">开通新卡</span>；</span>
                    <span>4.3、 百度外卖有权变动折扣配送卡价格， 但价格变动仅针对新开通或续费用户， 并不会改变现有用户的购买价格；</span>
                    <span>4.4、 在法律法规允许范围内， 百度外卖拥有本规则的解释权， 如有疑问， 请致电百度外卖客服10105777。</span>
                </p>
             </section>
        );
    }
}

export default Rule
