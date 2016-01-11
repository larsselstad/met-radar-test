var _ = require('lodash');

// takes '600px' and returns 600
function removePx(value) {
        return parseInt(value.replace(/px/g, ''), 10);
    }

function imageLeft(image) {
    return removePx(window.getComputedStyle(image, null).left);
}

function imageTop(image) {
    return removePx(window.getComputedStyle(image, null).top);
}

module.exports = function (element, changeCb) {
    var startX = 0;
    var startY = 0;
    var left = 0;
    var top = 0;
    var moveX = 0;
    var moveY = 0;
    var onMousemove;

    element.addEventListener('mousedown', function(evt) {
        startX = evt.clientX;
        startY = evt.clientY;
        left = imageLeft(element);
        top = imageTop(element);

        document.addEventListener('mousemove', onMousemove = _.throttle(function mousemove(evt) {
            moveX = evt.clientX - startX;
            moveY = evt.clientY - startY;

            element.style.left = left + moveX + 'px';
            element.style.top = top + moveY + 'px';
        }, 100));

        document.addEventListener('mouseup', cancel);
    });

    function cancel() {
        document.removeEventListener('mousemove', onMousemove);
        document.removeEventListener('mouseup', cancel);

        changeCb();
    }
};
