import * as React from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../../components/Header'

import * as demoActions from '../../actions/demo'
import * as userInfoActions from '../../actions/userinfo'

import {get} from '../../fetch/get'


class User extends Component {

    static propTypes = {
        userinfo: PropTypes.object.isRequired,
        demoActions: PropTypes.object.isRequired,
        userInfoActions: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            
        }
    }
    render() {
        let {userinfo} = this.props;
        if (userinfo.data && userinfo.data.data) {
            console.log('数据已经请求过了~')
            console.log(userinfo.data.data)
        } else {
            console.log('还未请求')
        }
        return (
            <div id="userinfo_view">
                <Header />
                <h2>会员中心</h2>
                
            </div>
        )
    }

    componentDidMount () {
        let {userinfo, userInfoActions} = this.props
        !userinfo.data && userInfoActions.getUserInfo()
        // 普通的业务请求
        
        // get('/api/user').then(res => {
        //     return res.json()
        // }).then(json => {
        //     console.log(json.data);
        // });
    }
}

// -----------------------React & Redux 绑定-----------------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        demoActions: bindActionCreators(demoActions, dispatch),
        userInfoActions: bindActionCreators(userInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)
