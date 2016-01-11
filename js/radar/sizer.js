var dom = require('../dom');
var _ = require('lodash');

// takes '600px' and returns 600
function getInt(str) {
    return parseInt(str.replace('px', ''), 10);
}

function Sizer() {
    this.el = dom.el('div', {
        class: 'sizer-handle'
    });
}

Sizer.prototype.init = function (element, changeCb) {
    var startX = 0;
    var startWidth = 0;
    var ratio = 1;
    var onMousemove;

    this.el.addEventListener('mousedown', function(evt) {
        evt.stopPropagation();

        startX = evt.clientX;
        startWidth = getInt(element.style.width);
        ratio = startWidth / getInt(element.style.height);

        document.addEventListener('mousemove', onMousemove = _.throttle(function mousemove(evt) {
            evt.stopPropagation();

            var newWidth = startWidth + (evt.clientX - startX);

            element.style.width = newWidth + 'px';
            element.style.height = newWidth / ratio + 'px';
        }, 100));

        document.addEventListener('mouseup', cancel);
    });

    function cancel(evt) {
        evt.stopPropagation();
        
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('mouseup', cancel);

        changeCb();
    }
};

module.exports = Sizer;
