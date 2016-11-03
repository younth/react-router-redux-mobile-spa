/*
 * @file Confirm 组件, 提交订单页
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
        confirm: state.confirm,
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
export default class Confirm extends Component {
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
        let {confirm, cardActions, globalActions} = this.props
        !confirm.data && cardActions.getConfirmInfo()
        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }
    render() {
        let {confirm} = this.props
        console.log(confirm);
            // 隐藏loading状态 todo
            // loading(0)
            // 更新全局数据
            // globalActions.addressUpdate({
            //     isVip: card.isVip
            // })
        return (
            <div className = "confirmPage">
                <TitleBar type = "accessTitle" title = "本卡特权" />
                <Access />
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

export default Confirm
