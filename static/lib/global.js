(function(root) {
    root.isWechat = (/micromessenger/.test(navigator.userAgent.toLowerCase())) ? true : false;
    root.isWMApp = (/wmapp/.test(navigator.userAgent.toLowerCase())) ? true : false;

    // wmapp ready
    root.WMAppReady = function(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            if (window.WMApp && typeof window.WMApp == 'object') {
                readyCallback();
            } else {
                document.addEventListener('WMAppReady', function() {
                    readyCallback();
                }, false)
            }
        }
    };
    // 新组件ready
    root.BNJSReady = function(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            if (window.BNJS && typeof window.BNJS == 'object' && BNJS._isAllReady) {
                readyCallback();
            } else {
                document.addEventListener('BNJSReady', function() {
                    readyCallback();
                }, false)
            }
        }
    };
    root.loadJS = function(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    // 微信环境加载 jssdk
    root.isWechat && root.loadJS('http://res.wx.qq.com/open/js/jweixin-1.0.0.js');

})(window)