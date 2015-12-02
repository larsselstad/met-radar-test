var fs = require('fs');
var parseString = require('xml2js').parseString;
var dom = require('./dom');
var Available = require('./available');
var radarView = require('./radar/view.js');

var xml = fs.readFileSync('a.xml', {encoding: 'utf8'});

parseString(xml, function(err, result) {
    if (err) {
        console.error(err);
    }

    var queries = result.available.query;

    var available = new Available(queries);

    var rv = radarView(available);
    rv.showSites();

    document.querySelector('body').appendChild(rv.el);
});
