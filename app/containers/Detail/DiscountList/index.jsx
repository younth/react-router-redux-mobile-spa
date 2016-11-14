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
            loading: true,
            noMore: false,
            page: 1,
            list: []
        }
        this.lock = false
        this.limit = 3
        this.needLoadMore = false
    }

    componentWillMount() {
        // 获取数据
        // this.privilege_no = this.props.params.id
        this.city_id = localStorage.getItem('city_id')
        
    }

    componentDidMount() {
        // 判断是否需要进行滑动加载
        // 只有在list长度大于或等于每页限制时，才进行滑动加载
        if (this.needLoadMore) {
            // 首次计算页面滚动高度 和 页面高度
            docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
            winHeight = window.innerHeight
            // 监听页面滚动
            window.addEventListener('scroll', () => {
                if (document.body.scrollTop + winHeight >= docHeight ) {
                    this.doLoadmore()
                }
            }, false)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // 重新计算页面滚动高度 和 页面高度
        docHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        winHeight = window.innerHeight

        // 打开加载锁
        this.lock = false
        // console.log(this.props.params); // 这里取不到url参数，不知道为什么
    }

    doLoadmore() {
        let {globalVal} = this.props
        if(!this.state.noMore && !this.lock) {
            this.lock = true
            this.setState({
                loading: true
            })
            // 获取分页数据
            get('/wmall/privilege/promotiondetail', {
                ...globalVal,
                page: ++this.state.page,
                limit: this.limit,
                privilege_no: this.props.privilegeNo,
                city_id: this.city_id
            }).then(res => {
                return res.json()
            }).then(json => {
                let list = json.result.list
                if (list.length < this.limit) {
                    // 全部加载完了
                    this.setState({
                        noMore: true,
                        loading: false
                    })
                } else {
                    this.setState({
                        list: this.state.list.concat(list)
                    })
                }
            })
        }
    }

    render() {
        let {detail} = this.props
        if (this.state.list.length === 0) {
            // state初次赋值（首页数据）
            this.state.list = this.props.list
        }
        if (this.state.list.length >= this.limit) {
            this.needLoadMore = true
        }
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

