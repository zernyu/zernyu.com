/**
 * Quick async script to preload images in the background
 */
define(['jquery'], function () {
    'use strict';

    function loadImages() {
        var images = [
            '/png/about1.png',
            '/png/about2.png',
            '/png/contact1.png',
            '/png/contact2.png',
            '/png/popup1.png',
            '/png/popup2.png',
            '/png/projects1.png',
            '/png/projects2.png',
            '/png/resume1.png',
            '/png/resume2.png',
            '/png/shade.png',
            '/png/slider1.png',
            '/png/slider2.png',
            '/png/strip1.png',
            '/png/strip2.png',
            '/png/zernyu1.png',
            '/png/zernyu2.png',
            '/png/projects/apo1.png',
            '/png/projects/apo2.png',
            '/png/projects/apo3.png',
            '/png/projects/grab1.png',
            '/png/projects/grab2.png',
            '/png/projects/grab3.png',
            '/png/projects/muse1.png',
            '/png/projects/muse2.png',
            '/png/projects/muse3.png',
            '/png/projects/rab1.png',
            '/png/projects/rab2.png',
            '/png/projects/rab3.png',
            '/png/projects/vodori1.png',
            '/png/projects/vodori2.png',
            '/png/projects/vodori3.png'
        ];

        var loadingBox;
        var loadingBar;
        var slowLoading = false;
        var numberLoaded = 0;
        var numberOfImages = images.length;

        /**
         * Callback for jQuery fadeout to remove the DOM node
         */
        function removeMe() {
            /*jshint validthis: true */
            $(this).remove();
        }

        /**
         * Callback for when an image has been loaded. Update the size of the loading bar
         * and remove the loading bar when complete
         */
        function imageLoaded() {
            numberLoaded++;

            /* Only do progress bar stuff if the loading bar is displayed */
            if (!slowLoading) {
                return;
            }

            loadingBar.css({width: Math.floor((numberLoaded / numberOfImages) * 100) + '%'});

            if (numberLoaded === numberOfImages) {
                loadingBox.fadeOut(removeMe);
            }
        }

        /* Start loading the images! */
        for (var i = 0; i < numberOfImages; i++) {
            var image = new Image();
            image.addEventListener('load', imageLoaded);
            image.src = images[i];
        }

        /* If after half a second, less than half the images have loaded, show the loading bar */
        setTimeout(function() {
            if (numberLoaded / numberOfImages <= 0.5) {
                /* Create a loading bar to be displayed */
                loadingBox = $('<div id="loading-bar-container"><span>loading</span><div id="loading-bar"></div></div>');
                loadingBar = loadingBox.find('#loading-bar');
                loadingBox.hide().appendTo('body').fadeIn();

                slowLoading = true;
            }
        }, 500);
    };

    return {
        load: function() {
            setTimeout(loadImages, 25);
        }
    };
});
