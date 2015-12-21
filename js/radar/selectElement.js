var dom = require('../dom');

function SelectElement(label, name, options) {
    this.el = dom.el('div', {
        class: 'base-grid',
        children: [
            dom.el('label', {
                for: name,
                text: label
            }),
            this.select = dom.select({
                name: name,
                id: name
            })
        ]
    });

    if (options) {
        this.setOptions(options);
    }
}

SelectElement.prototype.setOptions = function(options) {
    this.select.innerHTML = '';

    if (options.length !== 1) {
        this.select.appendChild(dom.option('', '-- Velg noe --'));
    }

    options.forEach(function(option) {
        this.select.appendChild(dom.option(option, option));
    }, this);

    if (options.length === 1) {
        console.log('Todo: trigger change event');
    }
};

module.exports = SelectElement;
