/*
 * @file 首页图片提示组件 ImgTip
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

import './index.less'

// 组装 ImgTip 组件
class ImgTip extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curCard: 0
        }
    }
    render() {
        return (
            <div>
            {
                <div className={ classNames("tip-wrap", this.props.type) }>
                    <div className="tip-img"></div>
                    {
                        this.props.type === 'novip' ?
                        <div className="tip-msg">
                            <p>您已拥有会员面配送费特权</p>
                            <p>用完再来买想新卡吧</p>
                        </div>
                        : this.props.type === 'nousercard' ?
                        <div className="tip-msg">
                            <p>还没有购卡哦</p>
                            <p>请从下方购买</p>
                        </div>
                        : this.props.type === 'nocitycard' ?
                        <div className="tip-msg">
                            <p>北京市的商品正在紧锣密鼓的筹备中</p>
                            <p>敬请期待...</p>
                        </div> 
                        : ''
                    }
                    
                </div>
            }
            </div>
        )
    }
}

export default ImgTip
