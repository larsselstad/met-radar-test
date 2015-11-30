var fs = require('fs');
var parseString = require('xml2js').parseString;
var dom = require('./dom');
var Available = require('./available');

var xml = fs.readFileSync('a.xml', {encoding: 'utf8'});

parseString(xml, function(err, result) {
    if (err) {
        console.error(err);
    }

    var queries = result.available.query;

    var available = new Available(queries);

    var siteSelect = dom.select('radarsite', '', available.getRadarSites(), function (evt) {
        var siteName = evt.target.value;

        console.log(siteName);

        addSelect('type', available.getTypesForSite(siteName), function (evt) {
            var type = evt.target.value;

            console.log(type);

            addSelect('content', available.getContentsForSite(siteName), function (evt) {
                var content = evt.target.value;

                console.log(content);

                addSelect('size', available.getSizesForSite(siteName), function (evt) {
                    var size = evt.target.value;

                    console.log(size);

                    document.querySelector('body').appendChild(dom.image(siteName, type, size, content));
                });
            });
        });
    });

    document.querySelector('body').appendChild(siteSelect);
});

function addSelect(name, options, cb) {
    var select = dom.select(name, '', options, cb);

    console.log(select);

    document.querySelector('body').appendChild(select);
}
