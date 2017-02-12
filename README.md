# fis3+react+redux单页面应用



#### 4. 数据请求

##### 直接请求

这种形式，直接在业务的请求回调中处理。

- 系统数据，通过action的方法修改store的值
- 业务数据，更改业务组件的state值


```
getData().then(res => {
    return res.json()
}).then(json => {
    if (json.errno !== 0) {
        console.error('errno:' + json.errno);
        return;
    }
    var data = json.data;
    // 通过回调，更新系统数据
    this.props.collectlistActions.update(news)
    // 更改业务数据
    this.setState({hotnews: json.data.slice(1, 4)})
})

```

##### redux-thunk 中间件形式

```
// 调用
actions.getCardList()

//获取标签列表.
export const getCardList = () =>{
  return {
    type: types.Card_LIST,
    promise: api.getTagList()
  }
}

// cardList reducer

import { TAG_LIST_SUCCESS, TAG_LIST_FAILURE } from '../actions/types'
import { createReducer } from 'redux-immutablejs'
import {List} from 'immutable'

// 这个更新了store
export default createReducer(List(), {
  [TAG_LIST_SUCCESS]: (state, {json}) => state.merge(json.data),
  [TAG_LIST_FAILURE]: (state) => state
})

// 更新store之后，会重新render
```

### 组件化设计

要降低系统设计的复杂度，前端目前最好的方式就是组件化。将系统划分成若干个页面，然后将每个页面都划分成若干个组件，还要抽象出多个页面中都会用到的通用组件，这是第一步。接下来要看组件和组件之间如何传递数据，即数据管理和状态管理该如何做。下面我们就从这两个方面来分先一下新闻webapp该如何设计。

#### 从 router 到 page 再到 component

![page](http://wangfupeng.coding.me/imgs/138012-20160810160249527-576807060.png)

但是最后在开发过程中忽略了一个问题，就是一些复杂页面，光这种“页面 - 组件”的形式是不够的，应该在加一个subpage层，这样就扩展性更好一些了。如下图：

![subpage](http://wangfupeng.coding.me/imgs/138012-20160810161424090-557619220.png)

总结：一个项目总会遇到个别的比较复杂的页面，因此这种page - subpage - component会更加合理一些，其中的subpage在不需要的时候省略掉就是了。

##### 迁移promise管理

- 更新的是`系统数据`，在有promise字段的时候才交给中间件处理
- 保证原有的请求方式
- 增加新的请求更新方式，直接更新store


### 项目目录结构

```
dumall
  ├─ node_modules   (npm模块)  
  ├─ app    (工程模块)
  │  ├─ actions  (获取数据并流向stores)
  │  │  └─ more
  │  ├─ components (组件)
  │  │  └─ more
  │  ├─ reducers  (每个store)
  │  │  ├─ index
  │  │  └─ detail
  │  └─ containers (页面)
  │     ├─ header
  │     └─ footer
  │  └─ router       (路由)
  │     ├─ cardDetail
  ├─ static    (非业务相关资源)
  │  ├─ lib  
  │  ├─ img
  │  ├─ js
  │  ├─ css
  ├─ config (配置)
     └─ server.conf （mock数据）
  ├─ fekey-conf.js   (fekey6编译配置)
  ├─ .eslintrc.json   (eslint配置)
  ├─ index.html   (入口文件)
  ...

```


#### 前后端分离

- 独立开发，提高效率
- 基于接口数据的mock


