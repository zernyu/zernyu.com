/**
 * Google Analytics helper tool. Generates analytics code and gives helper functions
 * to track events
 */
define([], function () {
    'use strict';

    /* Set up Google Analytics */
    var _gaq = window._gaq || [];
    _gaq.push(['_setAccount', 'UA-3220155-1']);

    /* Track this page view! */
    _gaq.push(['_trackPageview']);

    window._gaq = _gaq;

    (function () {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();

    return {
        /**
         * Track a page view in Google Analytics
         * @param {string} url the page url
         */
        trackPageView: function (url) {
            window._gaq.push(['_trackPageview', url]);
        },

        /**
         * Track an event in Google Analytics
         * @param {string} category
         * @param {string} action
         * @param {string} [label]
         * @param {number} [value]
         * @param {boolean} [noninteraction] if this event is user created or not
         */
        trackEvent: function (category, action, label, value, noninteraction) {
            window._gaq.push(['_trackEvent', category, action, label, value, noninteraction ? true : false]);
        }
    };
});