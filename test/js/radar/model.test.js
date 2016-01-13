var test = require('tape');

var Model = require('../../../js/radar/model');

test('model: constructor', function (t) {
    var m = new Model();

    t.equal(m.fromStorage, false);

    t.end();
});

test('model: contructor params', function (t) {
    var values = {
        radarsite: 'finnmark',
        type: 'reflectivity',
        content: 'animation',
        size: 'normal'
    };

    var options = {
        radarsiteOptions: [1,2,3],
        typeOptions: [1,2,3],
        contentOptions: [1,2,3],
        sizeOptions: [1,2,3]
    };

    var dimensions = {
        height: '200px',
        width: '300px'
    };

    var m = new Model({
        values: values,
        options: options,
        dimensions: dimensions,
        id: 'id'
    });

    t.equal(m.fromStorage, true);

    t.equal(m.getRadarSite(), values.radarsite);
    t.equal(m.getType(), values.type);
    t.equal(m.getContent(), values.content);
    t.equal(m.getSize(), values.size);

    t.equal(m.getSizeOptions(), options.sizeOptions);
    t.equal(m.getRadarsiteOptions(), options.radarsiteOptions);
    t.equal(m.getTypeOptions(), options.typeOptions);
    t.equal(m.getContentOptions(), options.contentOptions);

    t.equal(m.getDimensions(), dimensions);

    t.end();
});
