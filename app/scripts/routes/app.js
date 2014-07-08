/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page',
    'views/about-page'
], function ($, Backbone, app, BlogPage, AboutPage) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'blog/:id': 'blog',
            'about': 'about'
        },

        index: function() {
            new BlogPage();
        },

        about: function() {
            new AboutPage();
        }        
    });

    return AppRouter;
});
