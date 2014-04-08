var http=require('http');
var url=require('url');

var skuList = [];
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connection to Mongo Successful');
});

var SkuModel = require('./models.js');
console.log('Checking if Sku Data is present in Mongo');
SkuModel.count({}, function(err, count){
    console.log('Found ' + count + ' sku records in the database');

    if(count==0){
        console.log(count);
        console.log('Did not find skus in the DB. Setting up DB Data');
        //Setup Data
        var sku1 = new SkuModel({
            sku:'106940', 
            model:'CNM6830A004AA', 
            description:'Canon EP-86 Black Toner Cartridge (6830A004AA) High Yield', 
            capacity:'50', 
            threshold:'10', 
            currentLevel:'45',
            imageUrl:'http://www.staples-3p.com/s7/is/image/Staples/s0587033_sc7?wid=600&hei=600&wid=600&hei=600'
        });

        var sku2 = new SkuModel({
            sku:"869320",
            model:"M405M",
            description:"Dell Series 9 Black Ink Cartridge (MK992), High Yield", 
            capacity:"40", 
            threshold:"5", 
            currentLevel:'3',
            imageUrl:"http://www.staples-3p.com/s7/is/image/Staples/s0377702_sc7?wid=600&hei=600&wid=600&hei=600"
        });

        var sku3 = new SkuModel({
            sku:"364837", 
            model:"CN045AN#140", 
            description:"HP 950XL Black Ink Cartridge (CN045AN), High Yield", 
            capacity:"30", 
            threshold:"3",
            currentLevel:'25',
            imageUrl:"http://www.staples-3p.com/s7/is/image/Staples/s0437160_sc7?wid=600&hei=600&wid=600&hei=600"
        });

        var sku4 = new SkuModel({ 
            sku:"676829", 
            model:"T079520", 
            description:"Epson 79 Light Cyan Ink Cartridge (T079520)", 
            capacity:"75", 
            threshold:"8", 
            currentLevel:'59',
            imageUrl:"http://www.staples-3p.com/s7/is/image/Staples/s0201724_sc7?wid=600&hei=600&wid=600&hei=600"
        });

        var sku5 = new SkuModel({ 
            sku:"861188", 
            model:"8367849", 
            description:"Kodak 10B/10C Black & Color Ink Cartridges (8367849), 2/Pack", 
            capacity:"100", 
            threshold:"20", 
            currentLevel:'15',
            imageUrl:"http://www.staples-3p.com/s7/is/image/Staples/s0370967_sc7?wid=600&hei=600&wid=600&hei=600"
        });

        sku1.save(function (err, sku1) {if (err) return console.error(err);});
        sku2.save(function (err, sku2) {if (err) return console.error(err);});
        sku3.save(function (err, sku3) {if (err) return console.error(err);});
        sku4.save(function (err, sku4) {if (err) return console.error(err);});
        sku5.save(function (err, sku4) {if (err) return console.error(err);});

        console.log('Added skus to the DB.');
    }else{
        console.log('Found skus in the DB. Will skip DB Setup');
    }
});

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/home':
            res.end('home');
        break;
        case '/skuList':    
            SkuModel.count({}, function(err, count){
                 console.log('Found ' + count + ' sku records in the database');
            });        
            SkuModel.find(function (err, skus) {
                if (err) return console.error(err);
                res.end(JSON.stringify(skus));
            });
        break;
        default:
            res.end('default');
        break;
    }

}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');