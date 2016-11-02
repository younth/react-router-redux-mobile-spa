/*
 * @file Home组件, 展示首页
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './title.less'
import './index.less'

import Mime from './Mime'
import Onsell from './Onsell'
import Loading from '../../components/Loading'

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
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount () {
        let {card, cardActions, globalActions} = this.props
        !card.data && cardActions.getUserInfo()

        globalActions.addressUpdate({
            lat: '1111',
            lng: '22222'
        })
    }
    render() {
        let {card} = this.props
        let user_privileges = [], city_privileges = []
        if (card.state === 2) {
            console.log('请求成功')
            console.log(card)
            user_privileges = card.user_privileges
            city_privileges = card.city_privileges
            // 更新全局数据
            globalActions.addressUpdate({
                isVip: card.isVip
            })
        } else if (card.state === 3) {
            console.log('请求失败')
        } else {
            console.log('还未请求')
        }
        return (
            <div>
                <Loading loading={card.loading}/>
                { user_privileges.length ? <Mime cardlist={user_privileges}/> : '' }
                { city_privileges.length ? <Onsell cardlist={city_privileges} /> : '' }
                <Link className="to-rule" to="rule">小度商城规则</Link>
            </div>
        )
    }
}

export default Home
