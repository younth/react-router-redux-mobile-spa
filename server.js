/**
 * server依赖 browser-sync 支持移动端同步调试
 * 支持数据mock能力
 */
const path = require('path');

import browserSync from 'browser-sync';
// Required for react-router browserHistory
import historyApiFallback from 'connect-history-api-fallback';
import devtool from 'express-devtool'; // 本地开发mock能力
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack-dev-config';

const bundler = webpack(config);

// Run Browsersync and use middleware for Hot Module Replacement
browserSync({
    port: 5008,
    ui: {
        port: 5009
    },
    server: {
        baseDir: 'app',

        middleware: [
            devtool({
                view_path: '', // 避免报错。
                rewrite_file: [path.join(__dirname, 'mock', 'server.conf')],
                data_path: [path.join(__dirname, 'mock')]
            }),
            historyApiFallback(),

            webpackDevMiddleware(bundler, {
                // Dev middleware can't access config, so we provide publicPath
                publicPath: config.output.publicPath,

                // These settings suppress noisy webpack output so only errors are displayed to the console.
                noInfo: false,
                quiet: false,
                stats: {
                    assets: false,
                    colors: true,
                    version: false,
                    hash: false,
                    timings: false,
                    chunks: false,
                    chunkModules: false
                },

                // for other settings see
                // http://webpack.github.io/docs/webpack-dev-middleware.html
            }),

            // bundler should be the same as above
            webpackHotMiddleware(bundler)
        ]
    },

    // no need to watch '*.js' here, webpack will take care of it for us,
    // including full page reloads if HMR won't work
    files: [
        'index.html'
    ]
});
