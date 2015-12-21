function Model(values) {
    this.values = {};

    if (values) {
        this.values = values;
    }
}

Model.prototype.setRadarsite = function (site) {
    this.values.radarsite = site;
};

Model.prototype.setType = function (type) {
    this.values.type = type;
};

Model.prototype.setContent = function (content) {
    this.values.content = content;
};

Model.prototype.setSize = function (size) {
    this.values.size = size;
};

module.exports = Model;
