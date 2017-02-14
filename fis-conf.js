/**
 * fis配置文件
 */

// 按需编译，根据入口index.html寻找依赖编译，按需加载，智能打包
fis.set('project.files', ['/index.html', '/mock/**']);

// mock数据，必须放在mock下面才生效，并且不编译
fis.match('/mock/**', {
    useCompile: false
})

// 采用 commonjs 模块化方案。需要 npm install fis3-hook-commonjs --save-dev
fis.hook('commonjs', {
    baseUrl: './app', // 默认为 . 即项目根目录。用来配置模块查找根目录
    extList: ['.js', '.jsx'] // 当引用模块时没有指定后缀，该插件会尝试这些后缀
});

fis.match('{/app/**.js,*.jsx}', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        optional: ["es7.decorators", "es7.classProperties"],
        stage: 2, // 为了支持解构赋值
        sourceMaps: false
    }),
    rExt: '.js'
});

fis.match('*.{css,less}', {
    postprocessor: fis.plugin('autoprefixer', {
        browsers: ['android 4', 'ios 6', 'last 1 Chrome versions', 'last 2 Safari versions'],
        'cascade': true
    })
});

fis.match('*.less', {
    parser: fis.plugin('less'),
    postprocessor: fis.plugin('px2rem', {
        remUnit: 75
    }, 'append'),
    rExt: '.css'
});

// fis3 中预设的是 fis-components，这里使用 fis3-hook-node_modules，所以先关了。
fis.unhook('components');
fis.hook('node_modules');

// 设置成是模块化 js
fis.match('/{node_modules,app}/**.{js,jsx}', {
    isMod: true
});

fis.match('*.{js,es,es6,jsx,ts,tsx}', {
    // 支持直接 require 'xxx.css' 直接 require 'xxx.png'等文件
    preprocessor: [
        fis.plugin('js-require-file'),
        fis.plugin('js-require-css')
    ]
});

fis.match('::package', {
    // 需要 npm install fis3-packager-deps-pack --save-dev
    // 测试环境发布相对目录，线上走CDN
    packager: fis.plugin('deps-pack', {
        // 将 /node_module 中的依赖项，打包成 static/pkg/webappreact/third.js
        'static/pkg/third.js': [
            // 将 /app/index.js 的依赖项加入队列，包含了 /app 中的依赖项 和 /node_modules 中的依赖项
            '/app/index.jsx:deps',
            // 移除 /app/** 只保留 /node_module 中的依赖项
            '!/app/**'
        ],

        // 将几个直接以<script>方式引用到 html 中的 js 文件（例如 fastclick.js、mod.js、百度统计的js等）打包成一个 lib.js ，减少http请求
        // js工具包，一般单独放在 static 文件夹下面
        'static/pkg/lib.js': '/static/**.js',

        // 在此打包 css，因为 fis.match('::packager') 配置的打包优先级更高
        'static/pkg/aio.css': '*.{less,css}',

        // 将 /app 中的依赖项，打包成 static/pkg/app.js
        'static/pkg/app.js': [
            // 将 /app/index.jsx 加入队列
            '/app/index.jsx',
            // 将 /app/index/jsx 的所有依赖项加入队列，因为第一步中已经命中了 /node_module 中的所有依赖项，因此这里只打包 /app 中的依赖项
            '/app/index.jsx:deps'
        ],
        
        'static/pkg/page.js': '/app/util/page.js',

        // 不好使
        'static/pkg/index.html': '/index.html'
    }),

    // 本项目为纯前端项目，所以用 loader 编译器加载 如果用后端运行时框架，请不要使用
    postpackager: fis.plugin('loader', {
        // source map 内联
        useInlineMap: true
    })
});

fis.media('publish')
    .match('*.{js,jsx}', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css')
    })
    .match('*.{js,css,jsx,es6,less}', {
        domain: ['//cdn.baidu.com']
    })
    // 定义modile的id，即打包之后的代码中的 `defind('node_module/react/lib/index.js')`这种相对路径改为 `define('xxxxxx')` 这种ID的形式
    // 这个配置是上线之后又作为优化配置上去的，会是打包的代码更小一些
    .match('/{node_modules,app}/**.{js,jsx}', {
        moduleId: function(m, path) {
            return fis.util.md5(path);
        }
    })
    .match('*.{js,css,png,jpg,jpeg,gif}', {
        useHash: true
    });