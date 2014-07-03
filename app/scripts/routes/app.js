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
            'blog/:id': 'blog',
            'truth': 'truth'
        },

        index: function() {
            new BlogPage();
        },

        blog: function(id) {
            new BlogPage({ blogId: id });
        },

        truth: function() {
            console.log('can you dig it?');
        }        
    });

    return AppRouter;
});