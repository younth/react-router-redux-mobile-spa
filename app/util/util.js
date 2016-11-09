/*
    工具类
 */

var Utils = {

    // 获取url中所有的参数
    getParams(url) {
        var vars = {},
            hash, hashes, i

        url = url || window.location.href

        // 没有参数的情况
        if (url.indexOf('?') == -1) {
            return vars
        }

        hashes = url.slice(url.indexOf('?') + 1).split('&')

        for (i = 0; i < hashes.length; i++) {
            if (!hashes[i] || hashes[i].indexOf('=') == -1) {
                continue
            }
            hash = hashes[i].split('=')
            if (hash[1]) {
                vars[hash[0]] = (hash[1].indexOf("#") != -1) ? hash[1].slice(0, hash[1].indexOf("#")) : hash[1]
            }
        }
        return vars
    },

    // 获取指定name的参数
    getParam(name, url) {
        return this.getParams(url)[name]
    },

    getCurrentParam(name) {
        return this.getParam(name, location.href)
    },

    // 设置头部信息及右上角按钮事件
    setTitleBar(cfg = {}) {
        window.WMAppReady(function() {
            window.WMApp.page.setTitleBar({
                titleText: cfg.titleText, // 标题
                actionText: cfg.actionText || ' ', // 右边操作文案，
                actionClickAble: cfg.actionClickAble || 0 // 是否可点击，0不可点，1可点，默认0
            })
            // 设置右侧按钮时，设置分享文案或者跳转链接
            cfg.actionClickAble && window.WMApp.entry.setPageAction('onActionClick', function() {
                cfg.shareParams ? window.WMApp.share.share(cfg.shareParams) : (location.href = cfg.url || 'javascript:;')
            })
        })
    },

    // 设置返回按钮操作
    setBack(cfg = {}) {
        window.WMAppReady(function() {
            cfg.type = cfg.type || 3
            window.WMApp.entry.setPageAction('onBack', function() {
                if (cfg.type === 1) {
                    // 关闭
                    return 1
                } else if (cfg.type === 3) {
                    // 返回
                    history.back()
                    return 0
                } else if (cfg.type === 2) {
                    // 跳转url
                    location.href = cfg.url
                    return 0
                }
            })
        })
    },

    openPage(linkUrl, pageData = {}, pageName = 'webview') {
        // 如果用NA的切壳，需要重新加载js，失去了单页面的溢出了
        let params = {
            pageName: pageName || 'home',
            pageParams: {
                url: encodeURIComponent(location.origin + linkUrl),
                header: 1,
                pageData: pageData
            }
        }
        window.WMApp.page.changePage(params)
    },

    // 显示loading 1(显示) 0(隐藏)
    loading(type = 1) {
        window.WMAppReady(function() {
            window.WMApp.nui.loading({
                show: type
            })
        })
    },

    // 封装toast方法
    showToast(text, speed = 'short') {
        window.WMApp.nui.toast({
            text: text,
            duration: speed
        })
    },

    alert(obj) {
        alert(JSON.stringify(obj))
    }

}

export default Utils