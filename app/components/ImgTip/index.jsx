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
                            <p>当前城市没有商品在售</p>
                            <p>更多惊喜敬请期待...</p>
                        </div>
                        : this.props.type === 'nousercard' ?
                        <div className="tip-msg">
                            <p>您还没有特权卡哦~</p>
                            <p>请从下方购买</p>
                        </div>
                        : this.props.type === 'nocitycard' ?
                        <div className="tip-msg">
                            <p>当前城市没有商品在售</p>
                            <p>更多惊喜敬请期待...</p>
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
