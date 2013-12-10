/**
 * The app's various states enumerated here!
 */
define([], function () {
    'use strict';

    var states = {
        HOME: 0,
        PROJECTS_LIST: 1,
        PROJECT_DETAILS: 2,
        ABOUT: 3
    };

    /* Use Object.freeze if the browser supports it */
    if (Object.freeze) {
        return Object.freeze(states);
    } else {
        return states;
    }
});