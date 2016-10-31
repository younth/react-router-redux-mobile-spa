# 小度商城前端技术方案

## 项目背景
    
    针对会员二期的数据，产品上做出新的会员规划及调整，以商城的形式展现，本次主要做小度商城1.0版本。


## h5 部分

### 主要目标

- 组件化，良好的拓展性
- 稳定清晰的数据状态管理
- 前端路由管理
- 高效便捷的开发、部署及联调
- 较高的性能
- https

### 技术选型

结合之前会员二期，本次继续沿用react技术栈，并做较大的技术优化升级，提高开发效率、可维护性与页面性能。

#### 1. 前端框架: react 技术栈

- React
- Reflex -> Redux
- React-router
- 基于React的同构


#### 2. 构建工具：fekey

##### 为什么不是 webpack ?

- 依赖的插件多，不清楚构建细节，与目前已有插件融合较差
- 产出包可控性较差，缓存机制不好
- 联调复杂
- 上手成本较高

##### 以fekey作为构建的优势

- 目前fekey已支持各项react技术栈构建能力
- 构建流程可控，产出文件可定制，根据内容的md5机制得以实施
- fekey release 实现联调
- fekey核心仍然是fis，统一构建工具，减少人力成本


```
// 智能打包
fis.match('::packager', {
    packager: fis.plugin('deps-pack', {
         useSourceMap : false,
        // ---------按需打包js文件---------
        'static/vip/third.js': [
            '/client/scripts/index.js:deps',
            '!/client/scripts/**'
        ],
        'static/vip/app.js': [
            '/client/scripts/index.js',
            '/client/scripts/index.js:deps'
        ]
    })
});
```

#### 3. 数据流：redux

> 单向数据流，统一状态树

数据在系统中是如何传递的。这里的数据分为两种

- 第一种可以称之为`系统数据`，和业务无关的，一般任何系统中都会有。例如会员基础信息等，这个的特点就是符合单例模式，全局共用一套。
- 第二种可以称之为`业务数据`，每个页面都可能不一样。比如卡片详情，购买卡片请求数据。

针对这两种不同的数据，当然要分开处理。针对第一种“系统数据”，系统一初始化就立即获取，然后交给Redux做管理，这也符合Redux的特点。而针对第二种“业务数据”，那就什么时候用，就什么时候获取。

![image](http://wangfupeng.coding.me/imgs/138012-20160810170424496-2136848140.png)

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

### 前后端分离 + 首屏渲染（NodeUI）

> 本次的开发模式为：后端提供纯接口服务，路由及渲染nodeui来做。

#### 前后端分离

- 独立开发，提高效率
- 基于接口数据的mock


#### nodeui实现首屏渲染

将首屏需要的数据，直接传递给redex,解决首屏闪白问题。


![render](https://cloud.githubusercontent.com/assets/10385585/15856812/996ecf24-2cea-11e6-87e2-401cf4cccbc4.png)

### 业务中的组件化具体拆分

>以小度商城首页为例，划分功能及业务组件。



### 上线


```
// 上线脚本

#project目录
    PROJECT_ROOT=$PWD
    modulename=`basename $PWD`
    outputdir=$PROJECT_ROOT/output
    moduledir=$PROJECT_ROOT/output/$modulename
    rm -rf $outputdir
    fekey release production -cd $moduledir --no-color
    cd $moduledir
    rm -rf static/vip/node_modules static/vip/styles static/vip/scripts static/vip/static
    tar -czvf $outputdir/vip.tar.gz ./
    cd $outputdir
    rm -rf $modulename
    
```

### 开发
- 安装依赖包 npm i --registry=https://registry.npm.taobao.org
- 启动fis3 server服务 fis3 server start
- 查看项目信息 fis3 server info
- 打开fis3 server地址 fis3 server open  
- 将代码推到fis3 server www文件中 fis3 release -cwL 修改代码可以自动刷新浏览器
- 项目链接 http://172.17.101.144:8080/
- 代码规范检查 npm run lint







