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
        var select = el('select', {
            name: params.name,
            id: params.id
        });

        return select;
    },
    radarImage: function(params) {
        var img = new Image();

        img.src = "http://api.met.no/weatherapi/radar/1.5/?" + params.parameters.join(';');

        return img;
    }
};
