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
            <div className = "detailPage">
                <Access />
                <TitleBar type = "accessTitle" title = "本卡特权" />
                <TitleBar type = "cityTitle" title = "开通城市" />
                <div className = "city-show">北京</div>
                <div className = "select-period">
                    <TitleBar type = "periodTitle" title = "有效期" />
                    <div className = "radio-wrap">
                        <div className="radio-item">
                            <div className = "text">一个月</div>
                            <div className = "radio"></div>
                        </div>
                        <div className="radio-item">
                            <div className = "text">一个月</div>
                            <div className = "radio"></div>
                        </div>
                    </div>
                </div>
                <div className = "agree-wrap">
                    <div className="radio"></div>
                    同意并接受<Link to="rule">《百度外卖购卡协议》</Link>
                </div>
                <div className="buy-card">去支付 ￥30</div>
            </div>
        )
    }
}

export default Detail
