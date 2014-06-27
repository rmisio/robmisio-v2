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
    'app',
    'routes/app',
    'views/app'
], function (Backbone, app, AppRouter, AppView) {
    app.appView = new AppView();
    app.router = new AppRouter();

    Backbone.history.start({ pushState: true });    
});