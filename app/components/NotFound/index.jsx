import * as React from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import './style.less'

class NotFound extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="notfoud-container">
                <div className="img-404">
                </div>
                <p className="notfound-p">哎呀迷路了...</p>
                <div className="notfound-reason">
                    <p>可能的原因：</p>
                    <ul>
                        <li>原来的页面不存在了</li>
                        <li>我们的服务器被外星人劫持了</li>
                    </ul>
                </div>
                <div className="notfound-btn-container">
                    <Link to="/" className="notfound-btn">返回首页</Link>
                </div>
            </div>
        )
    }
}

export default NotFound
