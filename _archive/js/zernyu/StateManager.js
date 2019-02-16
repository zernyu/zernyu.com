/**
 * Keeps track of the current app state and broadcasts state changes. Different elements on the page will
 * be displayed or hidden depending on the state of the app.
 */
define([
    'zernyu/events',
    'zernyu/states',
    'jquery'
], function (events, states) {
    'use strict';

    /* Private variables */

    /* The current app state */
    var state = states.HOME;
    /* If the State Objects are currently in motion */
    var moving = false;
    /* The top and left offset of the currently selected Project and the project title */
    var selectedProject = {
        offset: {
            top: 0,
            left: 0
        },
        project: null
    };

    /* Return a singleton! */
    return {
        /**
         * Returns the current state of the app
         * @returns {{state: number, moving: boolean}}
         */
        getState: function () {
            return {
                state: state,
                moving: moving
            };
        },

        /**
         * Set the state of the site. Depending on the state, StateObjects will be in different
         * positions and in or out of focus depending on their state.
         * @param {number} newState the current state
         */
        setState: function (newState) {
            /* Do nothing if the app is in motion or the state is not changed */
            if (newState === state) {
                return;
            }

            state = newState;
            moving = true;

            /* Let erryone know about the good news! */
            $.event.trigger(events.stateChangeEvent, newState);
        },

        /**
         * Get info about the currently selected project
         * @returns {{offset: {top: number, left: number}, project: string}}
         */
        getSelectedProject: function () {
            /* Return a copy */
            return $.extend({}, selectedProject);
        },

        /**
         * Calculate the offset of the currently selected project and save the title and url of the selected project
         * @param {*} selected the current selected project's data
         */
        setSelectedProject: function (selected) {
            selectedProject.project = selected.project;
            selectedProject.offset.top = selected.offset ? selected.offset.top : 0;
            selectedProject.offset.left = selected.offset ? selected.offset.left : 0;
        },

        /**
         * Set the moving status to false
         */
        stopMoving: function () {
            moving = false;
        }
    };
});