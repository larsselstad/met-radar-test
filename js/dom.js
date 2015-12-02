// creates dom nodes and stuff

function el(tag, params) {
    var domNode = document.createElement(tag);

    if (params.name) {
        domNode.name = params.name;
    }

    if (params.id) {
        domNode.id = params.id;
    }

    if (params.value) {
        domNode.value = params.value;
    }

    if (params.class) {
        domNode.classList.add(params.class);
    }

    if (params.text) {
        domNode.textContent = params.text;
    }

    if (params.for) {
        domNode.for = params.for;
    }

    if (params.children) {
        params.children.forEach(function (child) {
            domNode.appendChild(child);
        });
    }

    return domNode;
}

function option(value, text) {
    return el('option', {
        value: value,
        text: text
    });
}

module.exports = {
    el: el,
    option: option,
    select: function(params) {
        var optionsNodes = params.options.map(function(site) {
            return option(site, site);
        });

        optionsNodes.unshift(option('', '-- Velg noe --'));

        var select = el('select', {
            name: params.name,
            id: params.id,
            children: optionsNodes
        });

        select.addEventListener('change', params.changeFn);

        return select;
    },
    image: function(params) {
        var img = new Image();

        var uri = [
            'radarsite=' + params.site,
            'type=' + params.type,
            'content=' + params.content,
            'size=' + params.size
        ];

        img.src = "http://api.met.no/weatherapi/radar/1.5/?" + uri.join(';');

        return img;
    }
};
