/*
 * @file 公共弹出层组件 DialogModal
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import classNames from 'classnames'

import './index.less'

const transitionSpeed = 100

// 组装 DialogModal 组件
class DialogModal extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        if (this.props.show) {
            this.state = {
                opacity: 1,
                display: 'block',
                visibility: 'visible',
                show: this.props.show
            }
        } else {
            this.state = {
                opacity: 0,
                display: 'block',
                visibility: 'hidden',
                show: this.props.show
            }
        }
    }

    componentWillReceiveProps(props){
        if (this.props.show != props.show) {
            props.show ? this.fadeIn() : this.fadeOut()
        }
    }

    fadeIn(){
        this.setState({
            display: 'block',
            visibility: 'visible',
            show: true
        }, () => {
            setTimeout(()=> {
                this.setState({opacity: 1})
            }, 10)
        })
    }

    fadeOut(){
        this.setState({opacity: 0}, () => {
            setTimeout(() => {
                this.setState({show: false})
            }, transitionSpeed)
        })
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        // todo
        let modalStyle,
            { opacity, display, visibility } = this.state
        modalStyle = {
            opacity: opacity,
            display: display,
            visibility: visibility
        }

        return (
            <div style = { modalStyle } className = "modal">
                <div className = {classNames('modal-wrapper', this.props.el)}>
                    { this.props.title ? <div className = 'modal-header'>{ this.props.title }</div> : ''}
                    <div className = 'modal-cont'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogModal

