/**
 * The app's routes are defined here. Do cool stuff!
 */
define([
    'zernyu/Analytics',
    'zernyu/StateManager',
    'zernyu/states',
    'jquery-history',
    'Router'
], function (Analytics, StateManager, states) {
    'use strict';

    var router = new Router();

    router.route('/', function () {
        document.title = 'zernyu chou';
        $('meta[name="description"]').attr('content', 'Hello! I\'m Zernyu and this is my portfolio. I am a Chicago-based full stack developer, but I have a keen appreciation for front end development and the endless possibilities of beautiful user interfaces.');
        StateManager.setState(states.HOME);
    });

    router.route('/projects', function () {
        document.title = 'zernyu chou | projects';
        $('meta[name="description"]').attr('content', 'Hello! I\'m Zernyu. Come peruse my various projects I have worked on');
        StateManager.setState(states.PROJECTS_LIST);
    });

    router.route('/projects/:id', function (project) {
        var projectData = {
            project: project
        };

        /* If additional data about the selected project is available, use it */
        var stateData = History.getState();
        $.extend(projectData, stateData.data);

        StateManager.setSelectedProject(projectData);
        StateManager.setState(states.PROJECT_DETAILS);
    });

    router.route('/about', function () {
        document.title = 'zernyu chou | about';
        $('meta[name="description"]').attr('content', 'Hello! I\'m Zernyu. Check out my resume and give me a holler.');
        StateManager.setState(states.ABOUT);
    });

    $(document).ready(function () {
        function buildData (e) {
            /* Set the currently selected projected when the user clicks on a project element */
            var stateData = StateManager.getState();
            if (stateData.state === states.PROJECTS_LIST && !stateData.moving) {
                /* Grab the selected project and navigate to it! */
                var $selected = $(e.target);

                return {
                    project: $selected.data().key,
                    offset: $selected.offset()
                };
            }

            return null;
        }

        /* Replace page anchor functionality with our own custom routing with a little analytics to garnish */
        $('a').each(function () {
            var $this = $(this);

            if ($this.data().link !== undefined) {
                $this.on('click', function (e) {
                    /* Remove nav anchor functionality... let's see if Google will still crawl this */
                    e.preventDefault();

                    /* Always include a leading slash (fixes IE9-) */
                    var pathName = this.pathname.replace(/(^\/?)/,'/');

                    router.navigate(pathName, buildData(e));
                    Analytics.trackPageView(pathName);
                });
            }
        });

        router.start();
    });

    /* Return a small utility for State Objects to navigate around the app */
    return {
        navigate: function (state, data) {
            switch (state) {
            case states.HOME:
                router.navigate('/');
                break;
            case states.PROJECTS_LIST:
                router.navigate('/projects');
                break;
            case states.PROJECT_DETAILS:
                router.navigate('/projects/' + data.project, data);
                break;
            case states.ABOUT:
                router.navigate('/about');
                break;
            }
        }
    };
});
