var http = require('http');

var parseString = require('xml2js').parseString;

var options = {
    hostname: 'api.met.no',
    path: '/weatherapi/radar/1.5/available',
    method: 'GET'
};

var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));

    res.setEncoding('utf8');

    var body = "";

    res.on('data', function(chunk) {
        // console.log('BODY: ' + chunk);
        body += chunk;
    });

    res.on('end', function() {
        console.log(body);

        parseString(body, function(err, result) {
            // if (err) {
            //     console.error(err);
            // }
            //
            // console.dir(result);

            // console.log(result.available.query[0]);
        });
    });
});

req.end();
