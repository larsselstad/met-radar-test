var dom = require('../dom');
var Form = require('./choose/form');
var RadarImage = require('./radarImage');
var Sizer = require('./sizer');
var mover = require('./mover');

function addPixel(number) {
    return (number + 6) + 'px';
}

function setHeightAndWidth(el, height, width) {
    el.style.height = height;
    el.style.width = width;
}

// TODO: funksjonen under er en tanke lang

module.exports = function(model, available) { // jshint ignore:line
    var form = new Form(model, available, function() {
        radarImage.src(model.getValues());
        view.classList.add('loading');
    });
    var radarImage = new RadarImage(model.fromStorage, model.getValues());
    var sizer = new Sizer();

    function showImage() {
        radarImage.show();

        view.removeEventListener('transitionend', showImage);
    }

    function removeImage() {
        model.unsave();

        radarImage.hide();

        view.classList.remove('loading');
        view.classList.remove('image');
        view.removeAttribute('style');
    }

    radarImage.on('radarimage:onload', function(imgHeight, imgWidth) {
        setHeightAndWidth(view, addPixel(imgHeight), addPixel(imgWidth));

        model.setDimensions(view.style.height, view.style.width);

        model.save();
    });

    radarImage.on('radarimage:onload-from-model', function() {
        setHeightAndWidth(view, model.getDimensions().height, model.getDimensions().width);
    });

    radarImage.on('radarimage:loaded', function() {
        view.classList.remove('loading');

        view.classList.add('image');

        view.addEventListener('transitionend', showImage);
    });

    radarImage.on('radarimage:onerror', function() {
        window.alert('Noe gikk feil ved lasting av en værradar');

        radarImage.hide();

        removeImage();
    });

    var view = dom.el('div', {
        class: 'radar-box loading',
        children: [
            form.el,
            radarImage.el,
            sizer.el
        ]
    });

    // view.addEventListener('click', function(evt) {
    //     if (evt.target.tagName.toUpperCase() === 'IMG') {
    //         removeImage();
    //     }
    // });

    mover(view, function () {
        model.setPositions(view.style.left, view.style.top);

        model.save();
    });

    sizer.init(view, function() {
        model.setDimensions(view.style.height, view.style.width);

        model.save();
    });

    if (!model.fromStorage) {
        view.classList.remove('loading');
        model.setRadarsiteOptions(available.getRadarSites());
    } else {
        var positions = model.getPositions();

        view.style.left = positions.left || 0;
        view.style.top = positions.top || 0;
    }

    form.setOptions();

    return view;
};
