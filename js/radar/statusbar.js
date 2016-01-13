var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var dom = require('../dom');

function padding(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}

function printNow() {
    var d = new Date();

    return [padding(d.getHours()), padding(d.getMinutes()), padding(d.getSeconds())].join(':');
}

function div(children) {
    return dom.el('div', {
        class: 'base-grid',
        children: children
    });
}

function Statusbar(place) {
    EventEmitter.call(this);

    this.place = dom.el('p', {
        class: 'statusbar-place',
        text: place || ''
    });

    var changeBtn = dom.button({
        type: 'button',
        text: 'Endre'
    });

    changeBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        this.emit('statusbar:change');
    }.bind(this));

    this.refreshTime = dom.el('p', {
        class: 'statusbar-time',
        text: printNow()
    });

    var refreshBtn = dom.button({
        type: 'button',
        text: 'Oppdater'
    });

    refreshBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        this.emit('statusbar:refresh');

        this.setRefreshTime();
    }.bind(this));

    var removeBtn = dom.button({
        type: 'button',
        text: 'Fjern',
        class: 'btn-red'
    });

    removeBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        this.emit('statusbar:remove');
    }.bind(this));

    this.el = dom.el('div', {
        class: 'statusbar',
        children: [
            div([
                this.place,
                changeBtn
            ]),
            div([
                this.refreshTime,
                refreshBtn
            ]),
            div([removeBtn])
        ]
    });
}

// at EventEmitter function to prototype (I guess)
inherits(Statusbar, EventEmitter);

Statusbar.prototype.setPlace = function(text) {
    this.place.textContent = text;
};

Statusbar.prototype.setRefreshTime = function() {
    this.refreshTime.textContent = printNow();
};

module.exports = Statusbar;
