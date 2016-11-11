(function(root) {
    root.isWMApp = (/wmapp/.test(navigator.userAgent.toLowerCase())) ? true : false

    // wmapp ready
    root.WMAppReady = function(readyCallback) {
        if (readyCallback && typeof readyCallback == 'function') {
            if (window.WMApp && typeof window.WMApp == 'object') {
                readyCallback()
            } else {
                document.addEventListener('WMAppReady', function() {
                    readyCallback()
                }, false)
            }
        }
    }

})(window)