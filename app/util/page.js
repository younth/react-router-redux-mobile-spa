window.WMApp = {};
WMApp.page = {};
WMApp.entry = {};
WMApp.nui = {};
WMApp.account = {};
WMApp.network = {};
WMApp.pay = {};
WMApp.share = {};
WMApp.location = {};
WMApp.device = {};
(function(root) {
    root.WMAppReady = function(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            if (root.WMApp && typeof root.WMApp === 'object') {
                readyCallback();
            } else {
                document.addEventListener('WMAppReady', function() {
                    readyCallback();
                }, false)
            }
        }
    };

    WMApp.page.openPageRefresh = function() {

    }

    WMApp.page.changePage = function() {
        console.log('link');
    }

    WMApp.entry.setPageAction = function() {

    }

    WMApp.page.hidePageRefresh = function() {

    }
    WMApp.page.setTitleBar = function(cfg) {
        document.title = cfg.titleText;
    }

    WMApp.nui.loading = function(type = 1) {
        console.log(type);
    }

    WMApp.nui.toast = function(cfg) {
        console.log(cfg.text);
    }
    WMApp.account.getUserInfo = function() {

    }
    WMApp.account.login = () => {
        console.log('请登录');
    }
    WMApp.network.getNetwork = function(callback) {
        callback({
            status: 1
        });
    }
    WMApp.pay.doPay = function(param, callback) {
        callback({
            status: 1
        })
    }
    WMApp.share.share = function(params) {
        console.log(params);
    }
    WMApp.network.getNetwork = function(callback) {
        callback({
            status: 1,
            result: {
                network: 'mobile'
            }
        })
    }
    WMApp.nui.dialog = function(params, callback) {
        callback({
            status: 1,
        })
    }
    WMApp.location.getLocLng = WMApp.location.getLocLat = WMApp.location.getCityId = function() {
        return null;
    }
    WMApp.device.getAppVersion = function() {
        return '3.9.0';
    };
})(window);