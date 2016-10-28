import React, { PropTypes, Component } from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'

import './style.less'

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        
        return (
            <header>
                <Link className="header-wrap" to="/about">header</Link>
            </header>
        )
    }

    toBack () {
        history.back();
    }
}

export default Header
