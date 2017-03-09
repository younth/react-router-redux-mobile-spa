const path = require('path');

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack-dev-config';
import devtool from 'fly-devtool';// 本地开发server 能力

const app = new(require('express'))();
const port = 3000; // 监听的端口是3000
const compiler = webpack(config);

app.use(devtool({
    view_path: '', // 避免报错。
    rewrite_file: [path.join(__dirname, 'mock', 'server.conf')],
    data_path: [path.join(__dirname, 'mock')]
}))

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, // 不显示编译信息
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
