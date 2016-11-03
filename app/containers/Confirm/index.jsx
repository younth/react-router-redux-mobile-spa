/*
 * @file Confirm 组件, 提交订单页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'

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
export default class Confirm extends Component {
    static propTypes = {
        globalActions: PropTypes.object.isRequired,
        cardActions: PropTypes.object.isRequired,
        demoActions: PropTypes.object.isRequired
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
        let {card, cardActions, globalActions} = this.props
        !card.data && cardActions.getHomeCard()

        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }
    render() {
        let {card} = this.props
        let userPrivileges = [], cityPrivileges = []
        if (card.errno === 0) {
            // 隐藏loading状态 todo
            // loading(0)
            // console.log('请求成功')
            userPrivileges = card.userPrivileges
            cityPrivileges = card.cityPrivileges
            // 更新全局数据
            globalActions.addressUpdate({
                isVip: card.isVip
            })
        }
        return (
            <div>
                { userPrivileges && <Mime cardlist={userPrivileges}/> }
                { cityPrivileges && cityPrivileges.length && <Onsell cardlist={cityPrivileges} isVip={card.isVip} /> }
                <Link className="to-rule" to="rule">小度商城规则</Link>
            </div>
        )
    }
}

export default Confirm
