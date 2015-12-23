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
        domNode.className = params.class;
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
        var select = el('select', params);

        return select;
    },
    image: function(params) {
        var img = new Image();

        if (params.onload) {
            img.onload = params.onload;
        }

        if (params.src) {
            img.src = params.src;
        }

        if (params.class) {
            img.className = params.class;
        }

        return img;
    }
};
