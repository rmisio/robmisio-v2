/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page'
], function ($, Backbone, app, BlogPage) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'truth': 'truth'
        },

        index: function() {
            app.appView.renderPage(new BlogPage());
        },

        truth: function() {
            console.log('can you dig it?');
        }        
    });

    return AppRouter;
});
