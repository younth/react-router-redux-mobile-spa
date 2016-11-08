/*
 * @file Detail 组件, 权益使用详情
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import './index.less'

import TitleBar from '../../components/TitleBar'
import Access from '../../components/Access'
import DiscountList from './DiscountList'
import AccessRule from './AccessRule'

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
        let {detail, cardActions} = this.props
        detail.loading && cardActions.getDiscountDetail()
    }
    render() {
        let {detail} = this.props
        return (
            <div className = "detail-page">
                <Access accessList = {detail.accessList} type = "discount-detail" />
                <TitleBar type = "city-name" title = "开通城市" value = {detail.city_name || ''}/>
                <TitleBar type = "end-time" title = "有效期至" value = {detail.end_time || ''}/>
                <TitleBar type = "access-title" title = "权益说明" />
                <AccessRule accessList = {detail.privilege_rule}/>
                <TitleBar type = "discount-title" title = "优惠明细" />
                <DiscountList list = {detail.list} />
            </div>
        )
    }
}

export default Detail
