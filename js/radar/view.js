var dom = require('../dom');
var SelectElement = require('./selectElement');

function isSet(value) {
    return value && value !== '';
}

function radarImageSrc(values) {
    if (!isSet(values.radarsite) ||
        !isSet(values.type) ||
        !isSet(values.content) ||
        !isSet(values.size)) {
        return;
    }

    var parameters = [
        'radarsite=' + values.radarsite,
        'type=' + values.type,
        'content=' + values.content,
        'size=' + values.size
    ];

    return "http://api.met.no/weatherapi/radar/1.5/?" + parameters.join(';');
}

module.exports = function(model, available) {
    var view = Object.create(null);

    var sites = new SelectElement('Site', 'radarsite');
    var types = new SelectElement('Type', 'type');
    var contents = new SelectElement('Content', 'content');
    var size = new SelectElement('Size', 'size');

    var radarImage = dom.image({
        src: radarImageSrc(model.getValues())
    });

    view.el = dom.el('div', {
        class: 'radar-box',
        children: [
            sites.el,
            types.el,
            contents.el,
            size.el,
            radarImage
        ]
    });

    if (model.saved) {
        sites.setOptions(model.getRadarsiteOptions(), model.getRadarSite());
        types.setOptions(model.getTypeOptions(), model.getType());
        contents.setOptions(model.getContentOptions(), model.getContent());
        size.setOptions(model.getSizeOptions(), model.getSize());
    } else {
        var radarsites = available.getRadarSites();

        model.setRadarsiteOptions(radarsites);

        sites.setOptions(radarsites);
        types.setOptions();
        contents.setOptions();
        size.setOptions();
    }

    function setTypes(options) {
        model.setTypeOptions(options);
        types.setOptions(options);
    }

    function setContents(options) {
        model.setContentOptions(options);
        contents.setOptions(options);
    }

    function setSize(options) {
        model.setSizeOptions(options);
        size.setOptions(options);
    }

    view.el.addEventListener('change', function(evt) {
        if (evt.target.name === 'radarsite') {
            setContents([]);
            setSize([]);

            model.setRadarsite(evt.target.value);

            setTypes(available.getTypesForSite(model.getRadarSite()));
        }

        if (evt.target.name === 'type') {
            setSize([]);

            model.setType(evt.target.value);

            setContents(available.getContentsForSite(model.getRadarSite(), model.getType()));
        }

        if (evt.target.name === 'content') {
            model.setContent(evt.target.value);

            setSize(available.getSizesForSite(model.getRadarSite(), model.getType(), model.getContent()));
        }

        if (evt.target.name === 'size') {
            model.setSize(evt.target.value);

            model.save();

            radarImage.src = radarImageSrc(model.getValues());
        }
    });

    return view;
};
