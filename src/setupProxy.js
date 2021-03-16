const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/api2',
    createProxyMiddleware({
//  в номальном развернутом в докере режиме      
     target: 'http://localhost:8080',
//  в отладочном режиме Idea
//      target: 'http://localhost:8091',
      changeOrigin: true,
    })
  );
}