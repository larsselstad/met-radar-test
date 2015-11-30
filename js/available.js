// module for retriving data from the met api

var _  = require('lodash');

function makeSortedArray(queries, getValueFn) {
    return _.uniq(queries.map(function (q) {
        return getValueFn(q);
    })).sort();
}

function findParameter(name) {
    return function (query) {
        var pWithNameOfValue = query.parameter.find(function (p) {
            return getValue(p, 'name') === name;
        });

        return getValue(pWithNameOfValue, 'value');
    };
}

// xml2js saves in format key: [ 'value' ]
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

function Available(data) {
    this.data = data;
}

Available.prototype.getRadarSites = function () {
    return makeSortedArray(this.data, findParameter('radarsite'));
};

Available.prototype.getContentsForSite = function (site) {
    var qs = findQueriesFor(site, this.data);

    return makeSortedArray(qs, findParameter('content'));
};

Available.prototype.getTypesForSite = function (site) {
    var qs = findQueriesFor(site, this.data);

    return makeSortedArray(qs, findParameter('type'));
};

Available.prototype.getSizesForSite = function (site) {
    var qs = findQueriesFor(site, this.data);

    return makeSortedArray(qs, findParameter('size'));
};

module.exports = Available;
