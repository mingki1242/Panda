const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'panda1562.iptime.org:8080',
    changeOrigin: true
    })
    );
};