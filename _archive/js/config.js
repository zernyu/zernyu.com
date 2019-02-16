require.config({
    baseUrl: '/js',

    paths: {
        'jquery': 'lib/jquery/jquery-1.10.2',
        'jquery-ui': 'lib/jquery/jquery-ui-1.10.1.custom.min',
        'jquery-history': 'lib/jquery/jquery-history.min',
        'jquery-slides': 'lib/jquery/jquery.slides.min',
        'jquery-mousewheel': 'lib/jquery/jquery.mousewheel',
        'Router': 'lib/Router',
        'modernizr': 'lib/modernizr-2.6.2.custom.min'
    },

    shim: {
        'jquery-ui': {
            exports: '$',
            deps: ['jquery']
        },
        'jquery-history': ['jquery'],
        'jquery-slides': ['jquery'],
        'jquery-mousewheel': ['jquery'],
        'Router': ['jquery-history']
    }
});

require(['app']);