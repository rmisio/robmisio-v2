/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'google-code-prettify': '../bower_components/google-code-prettify/src/prettify'
    }
});

require([
    'backbone',
    'underscore',
    'bootstrap',
    'app',
    'util',
    'routes/app',
    'views/app'
], function (Backbone, _, bootstrap, app, util, AppRouter, AppView) {
    app.appView = new AppView();
    app.router = new AppRouter();
    app.eventEmitter = _.extend({}, Backbone.Events);
    util.initMqChangeEvents(app.eventEmitter);

    // bootstrap modal scroll issue fix:
    // https://github.com/twbs/bootstrap/issues/9855#issuecomment-27460362
    // todo: upgrading bootstrap should fix this
    function measureScrollBar() {
        var scrollDiv = document.createElement('div')
        scrollDiv.className = 'scrollbar-measure'
        document.body.appendChild(scrollDiv)
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
        document.body.removeChild(scrollDiv)
        return scrollbarWidth
    }

    $(document.body).on('show.bs.modal', function () {
        if (this.clientHeight <= window.innerHeight) return
        var scrollbarWidth = measureScrollBar()
        if (scrollbarWidth) $(document.body).css('padding-right', scrollbarWidth)
    }).on('hidden.bs.modal', function () {
        $(document.body).css('padding-right', 0)
    });
    // END - bootstrap modal scroll issue fix.

    Backbone.history.start({ pushState: true });    
});