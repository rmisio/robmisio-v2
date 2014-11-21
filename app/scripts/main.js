/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        'google-code-prettify': '../bower_components/google-code-prettify/src/prettify',
        'jquery.ui.widget': '../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'jquery.iframe-transport': '../bower_components/blueimp-file-upload/js/jquery.iframe-transport',
        'jquery.fileupload': '../bower_components/blueimp-file-upload/js/jquery.fileupload',
        cloudinary_js: '../bower_components/jquery-cloudinary/js/jquery.cloudinary',
        'backbone-validation': '../bower_components/backbone-validation/dist/backbone-validation-amd',
        'html-sortable': '../bower_components/html.sortable/dist/html.sortable'
    }
});

require([
    'backbone',
    'underscore',
    'bootstrap',
    'app',
    'startup',
    'util',
    'routes/app',
    'views/app'
], function (Backbone, _, bootstrap, app, startup, util, AppRouter, AppView) {
    app.appView = new AppView();
    app.router = new AppRouter();
    app.eventEmitter = _.extend({}, Backbone.Events);
    util.initMqChangeEvents(app.eventEmitter);

    Backbone.history.start({ pushState: true });
});
