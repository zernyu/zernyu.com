/**
 * Window resize observer that will keep track of the current window size
 * and also publish a debounced event for when the window has been resized
 */
define([
    'zernyu/debounce',
    'zernyu/events',
    'jquery'
], function (debounce, events) {
    'use strict';

    /* Keep track of window dimensions here */
    var windowSize = {
        width: 0,
        height: 0
    };

    function resizeHandler() {
        /* Update windowSize object with updated window dimensions */
        var $window = $(window);
        windowSize.width = $window.width();
        windowSize.height = $window.height();

        /* Publish a 'windowResized' event for other functions to hook into */
        $.event.trigger({
            type: events.windowResizeEvent
        });
    }

    /* Initialize values */
    resizeHandler();

    /* Debounce window resize handler to reduce number of calls */
    var dResize = debounce(resizeHandler, 100);
    /* Bind debounced resize handler to window resize event */
    $(window).resize(dResize);

    return windowSize;
});