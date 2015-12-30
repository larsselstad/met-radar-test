var dom = require('../dom');

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

function RadarImage(onloadCb, clickCb) {
    this.image = dom.image({
        class: 'hide',
        onload: function() {
            onloadCb(this.image.height, this.image.width);
        }.bind(this),
        onclick: function () {
            this.hide();

            clickCb();
        }.bind(this)
    });
}

RadarImage.prototype.show = function() {
    this.image.classList.remove('hide');
};

RadarImage.prototype.hide = function() {
    this.image.classList.add('hide');
};

RadarImage.prototype.src = function(values) {
    this.image.src = radarImageSrc(values);
};

module.exports = RadarImage;
