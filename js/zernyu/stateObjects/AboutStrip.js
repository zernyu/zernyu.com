define([
    'zernyu/Analytics',
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/states'
], function (Analytics, StateObject, StateManager, states) {
    'use strict';

    $.widget('zernyu.aboutStrip', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            /* Add mouse effects to the Resume child node */
            this.element.find('#resume').css({
                opacity: '0.5'
            }).hover(
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state === states.ABOUT && !stateData.moving) {
                        $(this).stop().animate({opacity: '1.0'});
                    }
                },
                function () {
                    var stateData = StateManager.getState();
                    if (stateData.state === states.ABOUT && !stateData.moving) {
                        $(this).stop().animate({opacity: '0.5'});
                    }
                }
            ).click(
                function () {
                    Analytics.trackEvent('linkClick', 'resume');
                }
            );

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
                        top: -220,
                        opacity: 0,
                        speed: 275
                    }
                });
                break;
            case states.PROJECTS_LIST:
                this._setOptions({
                    dimensions: {
                        top: -220,
                        opacity: 0,
                        speed: 200
                    }
                });
                break;
            case states.ABOUT:
                this._setOptions({
                    dimensions: {
                        top: 220,
                        opacity: 1,
                        speed: 200
                    },
                    inFocus: true
                });
                break;
            case states.PROJECT_DETAILS:
                this._setOptions({
                    dimensions: {
                        top: -220,
                        opacity: 0,
                        speed: 200
                    }
                });
                break;
            }
        },

        /**
         * @inheritDoc
         * @override To replace the images in the About Strip
         */
        _focus: function () {
            this._super();

            this.element.find('img').each(function () {
                var filename = $(this).attr('src');
                $(this).attr('src', filename.substr(0, filename.length - 5) + '1.png');
            });
            this.element.find('#info').css({background: 'url("/png/contact1.png")'});
        },

        /**
         * @inheritDoc
         * @override To replace the images in the About Strip
         */
        _blur: function () {
            this._super();

            this.element.find('img').each(function () {
                var filename = $(this).attr('src');
                $(this).attr('src', filename.substr(0, filename.length - 5) + '2.png');
            });
            this.element.find('#info').css({background: 'url("/png/contact2.png")'});
        }
    });
});