var http=require('http');
var url=require('url');

var skuList = [
{ "sku":"106940", "model":"CNM6830A004AA", "description":"Canon EP-86 Black Toner Cartridge (6830A004AA), High Yield", "capacity":"50", "threshold":"10", "imageUrl":"http://www.staples-3p.com/s7/is/image/Staples/s0587033_sc7?wid=300&hei=300&wid=300&hei=300"},
{ "sku":"869320", "model":"M405M", "description":"Dell Series 9 Black Ink Cartridge (MK992), High Yield", "capacity":"40", "threshold":"5", "imageUrl":"http://www.staples-3p.com/s7/is/image/Staples/s0377702_sc7?wid=300&hei=300&wid=300&hei=300"},
{ "sku":"364837", "model":"CN045AN#140", "description":"HP 950XL Black Ink Cartridge (CN045AN), High Yield", "capacity":"30", "threshold":"3", "imageUrl":"http://www.staples-3p.com/s7/is/image/Staples/s0437160_sc7?wid=300&hei=300&wid=300&hei=300"},
{ "sku":"676829", "model":"T079520", "description":"Epson 79 Light Cyan Ink Cartridge (T079520)", "capacity":"75", "threshold":"8", "imageUrl":"http://www.staples-3p.com/s7/is/image/Staples/s0201724_sc7?wid=300&hei=300&wid=300&hei=300"}
];

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/home':
            res.end('home');
        break;
        case '/skuList':
            res.end(JSON.stringify(skuList));
        break;
        default:
            res.end('default');
        break;
    }

}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');
