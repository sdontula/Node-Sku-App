var http=require('http');
var url=require('url');

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/sbd/img/ad/111120a/merch14827_ad220_90.gif':
            res.end('Hello World');
        break;
        default:
            res.end('default');
        break;
    }

}).listen(8082);
