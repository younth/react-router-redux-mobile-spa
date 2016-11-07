/*
 * @file Home组件, 展示首页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import Utils from '../../util/util.js';

import './title.less'
import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'
import ImgTip from '../../components/ImgTip'
import DialogModal from '../../components/DialogModal'

import * as demoActions from '../../actions/demo'
import * as userInfoActions from '../../actions/userinfo'
import * as globalActions from '../../actions/globalVal'
import * as cardActions from '../../actions/card'

const mapStateToProps = state => {
    return {
        card: state.card,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
        demoActions: bindActionCreators(demoActions, dispatch),
        globalActions: bindActionCreators(globalActions, dispatch),
        cardActions: bindActionCreators(cardActions, dispatch)
    }
}
// React & Redux 绑定
@connect(mapStateToProps,mapDispatchToProps)
export default class Home extends Component {
    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired,
        demoActions: PropTypes.object.isRequired
    }
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.hideDialog = this.hideDialog.bind(this)
        this.state = {
            show: true
        }
    }
    compontentWillMount() {
        window.WMApp.page.setTitleBar = function(cfg) {
            document.title = '111'
        }
        // 展示loading状态 todo
        // loading()
    }
    componentDidMount () {
        let {card, cardActions, globalActions} = this.props
        !card.data && cardActions.getHomeCard()

        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }
    hideDialog() {
        this.setState({
            show: false
        })
        // 关闭对话框不代表页面最新 应该重新加载并且关掉对话框
    }
    render() {
        let {card} = this.props
        let userPrivileges = [], cityPrivileges = []
        console.log(card);
        if (card.errno === 0) {
            // 隐藏loading状态 todo
            // loading(0)
            // console.log('请求成功')
            userPrivileges = card.userPrivileges || {} // [valid = [{}, {}, {}], expired = [{}, {}, {}]]
            cityPrivileges = card.cityPrivileges || [] // [{}, {}, {}]
            console.log(cityPrivileges.length);
            // 更新全局数据
            globalActions.addressUpdate({
                isVip: card.isVip
            })
        }
        // 获取支付状态
        let hashArr = location.hash.split('/'),
            result = hashArr[hashArr.length - 1]
        let paySuccess = result.indexOf('success') === -1 ? false : true
        return (
            <div>
                { userPrivileges && <Mime cardList = {userPrivileges} isVip = {card.isVip} /> }
                { cityPrivileges && <Onsell cardList = {cityPrivileges} /> }
                <Link className = "to-rule" to = "rule">配送折扣卡规则</Link>
                {
                    paySuccess ? 
                    <DialogModal show = {this.state.show} el='pay-success-dialog' title='购买成功' closeOnOuterClick={false}>
                        <div className="pay-success-img"></div>
                        <div className="pay-success-msg">购买成功，享受权益</div>
                        <footer>
                            <a href="javascript:;" onClick = {this.hideDialog}>关闭</a>
                        </footer>
                    </DialogModal> : ''
                }
            </div>
        )
    }
}

export default Home
