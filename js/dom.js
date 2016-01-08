// creates dom nodes and stuff

function el(tag, params) {
    var domNode = document.createElement(tag);

    if (params.name) {
        domNode.name = params.name;
    }

    if (params.id) {
        domNode.id = params.id;
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

function remove(node) {
    node.parentNode.removeChild(node);
}

module.exports = {
    el: el,
    option: option,
    select: function(params) {
        var select = el('select', params);

        if (params.value !== undefined) {
            select.value = params.value;
        }

        select.required = true;

        return select;
    },
    button: function(params) {
        params.class = params.class ? 'btn ' + params.class : 'btn';

        var btn = el('button', params);

        if (params.type) {
            btn.type = params.type;
        } else {
            btn.type = 'submit';
        }

        return btn;
    },
    image: function(params) {
        var img = new Image();

        if (params.onload) {
            img.onload = params.onload;
        }

        if (params.onclick) {
            img.onclick = params.onclick;
        }

        if (params.src) {
            img.src = params.src;
        }

        if (params.class) {
            img.className = params.class;
        }

        return img;
    },
    remove: remove
};
