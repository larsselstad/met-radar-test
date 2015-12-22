var dom = require('../dom');
var SelectElement = require('./selectElement');
var storage = require('../storage');

module.exports = function(model, available) {
    var view = Object.create(null);

    var sites = new SelectElement('Site', 'radarsite', available.getRadarSites());
    var types = new SelectElement('Type', 'type');
    var contents = new SelectElement('Content', 'content');
    var size = new SelectElement('Size', 'size');

    var radarImage = dom.radarImage({
        parameters: model.parameters()
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

    view.el.addEventListener('change', function(evt) {
        if (evt.target.name === 'radarsite') {
            contents.setOptions([]);
            size.setOptions([]);

            model.setRadarsite(evt.target.value);

            types.setOptions(available.getTypesForSite(model.getRadarSite()));
        }

        if (evt.target.name === 'type') {
            size.setOptions([]);

            model.setType(evt.target.value);

            contents.setOptions(available.getContentsForSite(model.getRadarSite(), model.getType()));
        }

        if (evt.target.name === 'content') {
            model.setContent(evt.target.value);

            size.setOptions(available.getSizesForSite(model.getRadarSite(), model.getType(), model.getContent()));
        }

        if (evt.target.name === 'size') {
            model.setSize(evt.target.value);

            storage.save(model.getValues());

            radarImage.src = "http://api.met.no/weatherapi/radar/1.5/?" + model.parameters().join(';');
        }
    });

    return view;
};
