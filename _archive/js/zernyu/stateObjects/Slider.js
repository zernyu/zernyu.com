define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/windowSize',
    'zernyu/events',
    'zernyu/states'
], function (StateObject, StateManager, windowSize, events, states) {
    'use strict';

    /* Yea it's hardcoded... Maybe the slider should be a child of the Projects Strip instead... */
    var $projectsStripContainer = $('#projectsStripContainer');

    /**
     * Show/hide the project slider when the window is resized and the project list is scrollable
     */
    function resizeHandler(event, scrollable) {
        /*jshint validthis: true*/
        if (scrollable) {
            this._setOption('dimensions', {
                top: StateManager.getState().state === states.PROJECT_DETAILS ? 540 : 380,
                left: $projectsStripContainer.scrollLeft() / ($projectsStripContainer.prop('scrollWidth') - windowSize.width) * (windowSize.width - 242),
                speed: 200,
                hide: false
            });
        } else {
            /* Hide the slider */
            this._setOption('dimensions', {
                left: -242,
                speed: 200,
                hide: true
            });
        }
    }

    /**
     * Move the slider if the project list is scrolled without the slider
     */
    function scrollHandler() {
        /*jshint validthis: true*/
        this._setOption('dimensions', {
            left: $projectsStripContainer.scrollLeft() / ($projectsStripContainer.prop('scrollWidth') - windowSize.width) * (windowSize.width - 242),
            speed: 0
        });
    }

    $.widget('zernyu.slider', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            this.element.draggable({
                axis: 'x',
                containment: 'window',
                drag: function (e, ui) {
                    $projectsStripContainer.scrollLeft(ui.offset.left / (windowSize.width - 242) * ($projectsStripContainer.prop('scrollWidth') - windowSize.width));
                }
            }).hover(
                    $.proxy(function () {
                        var stateData = StateManager.getState();
                        if (stateData.state === states.PROJECTS_LIST && !stateData.moving) {
                            this._setOption('dimensions', {opacity: '1.0', speed: null});
                        }
                    }, this),
                    $.proxy(function () {
                        var stateData = StateManager.getState();
                        if (stateData.state === states.PROJECTS_LIST && !stateData.moving) {
                            this._setOption('dimensions', {opacity: '0.75', speed: null});
                        }
                    }, this)
                );

            $(document).on(events.scrollChangeEvent, $.proxy(resizeHandler, this));
            $(document).on(events.scrollEvent, $.proxy(scrollHandler, this));

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
                        left: -242,
                        speed: 275,
                        hide: true
                    },
                    layer: 4,
                    inFocus: true
                });
                break;
            case states.PROJECTS_LIST:
                if ($projectsStripContainer.prop('scrollWidth') > windowSize.width) {
                    this._setOptions({
                        dimensions: {
                            top: 380,
                            left: $projectsStripContainer.scrollLeft() / ($projectsStripContainer.prop('scrollWidth') - windowSize.width) * (windowSize.width - 242),
                            speed: 200,
                            hide: false
                        },
                        layer: 4,
                        inFocus: true
                    });
                } else {
                    this._setOptions({
                        dimensions: {
                            left: -242,
                            speed: 275,
                            hide: true
                        },
                        layer: 4,
                        inFocus: true
                    });
                }
                break;
            case states.ABOUT:
                this._setOptions({
                    dimensions: {
                        left: -242,
                        speed: 200,
                        hide: true
                    },
                    layer: 4,
                    inFocus: true
                });
                break;
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: 540,
                        speed: 200
                    },
                    layer: 2,
                    inFocus: false
                });
                break;
            }
        }
    });
});