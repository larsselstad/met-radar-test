function option(value, text) {
    var o = document.createElement('option');

    o.value = value;
    o.textContent = text;

    return o;
}

module.exports = {
    option: option,
    select: function (name, id, options, changeFn) {
        var select = document.createElement('select');

        select.name = name;
        select.id = id;

        select.appendChild(option('', '-- Velg noe --'));

        options.forEach(function (site) {
            select.appendChild(option(site, site));
        });

        select.addEventListener('change', changeFn);

        return select;
    },
    image: function (site, type, size, content) {
        var img = new Image();

        var params = [
            'radarsite=' + site,
            'type=' + type,
            'content=' + content,
            'size=' + size
        ];

        img.src = "http://api.met.no/weatherapi/radar/1.5/?" + params.join(';');

        return img;
    }
};
