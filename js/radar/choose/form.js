var dom = require('../../dom');
var SelectElement = require('./selectElement');

function setOptions(select, options, selected) {
    if (options) {
        select.setOptions(options, selected);
    } else {
        select.setOptions();
    }
}

function Form(model, available, submitCb) {
    this.sites = new SelectElement('Site', 'radarsite');
    this.types = new SelectElement('Type', 'type');
    this.contents = new SelectElement('Content', 'content');
    this.size = new SelectElement('Size', 'size');

    this.model = model;

    this.el = dom.el('form', {
        class: '',
        children: [
            this.sites.el,
            this.types.el,
            this.contents.el,
            this.size.el,
            dom.button({
                text: 'Hent bilde',
                class: 'base-down js-editor'
            })
        ]
    });

    this.el.addEventListener('change', function(evt) {
        if (evt.target.name === 'radarsite') {
            this.setContents([]);
            this.setSize([]);

            this.model.setRadarsite(evt.target.value);

            this.setTypes(available.getTypesForSite(this.model.getRadarSite()));
        }

        if (evt.target.name === 'type') {
            this.setSize([]);

            this.model.setType(evt.target.value);

            this.setContents(available.getContentsForSite(this.model.getRadarSite(), this.model.getType()));
        }

        if (evt.target.name === 'content') {
            this.model.setContent(evt.target.value);

            this.setSize(available.getSizesForSite(this.model.getRadarSite(), this.model.getType(), this.model.getContent()));
        }

        if (evt.target.name === 'size') {
            this.model.setSize(evt.target.value);
        }
    }.bind(this));

    this.el.addEventListener('submit', function(evt) {
        evt.preventDefault();

        if (this.el.checkValidity()) {
            this.model.save();

            submitCb();
        }
    }.bind(this));
}

Form.prototype.setTypes = function setTypes(options) {
    this.model.setTypeOptions(options);
    this.types.setOptions(options);
};

Form.prototype.setContents = function setContents(options) {
    this.model.setContentOptions(options);
    this.contents.setOptions(options);
};

Form.prototype.setSize = function setSize(options) {
    this.model.setSizeOptions(options);
    this.size.setOptions(options);
};

Form.prototype.setOptions = function() {
    setOptions(this.sites, this.model.getRadarsiteOptions(), this.model.getRadarSite());
    setOptions(this.types, this.model.getTypeOptions(), this.model.getType());
    setOptions(this.contents, this.model.getContentOptions(), this.model.getContent());
    setOptions(this.size, this.model.getSizeOptions(), this.model.getSize());
};

module.exports = Form;
