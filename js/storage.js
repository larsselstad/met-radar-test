var KEY = 'models';

var lastId = 0;
var models = [];

function findIndexOf(id) {
    if (id === undefined) {
        return;
    }

    for (var i = 0; i < models.length; i++) {
        if (models[i].id === id) {
            return i;
        }
    }
}

function replaceModel(model) {
    var index = findIndexOf(model.id);

    models[index] = model;
}

function findHighestId() {
    var high = 0;

    models.forEach(function(model) {
        if (model.id > high) {
            high = model.id;
        }
    });

    return high;
}

module.exports = {
    save: function(model) {
        if (model.id === undefined || model.id === '') {
            model.id = lastId;

            lastId++;

            models.push(model);
        } else {
            replaceModel(model);
        }

        localStorage.setItem(KEY, JSON.stringify(models));

        return model.id;
    },
    remove: function(id) {
        if (id !== undefined) {
            var index = findIndexOf(id);

            models.splice(index, 1);

            localStorage.setItem(KEY, JSON.stringify(models));
        }
    },
    get: function() {
        var values = localStorage.getItem(KEY);

        if (values) {
            models = JSON.parse(values);

            lastId = findHighestId() + 1;

            return models;
        }

        return [];
    }
};
