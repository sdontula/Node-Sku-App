http = require('http');

exports.getSkuImage = function(sku, id, callback){
	var SkuModel = require('./models.js');
    //SkuModel.find(function(err, skus) {
        //if (err){
        	//return console.error(err);	
        //} 
        //for (var i = 0; i < skus.length; i++) {
    		//console.log(skus[i]);
			var str="";

			options = {
			  host: 'api.staples.com',			
			  path: '/v1/10001/product/partnumber/skunumber/details?locale=en_US&catalogId=10051&zipCode=02421&client_id=JxP9wlnIfCSeGc9ifRAAGku7F4FSdErd'
			}
			//options.path = options.path.replace("skunumber", skus[i].sku);
			options.path = options.path.replace("skunumber", sku);

			console.log(options.path);
				var request = http.get(options, function(response) {
				  	//console.log("Got response: " + response.statusCode);
					response.on('data', function(chunk){
						//console.log('body: ' + chunk);
						str += chunk;
					});

					request.on('error', function(error){
						console.log("Got error: " + error.message);
					});

					response.on('end', function(){						
						//console.log("yes printing");
						//console.log(str);
						//Worst hack ever - I agree. JSON.parse isn't working :-(((
						var n = str.lastIndexOf("\"url\": ");
						//console.log(n);
						//console.log(str.length-1);
						var o = str.substring(n, str.length-1);
						//console.log(o);

						var p = o.indexOf("$\"");
						//console.log(p);
						var imageUrl = o.substring(8, p+1);
						imageUrl = imageUrl.replace(/[\\]/g,'');
						console.log(imageUrl);
						console.log(id);
						callback(id, imageUrl);
						//console.log("end printing");
						/*var json = JSON.parse(str);
						try{
							var product = JSON.parse(str);
							console.log(product.Product);
						}catch(e){						
							console.log(e.stack);
						}*/


					});
			});
			//if(i==10) break;  
			//console.log(str);         
   		//}
	}
	//);
//}