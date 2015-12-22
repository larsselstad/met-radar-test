function Model(values) {
    this.values = {};

    if (values) {
        this.values = values;
    }
}

Model.prototype.setRadarsite = function(radarsite) {
    this.values.radarsite = radarsite;
};

Model.prototype.setType = function(type) {
    this.values.type = type;
};

Model.prototype.setContent = function(content) {
    this.values.content = content;
};

Model.prototype.setSize = function(size) {
    this.values.size = size;
};

Model.prototype.getRadarSite = function() {
    return this.values.radarsite;
};

Model.prototype.getType = function() {
    return this.values.type;
};

Model.prototype.getContent = function() {
    return this.values.content;
};

Model.prototype.getSize = function() {
    return this.values.size;
};

Model.prototype.parameters = function() {
    if ((this.values.radarsite && this.values.radarsite !== '') &&
        (this.values.type && this.values.type !== '') &&
        (this.values.content && this.values.content !== '') &&
        (this.values.size && this.values.size !== '')) {
        return [
            'radarsite=' + this.values.radarsite,
            'type=' + this.values.type,
            'content=' + this.values.content,
            'size=' + this.values.size
        ];
    } else {
        return null;
    }
};

Model.prototype.getValues = function() {
    return this.values;
};

module.exports = Model;
