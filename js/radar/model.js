var storage = require('../storage');

function Model(params) {
    params = params || {};

    this.values = {};
    this.options = {};
    this.dimensions = {};
    this.fromStorage = false;

    if (params.values) {
        this.values = params.values;
        this.fromStorage = true;
    }

    if (params.options) {
        this.options = params.options;
    }

    if (params.dimensions) {
        this.dimensions = params.dimensions;
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

Model.prototype.getValues = function() {
    return this.values;
};

Model.prototype.getRadarsiteOptions = function() {
    return this.options.radarsiteOptions;
};

Model.prototype.getTypeOptions = function() {
    return this.options.typeOptions;
};

Model.prototype.getContentOptions = function() {
    return this.options.contentOptions;
};

Model.prototype.getSizeOptions = function() {
    return this.options.sizeOptions;
};

Model.prototype.setRadarsiteOptions = function(radarsiteOptions) {
    this.options.radarsiteOptions = radarsiteOptions;
};

Model.prototype.setTypeOptions = function(typeOptions) {
    this.options.typeOptions = typeOptions;
};

Model.prototype.setContentOptions = function(contentOptions) {
    this.options.contentOptions = contentOptions;
};

Model.prototype.setSizeOptions = function(sizeOptions) {
    this.options.sizeOptions = sizeOptions;
};

Model.prototype.getDimensions = function() {
    return this.dimensions;
};

Model.prototype.setDimensions = function(height, width) {
    this.dimensions = {
        height: height,
        width: width
    };
};

Model.prototype.save = function() {
    storage.save({
        values: this.values,
        options: this.options,
        dimensions: this.dimensions
    });

    this.fromStorage = false;
};

Model.prototype.unsave = function() {
    storage.unsave();
};

module.exports = Model;
