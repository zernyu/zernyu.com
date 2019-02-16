define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/Router',
    'zernyu/windowSize',
    'zernyu/states'
], function (StateObject, StateManager, Router, windowSize, states) {
    'use strict';

    $.widget('zernyu.about', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            this.element.css('cursor', 'pointer').hover(
                /* Fade the DOM node when hovered over */
                $.proxy(function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.ABOUT && !stateData.moving) {
                        this._setOption('dimensions', {opacity: '1.0', speed: null});
                    }
                }, this),
                $.proxy(function () {
                    var stateData = StateManager.getState();
                    if (stateData.state !== states.ABOUT && !stateData.moving) {
                        this._setOption('dimensions', {opacity: '0.5', speed: null});
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
                        top: dimensions.top * 1.4, // equivalent to Projects.top * 2.1
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
            case states.ABOUT:
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
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: windowSize.height,
                        left: -dimensions.left / 4,
                        width: dimensions.width * 3,
                        height: dimensions.height * 3,
                        opacity: 0.5,
                        speed: 200
                    },
                    inFocus: true
                });
                this.element.css({cursor: 'pointer'});
                break;
            }
        }
    });
});