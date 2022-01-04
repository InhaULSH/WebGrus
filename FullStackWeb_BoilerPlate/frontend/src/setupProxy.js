const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
};
// server와 client 간 정상적인 req, res 전달을 위해 존재함
// 타겟 서버와만 res, req로 통신할 수 있음
