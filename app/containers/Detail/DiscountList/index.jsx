/*
 * @file 详情页订单展示组件 DiscountList
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames';

import DiscountItem from './DiscountItem'
import './index.less'

import * as globalActions from '../../../actions/globalVal'
import * as cardActions from '../../../actions/card'

let docHeight = 0,
    winHeight = 0
// 组装 DiscountList 组件
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
export default class DiscountList extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            lock: false,
            loading: false,
            page: 1,
            limit: 10,
            list: []
        }
    }

    componentDidMount() {
        // 首次计算页面滚动高度 和 页面高度
        docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        winHeight = window.innerHeight
        // 监听页面滚动
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop + winHeight + 110 >= docHeight ) {
                this.doLoadmore()
            }
        }, false)
    }

    componentDidUpdate(prevProps, prevState) {
        // 重新计算页面滚动高度 和 页面高度
        docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        winHeight = window.innerHeight

        let {detail} = this.props
        if (this.state.list.length === 0) {
            // state初次赋值（首页数据）
            this.state.list = this.props.list
        } else {
            console.log('concat');
            this.state.list = this.state.list.concat(detail.list)
        }

        // 打开加载锁
        this.state.lock = false
        console.log('打开加载锁');
    }

    doLoadmore() {
        console.log('doLoadmore lock:', this.state.lock);
        if(!this.state.lock) {
            this.state.lock = true
            this.setState({
                loading: true
            })
            let {cardActions} = this.props
            cardActions.getMoreDiscountList({
                page: ++this.state.page,
                limit: this.state.limit
            })
        }
    }

    render() {
        let {detail} = this.props
        if (this.state.list.length === 0) {
            // state初次赋值（首页数据）
            this.state.list = this.props.list
        }
        return (
            <div className="discount-wrap">
            {
                this.state.list && this.state.list.length ? 
                this.state.list.map((item, index) => <DiscountItem data = {item} key = {index} />)
                : <div className="msg-tip">您还没有享受优惠哦~快去订餐吧</div>

            }
            <div className = { classNames('more-loding', { hide: !this.state.loading }) }>加载中...</div>
            </div>
        )
    }
}

export default DiscountList
