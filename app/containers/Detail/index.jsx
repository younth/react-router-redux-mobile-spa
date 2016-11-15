/*
 * @file Detail 组件, 权益使用详情
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Utils from '../../util/util.js'

import './index.less'

import TitleBar from '../../components/TitleBar'
import Access from '../../components/Access'
import DiscountList from './DiscountList'
import AccessInfo from './AccessInfo'

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
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.times = ''
    }
    componentWillMount() {
        // 点击返回回到上一页
        Utils.setBack()

        Utils.setTitleBar({
            titleText: '优惠详情'
        })

        let {detail, cardActions} = this.props
        // 展示loading
        !detail.city_name && Utils.loading()
        // 获取权益id
        if (this.props.params.id) {
            this.privilegeNo = this.props.params.id
            // 获取提单页信息
            cardActions.getDiscountDetail({
                privilege_no: this.privilegeNo,
                limit: 10,
                page: 1
            })
        }
    }
    componentDidUpdate () {
    }
    render() {
        let {detail} = this.props
        if (!detail.loading) {
            Utils.loading(0)
            if (detail.errno) {
                Utils.showToast(detail.errmsg)
            }
        }
        return (
            <div>
                {
                    detail.city_name ? 
                    <div className = "detail-page">
                        <Access accessList = {detail.accessList} type = "discount-detail" />
                        <TitleBar type = "city-name" title = "开通城市" value = {detail.city_name || ''}/>
                        <TitleBar type = "valid_date" title = "有效时间" value = {detail.valid_date}/>
                        <TitleBar type = "access-title" title = "权益说明" />
                        <AccessInfo accessList = {detail.privilege_info}/>
                        <TitleBar type = "discount-title" title = "优惠明细" />
                        <DiscountList list = {detail.list} privilegeNo = {this.privilegeNo} />
                    </div>
                    : ''
                }
            </div>
        )
    }
}
