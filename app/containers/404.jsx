import * as React from 'react'
import * as PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../components/Header'
import NotFound from '../components/NotFound'

class NotFoundPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header />
                <NotFound />
            </div>
        )
    }
}

export default NotFoundPage
