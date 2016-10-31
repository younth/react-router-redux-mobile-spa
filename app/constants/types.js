// 各种请求状态常量

// // 获取广告数据
// export const GET_ADLIST = 'GET_ADLIST'
// export const GET_ADLIST_REQUEST = 'GET_ADLIST_REQUEST'
// export const GET_ADLIST_SUCCESS = 'GET_ADLIST_SUCCESS'
// export const GET_ADLIST_FAILURE = 'GET_ADLIST_FAILURE'


// // 获取用户信息
// export const GET_USERINFO = 'GET_USERINFO'
// export const GET_USERINFO_REQUEST = 'GET_USERINFO_REQUEST'
// export const GET_USERINFO_SUCCESS = 'GET_USERINFO_SUCCESS'
// export const GET_USERINFO_FAILURE = 'GET_USERINFO_FAILURE'

// 在 Closure Compiler 的高级模式下，Object 的 key 会被压缩替换成更短的字符，这样就不能创建一个 key 跟 value 相等的 Object 了。
// keyMirror 就是解决这个问题的。

import keyMirror from 'fbjs/lib/keyMirror'

export default keyMirror({
	// 获取广告数据
	GET_ADLIST: null,
	GET_ADLIST_REQUEST: null,
	GET_ADLIST_SUCCESS: null,
	GET_ADLIST_FAILURE: null,
	// 获取用户信息
	GET_USERINFO: null,
	GET_USERINFO_REQUEST: null,
	GET_USERINFO_SUCCESS: null,
	GET_USERINFO_FAILURE: null,
})