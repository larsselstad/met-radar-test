var test = require('tape');

var Available = require('../../../js/available');

var data = require('../../data/available.data.json');

test('functions available in available', function (t) {
    var a = new Available({});

    t.equal(typeof a.getRadarSites, 'function');
    t.equal(typeof a.getTypesForSite, 'function');
    t.equal(typeof a.getContentsForSite, 'function');
    t.equal(typeof a.getSizesForSite, 'function');

    t.end();
});

test('available: getRadarSites()', function (t) {
    var a = new Available(data);

    var sites = a.getRadarSites();

    t.equal(sites.length, 6);

    t.equal(sites[0], 'central_norway');
    t.equal(sites[1], 'finnmark');
    t.equal(sites[2], 'nordland_troms');
    t.equal(sites[3], 'norway');
    t.equal(sites[4], 'southwest_norway');
    t.equal(sites[5], 'trlagnordland');

    t.end();
});

test('available: getTypesForSite', function (t) {
    var a = new Available(data);

    var types = a.getTypesForSite('finnmark');

    t.equal(types.length, 3);

    t.equal(types[0], 'accumulated_12h');
    t.equal(types[1], 'accumulated_17h');
    t.equal(types[2], 'accumulated_3h');

    t.end();
});

test('available: getContentsForSite', function (t) {
    var a = new Available(data);

    var contentsFinnmark = a.getContentsForSite('finnmark', 'accumulated_3h');

    t.equal(contentsFinnmark.length, 1);

    t.equal(contentsFinnmark[0], 'image');

    var contentsSouthWest = a.getContentsForSite('southwest_norway', 'reflectivity');

    t.equal(contentsSouthWest.length, 2);

    t.equal(contentsSouthWest[0], 'animation');
    t.equal(contentsSouthWest[1], 'image');

    t.end();
});

test('available: getSizesForSite', function (t) {
    var a = new Available(data);

    var contentsSouthWest = a.getSizesForSite('southwest_norway', 'reflectivity', 'animation');

    t.equal(contentsSouthWest.length, 2);

    t.equal(contentsSouthWest[0], 'large');
    t.equal(contentsSouthWest[1], 'normal');

    t.end();
});
