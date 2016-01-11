var fs = require('fs');
var parseString = require('xml2js').parseString;
var dom = require('./dom');
var Available = require('./available');
var radarView = require('./radar/view.js');
var Model = require('./radar/model.js');
var storage = require('./storage');

var app = document.querySelector('#app');

var xml = fs.readFileSync('a.xml', {
    encoding: 'utf8'
});

parseString(xml, function(err, result) {
    if (err) {
        console.error(err);
    }

    var queries = result.available.query;

    var available = new Available(queries);

    var storedValues = storage.get();

    if (storedValues.length === 0) {
        addRadar(available);
    } else {
        storedValues.forEach(function(value) {
            addRadar(available, value);
        });
    }

    var addRadarBtn = dom.button({
        text: '+',
        class: 'radar-add-btn',
        type: 'button'
    });

    addRadarBtn.addEventListener('click', function(evt) {
        evt.preventDefault();

        addRadar(available);
    });

    app.appendChild(addRadarBtn);
});

function addRadar(available, values) {
    var model = new Model(values);

    var rv = radarView(model, available);

    app.appendChild(rv);
}
