var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
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

function refreshImage(image) {
    return function() {
        console.log('refreshImage: ' + new Date());

        var storedSrc = image.src;
        var storedOnload = image.onload;

        // overwriting onload to not trigger function from contructor
        image.onload = function() {
            // sets stored values back when dummy image is loaded to force
            // a refresh of the radar image
            image.onload = storedOnload;

            image.src = storedSrc;
        };

        // sets a new src to get the browser to load another image
        image.src = '/img/loading-img.png';
    };
}

function RadarImage(fetchedFromModel, values) {
    EventEmitter.call(this);

    this.image = dom.image({
        class: 'hide',
        // onload is triggered when images is done loading
        onload: function() {
            // special case when the image data is fetch from localStorage
            if (fetchedFromModel) {
                this.emit('radarimage:onload-from-model');

                fetchedFromModel = false;
            } else {
                this.emit('radarimage:onload', this.image.height, this.image.width);
            }

            this.emit('radarimage:loaded');

            this.startRefresh();
        }.bind(this)
    });

    if (fetchedFromModel) {
        this.src(values);
    }

    // onerror is triggered when there is an error
    // the browser do not provid any meaningful parameters :-(
    this.image.onerror = function() {
        this.emit('radarimage:onerror');
    }.bind(this);

    this.timeoutId = null;
}

// at EventEmitter function to prototype (I guess)
inherits(RadarImage, EventEmitter);

RadarImage.prototype.show = function() {
    this.image.classList.remove('hide');
};

RadarImage.prototype.hide = function() {
    this.image.classList.add('hide');

    // no need to refresh when image is hidden
    clearTimeout(this.timeoutId);
};

RadarImage.prototype.src = function(values) {
    this.image.src = radarImageSrc(values);
};

RadarImage.prototype.startRefresh = function() {
    clearTimeout(this.timeoutId);

    // 600000 ms = 10 m
    // 450000 ms = 7,5 m
    // the radars seem to update every 7,5 minutes
    this.timeoutId = setTimeout(refreshImage(this.image), 450000);
};

RadarImage.prototype.refresh = function() {
    refreshImage(this.image)();

    this.startRefresh();
};

module.exports = RadarImage;
