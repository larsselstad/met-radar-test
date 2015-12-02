var dom = require('../dom');

function onChange(model, key, cb) {
    return function(evt) {
        model[key] = evt.target.value;

        cb();
    };
}

module.exports = function(available) {
    var view = Object.create(null);
    var model = {};

    view.el = dom.el('div', {
        class: 'radar-box'
    });

    function addSelect(label, name, options, cb) {
        var div = dom.el('div', {
            class: 'base-grid',
            children: [
                dom.el('label', {
                    for: name,
                    text: label
                }),
                dom.select({
                    name: name,
                    id: name,
                    options: options,
                    changeFn: cb
                })
            ]
        });

        view.el.appendChild(div);
    }

    view.showSites = function showSites() {
        view.el.innerHTML = '';

        addSelect('Site', 'radarsite', available.getRadarSites(), onChange(model, 'site', view.showTypes));
    };

    view.showTypes = function() {
        addSelect('Type', 'type', available.getTypesForSite(model.site), onChange(model, 'type', view.showContents));
    };

    view.showContents = function() {
        addSelect('Content', 'content', available.getContentsForSite(model.site), onChange(model, 'content', view.showSizes));
    };

    view.showSizes = function() {
        addSelect('Size', 'size', available.getSizesForSite(model.site), onChange(model, 'size', view.showImage));
    };

    view.showImage = function () {
        view.el.innerHTML = '';

        view.el.appendChild(dom.image(model));
    };

    return view;
};
