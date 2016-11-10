/*
 * @file Loaading组件
 */
import React, { PropTypes, Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './index.less'
// 组装 Loading 组件
class Loading extends Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render() {
        return (
            <div>
               {
                   this.props.loading
                   ? <div>
                       <div id="loadingToast" className="weui_loading_toast">
                           <div className="weui_mask_transparent"></div>
                           <div className="weui_toast">
                               <div className="weui_loading">
                                   <div className="weui_loading_leaf weui_loading_leaf_0"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_1"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_2"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_3"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_4"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_5"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_6"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_7"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_8"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_9"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_10"></div>
                                   <div className="weui_loading_leaf weui_loading_leaf_11"></div>
                               </div>
                               <p className="weui_toast_content">加载中</p>
                           </div>
                       </div>
                       <div id="mask"></div>
                   </div>
                   : ''
               } 
            </div>
        )
    }
}
export default Loading