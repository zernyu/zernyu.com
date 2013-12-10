define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/Router',
    'zernyu/windowSize',
    'zernyu/events',
    'zernyu/states',
    'jquery-mousewheel'
], function (StateObject, StateManager, Router, windowSize, events, states) {
    'use strict';

    /**
     * Callback for whenever the browser window is resized. If the Project strip is visible,
     * trigger an event
     */
    function resizeHandler() {
        /*jshint validthis: true*/
        var state = StateManager.getState().state;
        if (state !== states.PROJECTS_LIST && state !== states.PROJECT_DETAILS) {
            return;
        }

        /*
         Trigger an event when the Project strip is showing and supply whether
         the div is scrollable or not
         */
        $.event.trigger(events.scrollChangeEvent, this.element.prop('scrollWidth') > windowSize.width);
    }

    /**
     * Hooking into the focus change event to add a further blur to the strip when in project details
     * @param {jQuery.Event} event ignore this
     * @param {number} layer the current focused layer
     */
    function focusHandler(event, layer) {
        /*jshint validthis: true*/
        if (this.options.layer === 2) {
            this.element.toggleClass('blur', layer > 3);
        }
    }

    $.widget('zernyu.projectsStrip', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            /* bind mouseover events to the items within the projects strip */
            this.element.find('img').hover(
                /* Switch item image to hover image when moused over */
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state === states.PROJECTS_LIST && !stateData.moving) {
                        var filename = $(this).attr('src');
                        $(this).attr('src', filename.substr(0, filename.length - 5) + '3.png');
                    }
                },
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state === states.PROJECTS_LIST && !stateData.moving) {
                        var filename = $(this).attr('src');
                        $(this).attr('src', filename.substr(0, filename.length - 5) + '1.png');
                    }
                }
            );

            $(document).on(events.windowResizeEvent, $.proxy(resizeHandler, this));
            $(document).on(events.focusChangeEvent, $.proxy(focusHandler, this));

            /* Add mousewheel scrolling ability to the projects strip */
            if ($('.touch').length === 0) {
                this.element.on('mousewheel', $.proxy(function (e, delta) {
                    /* Do nothing if there's no scrolling ability */
                    if (this.element.prop('scrollWidth') <= windowSize.width) {
                        return;
                    }

                    /* Calculate new scroll position */
                    var scrollLeft = this.element.scrollLeft();
                    var newScroll = scrollLeft - ((delta / Math.abs(delta)) * 40);

                    /* Scroll and notify rest of app */
                    this.element.scrollLeft(newScroll);
                    $.event.trigger(events.scrollEvent);
                }, this));
            }

            this._super();
        },

        /**
         * @inheritDoc
         */
        _updateState: function (event, state) {
            switch (state) {
            case states.HOME:
                this._setOptions({
                    dimensions: {
                        top: 220,
                        left: -windowSize.width,
                        opacity: 0,
                        speed: 275
                    },
                    layer: 4
                });
                break;
            case states.PROJECTS_LIST:
                this._setOptions({
                    dimensions: {
                        top: 220,
                        left: 0,
                        opacity: 1,
                        speed: 200
                    },
                    layer: 4,
                    inFocus: true
                });
                break;
            case states.ABOUT:
                this._setOptions({
                    dimensions: {
                        left: -windowSize.width,
                        opacity: 0,
                        speed: 200
                    },
                    layer: 4
                });
                break;
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: 380,
                        opacity: 1,
                        speed: 200
                    },
                    layer: 2,
                    inFocus: false
                });
                break;
            }
        },

        /**
         * @inheritDoc
         * @override To replace the images of the Project Strip items
         */
        _focus: function () {
            this._super();

            this.element.find('img').each(function () {
                var filename = $(this).attr('src');
                $(this).attr('src', filename.substr(0, filename.length - 5) + '1.png');
            });

            this.element.removeClass('blur');
        },

        /**
         * @inheritDoc
         * @override To replace the images of the Project Strip items
         */
        _blur: function () {
            this._super();

            this.element.find('img').each(function () {
                var filename = $(this).attr('src');
                $(this).attr('src', filename.substr(0, filename.length - 5) + '2.png');
            });
        }
    });
});