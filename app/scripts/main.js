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
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    'underscore',
    'app',
    'util',
    'routes/app',
    'views/app'
], function (Backbone, _, app, util, AppRouter, AppView) {
    app.appView = new AppView();
    app.router = new AppRouter();
    app.eventEmitter = _.extend({}, Backbone.Events);
    // util.initMqChangeEvents(app.eventEmitter);

    Backbone.history.start({ pushState: true });    
});