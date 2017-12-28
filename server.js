var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});


proxy.on('proxyRes', function (proxyRes, req, res) {
    proxyRes.headers['X-Special-Proxy-Header'] = 'foobar';
    proxyRes.headers["Access-Control-Allow-Origin"] =  "*";
    proxyRes.headers["Access-Control-Allow-Credentials"] =  "true";
    proxyRes.headers["Access-Control-Allow-Methods"] =  "GET,HEAD,OPTIONS,POST,PUT";
    proxyRes.headers["access-control-allow-headers"] = proxyRes.headers["access-control-allow-headers"].concat(", x-client-id, x-api-key, X-Special-Proxy-Header, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  });


http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'https://eds.modcam.io', changeOrigin: true });
}).listen(3000);