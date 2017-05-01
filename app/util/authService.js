// auth 信息

export function redirectToBack(nextState, replace) {
    //已经登录则不进入
    replace(null, '/')
}
export function redirectToLogin(nextState, replace) {
    // redirect a new url
    console.log('enter');
    // replace(null, '/')
}

export function updateHandle () {
	console.log('update');
}