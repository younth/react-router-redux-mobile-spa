// 存储已经加载过的图片url
let _lazyloadData = []

// 判断一个src是否已经存储到 _lazyloadData 数组中了
export function isInLazyLoadList(src) {
    return _lazyloadData && _lazyloadData.indexOf(src) > 0
}

let bindTimeoutId;
let imgs;
let length;
let initTimeoutId;
let hash;

// scroll执行lazyload，该函数加载所有的图片
function loadImgs() {
    imgs = document.getElementsByTagName('img');
    length = imgs.length;
    let i, item;
    for (i = 0; i < length; i++) {
        item = imgs[i];
        if (item.getBoundingClientRect().top >  window.screen.height || item.getBoundingClientRect().bottom < 0) {
            // 两种情况下先暂时不管：第一，图片在浏览器视窗下面；第二，图片在浏览器视窗上面（返回的时候有这种情况）
            continue;
        }
        if (item.getAttribute('data-src') == null) {
            continue;
        }

        item.setAttribute('src', item.getAttribute('data-src'));
        item.removeAttribute('data-src');

        // 将图片url暂时存储下来，compoents/LazyLoadImg 组件将根据这个判断是否重新lazyload图片
        if (item.getAttribute('data-save') != null) {
            _lazyloadData.push(item.getAttribute('src'))

            // 及时清空，避免影响效率
            if (_lazyloadData.length > 500) {
                _lazyloadData = []
            }
        }
    }
}
function srcollCallback() {
    // 做scroll时候的节流
    if (bindTimeoutId) {
        clearTimeout(bindTimeoutId)
    }
    bindTimeoutId = setTimeout(loadImgs, 200)
}

export function bindLazyload() {
    // 清空数据
    bindTimeoutId = false
    window.removeEventListener('scroll', srcollCallback, false)
    // 重新绑定监听
    window.addEventListener('scroll', srcollCallback, false)
}

// 外面手动调用加载图片
export function trigglerLoadImgs() {
    // 做多次触发图片加载时候的节流
    if (initTimeoutId) {
        clearTimeout(initTimeoutId)
    }
    initTimeoutId = setTimeout(loadImgs, 500)
}
