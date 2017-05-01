// 抽离root root相关的更新都会触发hot reload
import React from 'react'
import { Provider } from 'react-redux'

// 获取 route 配置
import routes from '../router'

import '../../static/styles/common.less'

const Root = ({ store, history }) => (
  <Provider store={store}>
    {routes}
  </Provider>
)

export default Root