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
        routes: function() {
            var routes =  {
                '': 'index',
                'blog': 'index',
                'posts/:year/:month/:slug': 'blogPost',
                'about': 'about'
            };

            routes[app.BLOG_ENTRY_URL_PREFIX + ':year/:month/:slug'] =
                'blogPost';

            return routes;
        },

        index: function() {
            new BlogPage();
        },

        blogPost: function(year, month, slug) {
            new BlogPage({
                urlParams: {
                    year: year,
                    month: month,
                    slug: slug
                }
            });
        },

        about: function() {
            new AboutPage();
        }        
    });

    return AppRouter;
});
