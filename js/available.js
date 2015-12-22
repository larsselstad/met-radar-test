// module for retriving data from the met api

var _ = require('lodash');

function makeSortedArray(queries, getValueFn) {
    return _.uniq(queries.map(function(q) {
        return getValueFn(q);
    })).sort();
}

function findParameter(name) {
    return function(query) {
        var pWithNameOfValue = query.parameter.find(function(p) {
            return getValue(p, 'name') === name;
        });

        return getValue(pWithNameOfValue, 'value');
    };
}

// xml2js saves in format key: [ 'value' ]
function getValue(object, key) {
    return object[key][0];
}

function filterQueries(queries, radarsite, type, content) {
    return queries.reduce(function(arr, q) {
        var values = {};

        q.parameter.forEach(function (p) {
            values[getValue(p, 'name')] = getValue(p, 'value');
        });

        // TODO: Fix this mess
        if (values.radarsite === radarsite) {
            if (type) {
                if (content) {
                    if (values.type === type && values.content === content) {
                        arr.push(q);
                    }
                } else {
                    if (values.type === type) {
                        arr.push(q);
                    }
                }
            } else {
                arr.push(q);
            }
        }

        return arr;
    }, []);
}

function Available(data) {
    this.data = data;
}

Available.prototype.getRadarSites = function() {
    return makeSortedArray(this.data, findParameter('radarsite'));
};

Available.prototype.getTypesForSite = function(site) {
    var qs = filterQueries(this.data, site);

    return makeSortedArray(qs, findParameter('type'));
};

Available.prototype.getContentsForSite = function(site, type) {
    var qs = filterQueries(this.data, site, type);

    return makeSortedArray(qs, findParameter('content'));
};

Available.prototype.getSizesForSite = function(site, type, content) {
    var qs = filterQueries(this.data, site, type, content);

    return makeSortedArray(qs, findParameter('size'));
};

module.exports = Available;
