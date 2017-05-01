/*
 * @file Home组件, 展示首页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { get, post } from '../../fetch/request'

import Utils from '../../util/util.js'
import localStorage from '../../util/localStorage.js'

import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'
import ImgTip from '../../components/ImgTip'
import DialogModal from '../../components/DialogModal'

import * as globalActions from '../../actions/globalVal'
import * as cardActions from '../../actions/card'

const mapStateToProps = state => {
    return {
        card: state.card,
        baseInfo: state.baseInfo,
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
export default class Home extends Component {

    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
        this.state = {
            show: false
        }
    }

    componentWillMount() {
        // 只有首次进入的时候展示loading，或者其他条件，判断webappLocationFrom的来源是提单页面，也开loading
        // this.props.location.key === Home.locationKey 代表饭hi
        if(this.props.location.key !== Home.locationKey && !window.webappLocationFrom) {
            Utils.loading()
        }
        // 获取支付状态
        let {baseInfo} = this.props
        if (baseInfo.payResult === 'success') {
            this.state.show = true
        }
        // 点击返回直接关闭
        Utils.setBack({type: 1})
        Utils.setTitleBar({
            titleText: 'fis3+react+redux单页面架构'
        })
    }

    componentWillUnmount() {
        // 组件销毁时候，记录 location.key
        Home.locationKey = this.props.location.key;
    }

    componentDidMount() {
        let {card, cardActions, globalActions} = this.props
        globalActions.addressUpdate({
            city_id: '131',
            lng: '1.295948313E7',
            lat: '4849489.98',
            app_ver: '4.1.0',
            from: 'na-iphone'
        })
        cardActions.getHomeCard()
        localStorage.setItem('city_id', '131')
    }

    componentDidUpdate() {
        let {card} = this.props
        if (!card.loading) {
            Utils.loading(0)
        }
    }

    hideDialog() {
        let {cardActions, globalActions} = this.props
        // 重新获取首页数据
        cardActions.getHomeCard()
        // 关闭弹框
        this.setState({
            show: false
        })
        // 设置支付结果为空
        globalActions.savePayResult({
            payResult: ''
        })
    }

    // 统一管理点击按钮
    clickBtn(type, privilege_no, toastText) {
        // 这里跳转链接，跳转到的页面需要有动画效果，而且只有这里跳过过去的才允许有动画效果，其他地方跳转的不允许
        // 因此，每次跳转之前，都先记录一下当前时间，然后再在跳转到的页面判断时间是否是刚才发生的，再判断是否要动画效果
        window._animateLinkTime = Date.now()
        let {card, cardActions} = this.props
        if (card.isLogin) {
            if (type === 'detail') {
                // 详情页提前展示loading
                Utils.loading()
                // 通用: 开通或续费 跳到提单页
                hashHistory.push(`/detail/${privilege_no}`)
            } else if (type === 'buy' || type === 'renew') {
                // 提单页提前展示loading
                Utils.loading()
                // 通用: 开通或续费 跳到提单页
                hashHistory.push(`/confirm/${privilege_no}`)
            }
        }
    }

    render() {
        let { card } = this.props
        return (
            <div>
                { card.userPrivileges && <Mime cardList = {card.userPrivileges} isVip = {card.isVip} clickBtn = {this.clickBtn}/> }
                { card.cityPrivileges && <Onsell cardList = {card.cityPrivileges} isNew = {card.isNew} cityName = {card.cityName} clickBtn = {this.clickBtn}/> }
                { card.cityPrivileges && <Link className="to-rule" to = "rule">配送折扣卡规则</Link> }
                <DialogModal show = {this.state.show} el = 'pay-success-dialog' closeOnOuterClick = {false}>
                    <div className = "pay-success-img"></div>
                    <div className = "pay-success-msg">购买成功，享受权益</div>
                    <footer>
                        <a href = "javascript:;" onClick = {this.hideDialog}>关闭</a>
                    </footer>
                </DialogModal>
            </div>
        )
    }
}
