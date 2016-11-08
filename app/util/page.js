window.WMApp = {}
window.WMApp.page = {}
window.WMApp.entry = {}
window.WMApp.nui = {}
window.WMApp.account = {}
window.WMApp.network = {}
window.WMApp.pay = {}
window.WMApp.share = {}
window.WMApp.location = {}
window.WMApp.device = {}
window.WMApp.address = {}
window.WMAppReady = function(readyCallback) {
    if (readyCallback && typeof readyCallback == 'function') {
        if (window.WMApp && typeof window.WMApp === 'object') {
            readyCallback()
        } else {
            document.addEventListener('WMAppReady', function() {
                readyCallback()
            }, false)
        }
    }
}

window.WMApp.page.openPageRefresh = function() {

}

window.WMApp.page.changePage = function() {
    console.log('link')
}

window.WMApp.entry.setPageAction = function() {

}

window.WMApp.page.hidePageRefresh = function() {

}
window.WMApp.page.setTitleBar = function(cfg) {
    document.title = cfg.titleText
}

window.WMApp.nui.loading = function(type = 1) {
    console.log(type)
}

window.WMApp.nui.toast = function(cfg) {
    console.log(cfg.text)
}
window.WMApp.account.getUserInfo = function() {

}
window.WMApp.account.login = () => {
    console.log('请登录')
}
window.WMApp.network.getNetwork = function(callback) {
    callback({
        status: 1
    })
}
window.WMApp.pay.doPay = function(param, callback) {
    callback({
        status: 1
    })
}
window.WMApp.share.share = function(params) {
    console.log(params)
}
window.WMApp.network.getNetwork = function(callback) {
    callback({
        status: 1,
        result: {
            network: 'mobile'
        }
    })
}
window.WMApp.nui.dialog = function(params, callback) {
    callback({
        status: 1
    })
}
window.WMApp.location.getLocLng = window.WMApp.location.getLocLat = window.WMApp.location.getCityId = function() {
    return null
}
window.WMApp.device.getAppVersion = function() {
    return '3.9.0'
}
window.WMApp.device.getFrom = function() {
    return 'na-iphone'
}
window.WMApp.address.selectAddress = function(params, callback) {
    
}