var dom = require('../dom');
var SelectElement = require('./selectElement');
var RadarImage = require('./radarImage');
var Sizer = require('./sizer');

function addPixel(number) {
    return (number + 6) + 'px';
}

function setHeightAndWidth(el, height, width) {
    el.style.height = height;
    el.style.width = width;
}

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

    function removeImage() {
        model.unsave();

        radarImage.hide();

        view.el.classList.remove('loading');
        view.el.classList.remove('image');
        view.el.removeAttribute('style');
    }

    var radarImage = window.ri = new RadarImage(model.fromStorage, model.getValues());

    radarImage.on('radarimage:onload', function(imgHeight, imgWidth) {
        setHeightAndWidth(view.el, addPixel(imgHeight), addPixel(imgWidth));

        model.setDimensions(view.el.style.height, view.el.style.width);

        model.save();
    });

    radarImage.on('radarimage:onload-from-model', function () {
        setHeightAndWidth(view.el, model.getDimensions().height, model.getDimensions().width);
    });

    radarImage.on('radarimage:loaded', function () {
        view.el.classList.remove('loading');

        view.el.classList.add('image');

        view.el.addEventListener('transitionend', showImage);
    });

    radarImage.on('radarimage:onerror', function () {
        window.alert('Noe gikk feil ved lasting av en værradar');

        removeImage();
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

    view.el.addEventListener('click', function (evt) {
        if (evt.target.tagName.toUpperCase() === 'IMG') {
            removeImage();
        }
    });

    view.el.addEventListener('submit', function(evt) {
        evt.preventDefault();

        if (view.el.checkValidity()) {
            view.el.classList.add('loading');

            model.save();

            radarImage.src(model.getValues());
        }
    });

    sizer.init(view.el, function() {
        model.setDimensions(view.el.style.height, view.el.style.width);

        model.save();
    });

    if (model.fromStorage) {
        view.el.classList.add('loading');

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
