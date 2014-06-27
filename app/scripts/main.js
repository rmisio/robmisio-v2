/*global require*/
'use strict';

console.log('hello');
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

console.log('world');
require([
    'backbone',
    'views/app'
], function (Backbone, AppView) {
    console.log('sugah');
    Backbone.history.start();

    new AppView();
});
console.log('how');