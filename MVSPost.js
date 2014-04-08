var parser = require('xml2json');
var http=require('http');

var requestString = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:is="http://is.mvs.staples.com/">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
      '<is:getNearByReq>' +
         '<is:requesterId>phil</is:requesterId>' +
         '<is:searchAddrLn></is:searchAddrLn>' +
         '<is:searchCity></is:searchCity>' +
         '<is:searchState></is:searchState>' +
         '<is:searchZipCode></is:searchZipCode>' +
         '<is:searchRadius>1</is:searchRadius>' +
         '<is:searchItem>$$sku$$</is:searchItem>' +
         '<is:searchLocale>en_US</is:searchLocale>' +
         '<is:latitude>42.40285</is:latitude>' +  
         '<is:longitude>-71.23424</is:longitude>' +
      '</is:getNearByReq>' +
   '</soapenv:Body>' + 
'</soapenv:Envelope>';
//console.log(requestData);

exports.fetchAvailableQty = function fetchAvailableQty(sku, id, callback){
  //var sku = '869320';
  console.log('Checking availability for sku: ' + sku);
  var requestData = requestString.replace('$$sku$$', sku);
  //console.log(requestData);

  var post_options = {
    hostname: 'lnxivspras01',
    port: 8280,
    path: '/MVSSOAPWeb/MVSInventoryService',
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml'
      , 'Content-Length': Buffer.byteLength(requestData)
    }
  };

  var post_req = http.request(post_options, function(post_res) {
    //console.log('STATUS: ' + post_res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(post_res.headers));
    post_res.setEncoding('utf8');
    post_res.on('data', function (chunk) {
      //console.log('BODY: ' + chunk);
      var json = JSON.parse(parser.toJson(chunk));
      var qtyAvail = 0;
      try{
        qtyAvail = json['soap:Envelope']['soap:Body']['getNearByRes']['nearByStoreOnHandDtl']['availQty'];
      }catch(e){}     
      console.log('Quantity available for sku ' + sku + ' is ' + qtyAvail);
      callback(id, qtyAvail);
    });
  });

  post_req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });  
  // write data to request body
  post_req.write(requestData);
  post_req.end();
}

//exports.fetchAvailableQty('869320', function(){});  //For Testing.
//exports.fetchAvailableQty('', function(){});  //For Testing.