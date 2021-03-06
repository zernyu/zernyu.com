define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/Router',
    'zernyu/events',
    'zernyu/states'
], function (StateObject, StateManager, Router, events, states) {
    'use strict';

    $.widget('zernyu.zernyu', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            this.element.hover(
                /* Change the currently focused layer when moused over and out */
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.HOME && stateData.state !== states.PROJECT_DETAILS && !stateData.moving) {
                        $.event.trigger(events.focusChangeEvent, 5);
                    }
                },
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.HOME && stateData.state !== states.PROJECT_DETAILS && !stateData.moving) {
                        $.event.trigger(events.focusChangeEvent, 4);
                    }
                }
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
                        speed: 275
                    },
                    inFocus: true
                });
                this.element.css({cursor: 'default'});
                break;
            case states.PROJECTS_LIST:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top - dimensions.height / 2,
                        left: dimensions.left - dimensions.width / 2,
                        width: dimensions.width * 1.5,
                        height: dimensions.height * 1.5,
                        speed: 200
                    },
                    inFocus: false
                });
                this.element.css({cursor: 'pointer'});
                break;
            case states.ABOUT:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top - dimensions.height / 2,
                        left: dimensions.left - dimensions.width / 2,
                        width: dimensions.width * 1.5,
                        height: dimensions.height * 1.5,
                        speed: 200
                    },
                    inFocus: false
                });
                this.element.css({cursor: 'pointer'});
                break;
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: dimensions.top - dimensions.width,
                        left: dimensions.left - dimensions.height,
                        width: dimensions.width * 1.5,
                        height: dimensions.height * 1.5,
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