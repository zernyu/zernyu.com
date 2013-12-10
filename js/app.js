define([
    'zernyu/Router',
    'zernyu/Analytics',
    'zernyu/windowSize',
    'zernyu/StateManager',
    'zernyu/stateObjects/Zernyu',
    'zernyu/stateObjects/Projects',
    'zernyu/stateObjects/About',
    'zernyu/stateObjects/AboutStrip',
    'zernyu/stateObjects/ProjectsStrip',
    'zernyu/stateObjects/InfoPopup',
    'zernyu/stateObjects/Slider',
    'zernyu/preloadImages',
    'jquery-ui',
    'modernizr'
], function () {
    'use strict';

    /* Page setup */
    $(document).ready(function () {
        $('#zernyu').zernyu();
        $('#projects').projects();
        $('#about').about();
        $('#aboutStripContainer').aboutStrip();
        $('#projectsStripContainer').projectsStrip();
        $('#popup').infoPopup();

        /* The slider is only necessary on non-touchscreen devices */
        if ($('.touch').length > 0) {
            $('#slider').remove();
        } else {
            $('#slider').slider();
        }
    });
});
