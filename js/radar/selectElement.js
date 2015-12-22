var dom = require('../dom');

function changeEvent() {
    // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
    if (typeof window.Event === "function") {
        return new Event('change', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        });
    } else {
        var event = document.createEvent('Event');
        event.initEvent('change', true, true);

        return event;
    }
}

function addStartOption(select) {
    select.appendChild(dom.option('', '-- Velg noe --'));
}

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

    this.setOptions(options);
}

SelectElement.prototype.setOptions = function(options) {
    this.select.innerHTML = '';

    if (!options) {
        addStartOption(this.select);

        return;
    }

    if (options.length === 0 || options.length !== 1) {
        addStartOption(this.select);
    }

    options.forEach(function(option) {
        this.select.appendChild(dom.option(option, option));
    }, this);

    if (options.length === 1) {
        this.select.dispatchEvent(changeEvent());
    }
};

module.exports = SelectElement;
