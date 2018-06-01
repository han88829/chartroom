var proxy = require('http-proxy').createProxyServer({});

proxy.on((err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    })
});

var server = require('http').createServer((req, res) => {
    var host = req.headers.host;
    switch (host) {
        case 'room.hanbei.men':
            proxy.web(req, res, { target: 'http://120.0.0.1:3000' })
            break;

        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end()
            break;
    }
})


server.listen(80);