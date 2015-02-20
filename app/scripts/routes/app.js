/*global define*/

define([
    'jquery',
    'backbone',
    'app',
    'views/blog-page',
    'views/about-page',
    'views/album-form',
    'views/album-page',
    'models/album'
], function ($, Backbone, app, BlogPageView, AboutPageView, AlbumFormView, AlbumPageView, AlbumModel) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: function () {
            var routes =  {
                '': 'index',
                'blog': 'index',
                'about': 'about',
                'albums/create': 'albumCreate',
                'albums/update/:slug': 'albumUpdate',
                'albums/:slug': 'albumRead',
            };

            routes[app.BLOG_ENTRY_URL_PREFIX + ':year/:month/:slug'] = 'blogPost';

            return routes;
        },

        index: function () {
            this.showPage('blog', BlogPageView);
        },

        showPage: function (url, View, options) {
            var view;

            options = options || {};

            view = new View(options.viewOptions);
            app.appView.showPage(view);
        },

        blogPost: function (year, month, slug) {
            var opts = {
                    urlParams: {
                        year: year,
                        month: month,
                        slug: slug
                    }
                };

            var url = app.BLOG_ENTRY_URL_PREFIX + year + '/' + month + '/' + slug;

            this.showPage(url, BlogPageView, { viewOptions: opts });
        },

        about: function () {
            this.showPage('about', AboutPageView);
        },

        albumCreate: function () {
            this.showPage('albums/create', AlbumFormView, {
                viewOptions: {
                    model: new AlbumModel()
                }
            });
        },

        albumUpdate: function (slug) {
            var self = this,
                model;

            if (!slug) {
                // todo: 404 yo
            }

            model = new AlbumModel({
                slug: slug
            });

            model.fetch({
                success: function () {
                    self.showPage('albums/update/' + slug, AlbumFormView, {
                        viewOptions: {
                            model: model
                        }
                    });
                }
            });
        },

        albumRead: function (slug) {
            var self = this,
                model;

            if (!slug) {
                // todo: 404 yo
            }

            model = new AlbumModel({
                slug: slug
            });

            model.fetch({
                success: function () {
                    self.showPage('albums/' + slug, AlbumPageView, {
                        viewOptions: {
                            model: model
                        }
                    });
                }
            });
        }
    });

    return AppRouter;
});
