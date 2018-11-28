!function(window) {

    "use strict"

    var doc = window.document,
        docEle = doc.documentElement,
        viewport = doc.querySelector('meta[name=viewport]'),
        scale = 0,
        dpr = 0,
        m

    if (viewport) {
        // 根据视口配置设置缩放比例，而不是自适应。
        m = viewport.getAttribute('content').match(/initial-scale=([\d.]+)/)
        if (m) {
            scale = +m[1]
            dpr = ~~(1 / scale)
        }
    } else {
        m = window.navigator.userAgent.match(/iPhone|iPod|iPad/)
        if (m) {
            dpr = ~~window.devicePixelRatio
            dpr = dpr >= 3 ? 3 : dpr
            dpr = dpr <= 1 ? 1 : dpr
        } else {
            dpr = 1
        }
        scale = 1 / dpr

        viewport = doc.createElement('meta')
        viewport.setAttribute('name', 'viewport')
        viewport.setAttribute('content', ['initial-scale', 'maximum-scale', 'minimum-scale', 'user-scalable=no'].join('=' + scale + ', '))

        if (docEle.firstElementChild) {
            docEle.firstElementChild.appendChild(viewport)
            viewport = null
        }
    }

    var tid = null,
        rem = 12,
        forceRefresh = function() {
            // 刷新 dpr 对应的 rem 字号大小
            var w = docEle.getBoundingClientRect().width
            if (w / dpr > 540) {
                w = 540 * dpr
            }
            rem = w / 375 * 100
            docEle.style.fontSize = rem + 'px';
            window.viewportHeight = Math.round(docEle.clientHeight / rem * 1000) / 1000;
        },
        refresh = function() {
            clearTimeout(tid)
            tid = setTimeout(forceRefresh, 300)
        },
        px2rem = function(px) {
            return Math.round(parseInt(px) / rem * 1000) / 1000
        }

    window.addEventListener('resize', refresh, false)
    window.addEventListener('pageshow', refresh, false)

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
        doc.addEventListener('DOMContentLoaded', function() {
            doc.body.style.fontSize = 12 * dpr + 'px'
        }, false)
    }

    forceRefresh()
    docEle.setAttribute('data-dpr', dpr)
    ;(window.dpr === undefined) && (window.dpr = dpr)
    ;(window.px2rem === undefined) && (window.px2rem = px2rem);
}(window)