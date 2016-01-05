var dom = require('../dom');
var SelectElement = require('./selectElement');
var RadarImage = require('./radarImage');
var Sizer = require('./sizer');

// TODO: funksjonen under er en tanke lang

module.exports = function(model, available) { // jshint ignore:line
    var view = Object.create(null);
    var sizer = new Sizer();

    var sites = new SelectElement('Site', 'radarsite');
    var types = new SelectElement('Type', 'type');
    var contents = new SelectElement('Content', 'content');
    var size = new SelectElement('Size', 'size');

    function showImage() {
        radarImage.show();

        view.el.removeEventListener('transitionend', showImage);
    }

    var radarImage = new RadarImage(function (imgHeight, imgWidth) {
        if (model.fromStorage) {
            view.el.style.height = model.getDimensions().height;
            view.el.style.width = model.getDimensions().width;
        } else {
            view.el.style.height = (imgHeight + 6) + 'px';
            view.el.style.width = (imgWidth + 6) + 'px';

            model.setDimensions(view.el.style.height, view.el.style.width);
        }

        view.el.classList.remove('loading');

        view.el.addEventListener('transitionend', showImage);
    }, function () {
        model.unsave();

        view.el.classList.remove('image');
        view.el.removeAttribute('style');
    }, function () {
        model.unsave();

        view.el.classList.remove('loading');
        view.el.classList.remove('image');
        view.el.removeAttribute('style');
    });

    view.el = dom.el('form', {
        class: 'radar-box',
        children: [
            sites.el,
            types.el,
            contents.el,
            size.el,
            dom.button({
                text: 'Hent bilde',
                class: 'base-down js-editor'
            }),
            radarImage.image,
            sizer.handle
        ]
    });

    view.el.addEventListener('submit', function (evt) {
        evt.preventDefault();

        if (view.el.checkValidity()) {
            model.save();

            setImage();
        }
    });

    sizer.init(view.el, function () {
        model.setDimensions(view.el.style.height, view.el.style.width);

        model.save();
    });

    function setImage() {
        view.el.classList.add('loading');

        radarImage.src(model.getValues());

        view.el.classList.add('image');
    }

    if (model.fromStorage) {
        setImage();

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
        }
    });

    return view;
};
