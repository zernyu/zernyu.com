define([
    'zernyu/StateObject',
    'zernyu/StateManager',
    'zernyu/states',
    'jquery-slides'
], function (StateObject, StateManager, states) {
    'use strict';

    /* An invisible DOM element that displays behind the info popup to disable mouse input outside of the popup */
    var popupBacking;

    /**
     * Takes well formed JSON and populates the InfoPopup's contents with the received data
     * @param {json} projectData
     */
    function populateContents(projectData) {
        /*jshint validthis: true */
        document.title = 'zernyu chou | projects | ' + projectData.title;
        $('meta[name="description"]').attr('content', projectData.metadata);
        this.element.load(projectData.body, function () {
            $(this).find('.carousel').each(function () {
                var $this = $(this);
                var data = $this.data();
                $this.slidesjs({
                    width: data.width,
                    height: data.height,
                    pagination: {
                        active: false
                    }
                });
            });
        });
    }

    $.widget('zernyu.infoPopup', $.zernyu.stateObject, {
        /**
         * @inheritDoc
         */
        _create: function () {
            popupBacking = $('<div>').css({
                opacity: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                zIndex: this.element.css('zIndex') - 1
            }).hide().appendTo(document.body);

            this._super();
        },

        /**
         * @inheritDoc
         */
        _updateState: function (event, state) {
            switch (state) {
            case states.HOME:
            case states.ABOUT:
            case states.PROJECTS_LIST:
                if (this.element.is(':visible')) {
                    var selectedProjectIconOffset = StateManager.getSelectedProject().offset;
                    this._setOptions({
                        dimensions: {
                            left: selectedProjectIconOffset.left - 50 + 'px',
                            top: selectedProjectIconOffset.top - 10 + 'px',
                            width: '400px',
                            height: '220px',
                            speed: 200,
                            hide: true
                        },
                        inFocus: true
                    });
                }

                popupBacking.hide();
                break;
            case states.PROJECT_DETAILS:
                var selectedProject = StateManager.getSelectedProject();
                var dimensions = this.options.dimensions;

                this.element.empty();

                /* Grab the project data and populate the InfoPopup's contents.
                 * Super brittle... but no one else is gonna be touching this code. Ever. */
                $.get('/pages/' + selectedProject.project + '.json').done($.proxy(populateContents, this));

                this.element.scrollTop = 0;

                /* Position the popup over the selected project and then grow it to full size */
                this.element.stop().css({
                    left: selectedProject.offset.left - 50 + 'px',
                    top: selectedProject.offset.top - 10 + 'px',
                    width: '400px',
                    height: '220px'
                });
                this._setOptions({
                    dimensions: {
                        top: dimensions.top,
                        left: dimensions.left,
                        width: dimensions.width,
                        height: dimensions.height,
                        speed: 200,
                        hide: false
                    },
                    inFocus: true
                });

                popupBacking.show();
                break;
            }
        },

        /**
         * @inheritDoc
         * @override To remove the blur CSS class
         */
        _focus: function () {
            this._super();

            this.element.removeClass('blur');
        },

        /**
         * @inheritDoc
         * @override To add the blur CSS class
         */
        _blur: function () {
            this._super();

            this.element.addClass('blur');
        }
    });
});
