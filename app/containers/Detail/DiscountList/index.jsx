/*
 * @file 详情页订单展示组件 DiscountList
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames';

import { get } from '../../../fetch/request'

import DiscountItem from './DiscountItem'
import './index.less'

import * as cardActions from '../../../actions/card'

let docHeight = 0,
    winHeight = 0,
    elastic = wmflex.rem2px(wmflex.px2rem(47, 75))
// 组装 DiscountList 组件
const mapStateToProps = state => {
    return {
        detail: state.detail,
        globalVal: state.globalVal
    }
}
const mapDispatchToProps = dispatch => {
    return {
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
            loading: true,
            noMore: false,
            list: []
        }
        this.lock = false
        this.page = 1
        this.limit = 10
        this.needLoadMore = false
    }

    componentWillMount() {
        // 获取数据
        this.city_id = localStorage.getItem('city_id')
        // 获取首页数据
        this.getData()
    }

    componentDidMount() { }

    componentDidUpdate(prevProps, prevState) {
        if (this.needLoadMore) {
            // 重新计算页面滚动高度 和 页面高度
            docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
            winHeight = window.innerHeight
        }
        // 打开加载锁
        this.lock = false
    }

    doLoadmore() {
        if(!this.state.noMore && !this.lock) {
            this.lock = true
            this.page = this.page + 1
            // 获取分页数据
            this.getData()
        }
    }
    // 监听loadmore事件
    onListenerScroll() {
        // 首次计算页面滚动高度 和 页面高度
        docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        winHeight = window.innerHeight
        // 监听页面滚动
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop + winHeight + elastic >= docHeight ) {
                this.doLoadmore()
            }
        }, false)
    }
    // 获取数据
    getData() {
        let {globalVal} = this.props
        get('/wmall/privilege/promotiondetail', {
            ...globalVal,
            page: this.page,
            limit: this.limit,
            privilege_no: this.props.privilegeNo,
            city_id: this.city_id
        }).then(res => {
            return res.json()
        }).then(json => {
            let list = json.result.list
            // 判断是否需要进行滑动加载, 只有在list长度大于或等于每页限制时，才进行滑动加载
            if (this.page === 1 && list.length >= this.limit) {
                this.needLoadMore = true
                // 监听loadmore事件
                this.onListenerScroll()
            }
            if (list.length < this.limit) {
                // 全部加载完了
                this.setState({
                    noMore: true,
                    loading: false,
                    list: this.state.list.concat(list)
                })
            } else {
                this.setState({
                    list: this.state.list.concat(list)
                })
            }
        })
    }

    render() {
        return (
            <div>
            {
                this.state.list && this.state.list.length ? 
                <div className = "discount-wrap">
                    {this.state.list.map((item, index) => <DiscountItem data = {item} key = {index} />)}
                    {!this.needLoadMore ? '' : <div className = { classNames('loading-more', { hide: !this.state.loading }) }><i></i>努力加载中...</div>}
                    {!this.needLoadMore ? '' : <div className = { classNames('no-more', { hide: !this.state.noMore }) }>全部加载完了~</div>}
                </div>
                : <div className="discount-wrap">
                    <div className = "msg-tip">您还没有享受优惠哦~快去订餐吧</div>
                </div>
            }
            </div>
        )
    }
}

