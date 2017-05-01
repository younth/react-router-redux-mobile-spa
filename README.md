## react+react-router+redux 移动端SPA webpack版本

### 安装

npm i --registry=https://registry.npm.taobao.org

### 主要包括能力：

- 基于webpack的编译
- 基于express的本地服务，并增加mock能力
- 支持热加载
- flexible移动端布局

### 接入`browser-sync` 

极大方便移动端调试，同时支持`mock`能力！

### 关于 hot-reload

我们拆分了一个 `app/containers/Root` 出来，所有Root相关的文件更新都 `布局更新` ，对应的系统的入口文件 `index.jsx` 的更新会重新刷新浏览器。

### todo:

- 增加postcss编译插件
- redux-thunk 升级为 redux-saga