var fs = require('fs');
var parseString = require('xml2js').parseString;
var dom = require('./dom');
var Available = require('./available');
var radarView = require('./radar/view.js');
var Model = require('./radar/model.js');
var storage = require('./storage');

var xml = fs.readFileSync('a.xml', {encoding: 'utf8'});

parseString(xml, function(err, result) {
    if (err) {
        console.error(err);
    }

    var queries = result.available.query;

    var available = new Available(queries);

    var storedValues = storage.get();

    var model = new Model(storedValues);

    var rv = radarView(model, available);

    document.querySelector('#app').appendChild(rv);
});
