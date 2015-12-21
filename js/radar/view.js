var dom = require('../dom');
var SelectElement = require('./selectElement');

module.exports = function(model, available) {
    var view = Object.create(null);

    var sites = new SelectElement('Site', 'radarsite', available.getRadarSites());
    var types = new SelectElement('Type', 'type');
    var contents = new SelectElement('Content', 'content');
    var size = new SelectElement('Size', 'size');

    view.el = dom.el('div', {
        class: 'radar-box',
        children: [
            sites.el,
            types.el,
            contents.el,
            size.el
        ]
    });

    view.el.addEventListener('change', function (evt) {
        console.log(evt);

        if (evt.target.name === 'radarsite') {
            model.setRadarsite(evt.target.value);

            types.setOptions(available.getTypesForSite(model.getRadarSite()));
        }

        if (evt.target.name === 'type') {
            model.setType(evt.target.value);

            contents.setOptions(available.getContentsForSite(model.getRadarSite()));
        }

        if (evt.target.name === 'content') {
            model.setContent(evt.target.value);

            size.setOptions(available.getSizesForSite(model.getRadarSite()));
        }

        if (evt.target.name === 'size') {
            model.setSize(evt.target.value);

            // view.el.innerHTML = '';

            view.el.appendChild(dom.radarImage({
                parameters: model.parameters()
            }));
        }
    });

    return view;
};
