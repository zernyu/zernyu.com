define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/Router',
    'zernyu/events',
    'zernyu/states'
], function (StateObject, StateManager, Router, events, states) {
    'use strict';

    $.widget('zernyu.projects', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            this.element.css('cursor', 'pointer').hover(
                /* Fade the DOM node when hovered over or change focus depending on the app state */
                $.proxy(function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.PROJECTS_LIST && stateData.state !== states.PROJECT_DETAILS && !stateData.moving) {
                        this._setOption('dimensions', {opacity: '1.0', speed: null});
                    }
                    if (stateData.state === states.PROJECT_DETAILS && !stateData.moving) {
                        $.event.trigger(events.focusChangeEvent, 4);
                    }
                }, this),
                $.proxy(function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.PROJECTS_LIST && stateData.state !== states.PROJECT_DETAILS && !stateData.moving) {
                        this._setOption('dimensions', {opacity: '0.5', speed: null});
                    }
                    if (stateData.state === states.PROJECT_DETAILS && !stateData.moving) {
                        $.event.trigger(events.focusChangeEvent, 3);
                    }
                }, this)
            );

            this._super();
        },

        /**
         * @inheritDoc
         */
        _updateState: function (event, state) {
            var dimensions = this.options.dimensions;

            switch (state) {
            case states.HOME:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top,
                        left: dimensions.left,
                        width: dimensions.width,
                        height: dimensions.height,
                        opacity: 0.5,
                        speed: 275
                    },
                    inFocus: true
                });
                this.element.css({cursor: 'pointer'});
                break;
            case states.PROJECTS_LIST:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top / 10,
                        left: dimensions.left / 4,
                        width: dimensions.width * 2,
                        height: dimensions.height * 2,
                        opacity: 1,
                        speed: 200
                    },
                    inFocus: true
                });
                this.element.css({cursor: 'default'});
                break;
            case states.ABOUT:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top * 2.1, // equivalent to About.top * 1.4
                        left: dimensions.left / 4,
                        width: dimensions.width * 2,
                        height: dimensions.height * 2,
                        opacity: 0.5,
                        speed: 200
                    },
                    inFocus: true
                });
                this.element.css({cursor: 'pointer'});
                break;
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: -dimensions.top / 1.5,
                        left: -dimensions.left / 4,
                        width: dimensions.width * 3,
                        height: dimensions.height * 3,
                        opacity: 0.5,
                        speed: 200
                    },
                    inFocus: false
                });
                this.element.css({cursor: 'pointer'});
                break;
            }
        }
    });
});