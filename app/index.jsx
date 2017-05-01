// 入口文件
import { AppContainer } from 'react-hot-loader'
import Redbox from 'redbox-react'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import Root from './containers/Root'

// 性能测试
if(process.env.NODE_ENV === 'development' || __DEV__) {
	require.ensure([], function(require) {
		const Perf = require('react-addons-perf')
		window.Perf = Perf
	}, 'perf');
}

const rootEl = document.getElementById('root')
// 创建 Redux 的 store 对象
const store = configureStore()

render(
    <AppContainer errorReporter={Redbox}>
    	<Root store={store} />
    </AppContainer>,
    rootEl
)

if (module.hot) {
  /**
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  const orgError = console.error; // eslint-disable-line no-console
  console.error = (message) => { // eslint-disable-line no-console
    if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
      // Log the error as normally
      orgError.apply(console, [message]);
    }
  };
  module.hot.accept('./containers/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/Root').default;
    render(
      <AppContainer errorReporter={Redbox}>
      	<NextApp store={store} />
      </AppContainer>,
      rootEl
    )
  });
}