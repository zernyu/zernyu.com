/**
 * An "abstract" widget to be subclassed. A pseudo-stateful object that moves around and does things
 * depending on the app state
 **/
define([
    'zernyu/StateManager',
    'zernyu/events',
    'jquery-ui'
], function (StateManager, events) {
    'use strict';

    /* StateObject shared variables */

    /* Used to disable animations if the widget is initializing */
    var initializing = false;

    /**
     * Determine if this object is in focus depending on the current focused layer
     * @param {jQuery.Event} event ignore this
     * @param {number} layer the current focused layer
     */
    function focusHandler(event, layer) {
        /*jshint validthis: true */
        this._setOption('inFocus', layer === this.options.layer);
    }

    /**
     * Move and resize the StateObject
     * @param {Object} dimensions an object containing the target dimensions
     */
    function transform(dimensions) {
        /*jshint validthis: true */
        if (dimensions.hide === false) {
            this.element.show();
        }

        this.element.stop()
            .animate(
            dimensions,
            /* Disable animation (instant animation) when the app is initializing */
            initializing ? 0 : dimensions.speed,
            /* Animation callback */
            function () {
                if (dimensions.hide) {
                    $(this).hide();
                }

                StateManager.stopMoving();
            }
        );

        initializing = false;
    }

    /**
     * An "abstract" jQuery widget to be subclassed and overridden. Provides functionality to
     * change the way the StateObject looks (image, size, opacity, etc) depending on its current state.
     */
    $.widget('zernyu.stateObject', {
        options: {
            /* Source image for focused image (only if DOM node is IMG) */
            focusImgSrc: null,
            /* Source image for blurred image (only if DOM node is IMG) */
            blurImgSrc: null,
            /* Source image for focused image (only if DOM node is not IMG) */
            focusBackgroundSrc: null,
            /* Source image for blurred image (only if DOM node is not IMG) */
            blurBackgroundSrc: null,
            /* Dimension properties of the StateObject */
            dimensions: {
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                opacity: 0,
                /* Speed at which to play animation */
                speed: 0,
                /* Hide or show the object */
                hide: false
            },
            /* The layer the StateObject is on. Bottom layer is 1 */
            layer: 0,
            /* Whether the StateObject is in focus or not */
            inFocus: true
        },

        /**
         * @constructor
         * @private
         */
        _create: function () {
            /* Bind a handler to when the app's state has changed */
            $(document).on(events.stateChangeEvent, $.proxy(this._updateState, this));
            /* Bind a handler to when the current focused object has changed */
            $(document).on(events.focusChangeEvent, $.proxy(focusHandler, this));
        },

        /**
         * @private
         */
        _init: function () {
            initializing = true;

            /* Grab data- attributes from the markup */
            var initData = this.element.data();

            /* Grab initial dimensions specified in markup or zero if not specified */
            var dimensions = {
                top: initData.top || 0,
                left: initData.left || 0,
                width: initData.width || 0,
                height: initData.height || 0,
                opacity: initData.opacity || 0,
                speed: initData.speed || 0,
                hide: initData.hide || false
            };

            /* Initialize the State Object with initial parameters! */
            this._setOptions({
                focusImgSrc: initData.focusImage,
                blurImgSrc: initData.blurImage,
                focusBackgroundSrc: initData.focusBackground,
                blurBackgroundSrc: initData.blurBackground,
                layer: initData.layer,
                inFocus: true,
                dimensions: dimensions
            });

            /* Go to the current page state */
            this._updateState(null, StateManager.getState().state);
        },

        /**
         * @private
         */
        _destroy: function () {
            /* Unbind events */
            var $document = $(document);
            $document.off(events.stateChangeEvent, $.proxy(this._updateState, this));
            $document.off(events.focusChangeEvent, $.proxy(focusHandler, this));

            /* Remove all mouse events */
            this.element.off();
        },

        /**
         * Overriding to add special value return cases
         * @param key
         * @param value
         * @private
         */
        _setOption: function (key, value) {
            switch (key) {
                /* When focus is changed */
            case 'inFocus':
                if (value) {
                    this._focus.call(this);
                } else {
                    this._blur.call(this);
                }
                break;
                /* When dimensions are changed */
            case 'dimensions':
                /* Merge default dimension values if Object is initializing */
                if (initializing) {
                    $.extend(this.options.dimensions, value);
                }
                transform.call(this, value);
                return; // Don't call super because we don't want to overwrite initial values
            }

            this._super(key, value);
        },

        /**
         * Override this to make changes when the state has changed
         * @param {jQuery.Event} event ignore this
         * @param {number} state the new state
         * @private
         */
        _updateState: function (event, state) {
            /* jshint unused: false */
        },

        /**
         * Change the StateObject to the blurred appearance
         */
        _blur: function () {
            if (this.options.blurImgSrc) {
                /* If Object node type is IMG, then swap the image source */
                this.element.attr('src', this.options.blurImgSrc);
            } else if (this.options.blurBackgroundSrc) {
                /* Otherwise swap the background image source in css */
                this.element.css('background', 'url("' + this.options.blurBackgroundSrc + '")');
            }
        },

        /**
         * Change the StateObject to the in focus appearance
         */
        _focus: function () {
            if (this.options.focusImgSrc) {
                /* If Object node type is IMG, then swap the image source */
                this.element.attr('src', this.options.focusImgSrc);
            } else if (this.options.focusBackgroundSrc) {
                /* Otherwise swap the background image source in css */
                this.element.css('background', 'url("' + this.options.focusBackgroundSrc + '")');
            }
        }

    });
});