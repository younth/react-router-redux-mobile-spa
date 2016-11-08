/*
 * @file Confirm 组件, 提交订单页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'

import Utils from '../../util/util.js';
import { get } from '../../fetch/request'

import './index.less'

import TitleBar from '../../components/TitleBar'
import Access from '../../components/Access'
import RadioList from '../../components/RadioList'
import Agree from '../../components/Agree'
import DialogModal from '../../components/DialogModal'

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
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.changePeriod = this.changePeriod.bind(this)
        this.changeAgree = this.changeAgree.bind(this)
        this.buyCard = this.buyCard.bind(this)
        this.state = {
            selectCityId: 0,
            selectCityName: '',
            lastCityId: 0,
            laseCityName: '',
            accessTitle: '本卡权益',
            period: 0, // 选择卡规格天数
            price: 0, // 支付金额
            isAgree: true, // 默认不选中
            show: false // 城市提示框
        }
    }
    componentWillMount() {
        let {confirm, cardActions} = this.props
        // 展示loading
        if (confirm.loading) {
            Utils.loading()
        }
        // 获取权益id
        if (this.props.params.id) {
            // 获取提单页信息
            cardActions.getConfirmInfo({
                privilege_no: this.props.params.id
            })
        }
    }

    componentDidMount () {

    }

    componentDidUpdate () {
    }

    changePeriod (period, price) {
        this.setState({
            period: period,
            price: price
        })
    }

    changeAgree(isAgree) {
        this.setState({
            isAgree: isAgree
        })
    }

    doPay(params) {
        WMApp.pay.doPay(params, function(data) {
            if (data.status) {
                console.log('支付成功')
                hashHistory.push('/home/success')
            } else {
                console.log('支付失败')
            }
        })
    }

    buyCard() {
        // 1. 检查信息完整度
        if (!this.state.period) {
            Utils.showToast('请选择卡片规格')
            return false
        }
        if (!this.state.isAgree) {
            Utils.showToast('请确认《百度外卖购卡协议》')
            return false
        }
        // 2. 判断购卡城市与当前城市是否一致
        
        // 3. 拼装数据
        let {globalVal} = this.props
        let params = {
            ...globalVal,
            period: this.state.period,
            pay_type: 2 // 聚合收银台
        }
        // 4. 生成订单
        get('/wmall/privilege/buy').then(res => {
            return res.json()
        }).then(json => {
            let result = json.result
            // 5. 判断网络环境
            let params = {
                payType: 2,// 1表示钱包，2表示聚合收银台
                payParams: result.pay_params   // 聚合收银台服务端下发的是json串，不需要encode
            }
            WMApp.network.getNetwork((data) => {
                if (data.status && data.result.network === 'unreachable') {
                    Utils.showToast('网络不可用');
                } else {
                    // 6. 进行聚合收银台支付
                    this.doPay(params)
                }
            })
        })
    }

    sendPayInfo() {
        // 生成支付订单
    }

    changeCity () {
        // 调端内更改地址API
    }
    render() {
        console.log('loading' + this.props.confirm.loading);
        let {confirm} = this.props
        if (!confirm.loading) {
            Utils.loading(0)
            this.state.accessTitle = `本卡权益（${confirm.data.city_name || ''}）`
            if (this.state.period === 0) {
                this.state.period = confirm.radioList[0].period
                this.state.price = confirm.radioList[0].price
                this.state.selectCityId = 0
                this.state.selectCityName = ''
                this.state.lastCityId = 0
                this.state.laseCityName = ''
            }
        }
        return (
            <div className = "confirm-page">
                <TitleBar type = "access-title" title = {this.state.accessTitle}/>
                <Access accessList = {confirm.accessList} type = "privilege-detail"/>
                <TitleBar type = "period-title" title = "有效期" />
                <RadioList radioList = {confirm.radioList} selected = {this.state.period} onSelectedValueChanged = {this.changePeriod}/>
                <Agree isAgree = {this.state.isAgree} onSelectedValueChanged = {this.changeAgree}/>
                <div className = "buy-card" onClick = {this.buyCard} >去支付 ￥{this.state.price}</div>
                <DialogModal show = {this.state.show} el = 'city-tip-dialog' title = '温馨提示' closeOnOuterClick = {false}>
                    <div className="tipmsg-wrap">
                        <p>您当前开通享有权益的城市是<span>北京</span>，</p>
                        <p>如需更换请到首页更改定位</p>
                    </div>
                    <footer>
                        <a href="javascript:;" onClick = {this.changeCity}>更改城市</a>
                        <a href="javascript:;" onClick = {this.sendPayInfo}>确认</a>
                    </footer>
                </DialogModal>
            </div>
        )
    }
}

export default Confirm
