const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://panda1562.iptime.org:8080',
    changeOrigin: true
    })
    );
};