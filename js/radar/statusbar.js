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

function Statusbar(changeRadarCb, refreshCb, place) {
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

        changeRadarCb();
    });

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

        refreshCb();

        this.setRefreshTime();
    }.bind(this));

    this.el = dom.el('div', {
        class: 'statusbar',
        children: [
            this.place,
            changeBtn,
            this.refreshTime,
            refreshBtn
        ]
    });
}

Statusbar.prototype.setPlace = function(text) {
    this.place.textContent = text;
};

Statusbar.prototype.setRefreshTime = function() {
    this.refreshTime.textContent = printNow();
};

module.exports = Statusbar;
