/*
 * @file Detail 组件, 特权使用详情
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.less'

import TitleBar from '../../components/TitleBar'
import Access from '../../components/Access'

import * as globalActions from '../../actions/globalVal'
import * as cardActions from '../../actions/card'

const mapStateToProps = state => {
    return {
        detail: state.detail,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        globalActions: bindActionCreators(globalActions, dispatch),
        cardActions: bindActionCreators(cardActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class Detail extends Component {
    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    compontentWillMount() {
        // 展示loading状态 todo
        // loading()
    }
    componentDidMount () {
        let {detail, cardActions, globalActions} = this.props
        !detail.data && cardActions.getDiscountDetail()
        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }
    render() {
        let {detail} = this.props
        console.log(detail);
            // 隐藏loading状态 todo
            // loading(0)
            // 更新全局数据
            // globalActions.addressUpdate({
            //     isVip: card.isVip
            // })
        return (
            <div className = "detail-page">
                <Access />
                <TitleBar type = "city-name" title = "开通城市" value = "北京"/>
                <TitleBar type = "end-time" title = "有效期至" value = "2016-12-01"/>
                <TitleBar type = "access-title" title = "特权说明" />
                <div className = "access-rule">
                    <div className="section1">
                        <p>每单最高减免4元配送费。</p>
                        <p>每天最多可享4单。</p>
                        <p>每月最多可享30单。</p>
                    </div>
                    <div className="section2">
                        <p>特权只在开通城市有效。</p>
                        <p>仅支持百度专送。</p>
                    </div>
                </div>
                <TitleBar type = "discount-title" title = "优惠明细" />
                <div className="discount-wrap">
                    <div className="discount-item">
                        <div className="name">包点饺子（西二旗店）</div>
                        <div className="desc">节省配送费 ￥5</div>
                    </div>
                    <div className="discount-item">
                        <div className="name">包点饺子（西二旗店）</div>
                        <div className="desc">节省配送费 ￥5</div>
                    </div>
                    <div className="discount-item">
                        <div className="name">包点饺子（西二旗店）</div>
                        <div className="desc">节省配送费 ￥5</div>
                    </div>
                    <div className="discount-item">
                        <div className="name">包点饺子（西二旗店）</div>
                        <div className="desc">节省配送费 ￥5</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Detail
