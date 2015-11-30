var fs = require('fs');
var _  = require('lodash');
var parseString = require('xml2js').parseString;

var xml = fs.readFileSync('a.xml', {encoding: 'utf8'});

// console.log(xml);

parseString(xml, function(err, result) {
    if (err) {
        console.error(err);
    }

    var queries = result.available.query;

    var sites = getRadarSites(queries);

    console.log(sites);

    var siteName = sites[3];

    var contents = getContentForSite(siteName, queries);

    console.log(contents);

    var types = getTypesForSite(siteName, queries);

    console.log(types);

    var sizes = getSizesForSite(siteName, queries);

    console.log(sizes);
});

function makeSortedArray(queries, subCb) {
    return _.uniq(queries.map(function (q) {
        return subCb(q);
    })).sort();
}

function getSizesForSite(site, queries) {
    var qs = findQueriesFor(site, queries);

    return makeSortedArray(qs, findParameter('size'));
}

function getTypesForSite(site, queries) {
    var qs = findQueriesFor(site, queries);

    return makeSortedArray(qs, findParameter('type'));
}

function getContentForSite(site, queries) {
    var qs = findQueriesFor(site, queries);

    return makeSortedArray(qs, findParameter('content'));
}

function getRadarSites(queries) {
    return makeSortedArray(queries, findParameter('radarsite'));
}

function findParameter(value) {
    return function (query) {
        var something = query.parameter.find(function (p) {
            return getValue(p, 'name') === value;
        });

        return getValue(something, 'value');
    };
}

function getValue(object, key) {
    return object[key][0];
}

function findQueriesFor(radarsite, queries) {
    return queries.reduce(function (arr, q) {
        var radarSiteObject = q.parameter.find(function (p) {
            return getValue(p, 'name') === 'radarsite' && getValue(p, 'value') === radarsite;
        });

        if (radarSiteObject) {
            arr.push(q);
        }

        return arr;
    }, []);
}
