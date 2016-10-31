
(function ($, window, document, undefined) {
    'use strict';

    function marginTopSections(section, css) {
        var top = ( $(window).height() - section.height() ) * 0.5;
        section.css(css, top);
    }

    function initReady() {
        marginTopSections($('h1'), 'margin-top');
    }

    function initResizeWindow() {
        marginTopSections($('h1'), 'margin-top');
    }

    $(document).ready(initReady);
    $(window).on('resize', initResizeWindow);
})(jQuery, window, document);