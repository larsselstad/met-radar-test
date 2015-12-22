var KEY = 'model';

module.exports = {
    save: function (model) {
        localStorage.setItem(KEY, JSON.stringify(model.getValues()));
    },
    get: function () {
        var values = localStorage.getItem(KEY);

        if (values) {
            return JSON.parse(values);
        }

        return null;
    }
}
